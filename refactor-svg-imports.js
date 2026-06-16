/**
 * Refactors all SVG imports across the React codebase:
 *  - Removes active SVG import lines
 *  - Replaces src={varName} → src="/assets/filename.svg"
 *  - Replaces <VarName /> → <img src="/assets/filename.svg" alt="" />
 *  - Replaces <VarName className=... /> → <img src="..." alt="" className=... />
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all files with active SVG imports
const rawFiles = execSync(
  `grep -rln "import.*\\.svg" src/ --include="*.jsx" --include="*.js"`,
  { cwd: __dirname }
)
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

console.log(`\nFound ${rawFiles.length} files with SVG imports.\n`);

let totalImportsRemoved = 0;
let totalReplacementsMade = 0;

for (const relFile of rawFiles) {
  const filePath = path.join(__dirname, relFile.replace(/^src\/\//, 'src/'));
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Match active (non-commented) SVG import lines:
  // import someVar from ".../<filename>.svg"
  // import someVar from '../.../<filename>.svg'
  const importRegex = /^import\s+(\w+)\s+from\s+['"]([^'"]*\/([^/'"]+\.svg))['"]\s*;?\s*$/gm;

  const svgImports = []; // { varName, filename }
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const varName = match[1];
    const filename = match[3]; // e.g. "cover-photo.svg"
    svgImports.push({ varName, filename, fullMatch: match[0] });
  }

  if (svgImports.length === 0) continue;

  console.log(`\n📄 ${relFile.replace(/^src\/\//, 'src/')}`);

  for (const { varName, filename, fullMatch } of svgImports) {
    const publicPath = `/assets/${filename}`;
    console.log(`   🔄 ${varName}  →  "${publicPath}"`);

    // 1. Remove the import line
    content = content.replace(fullMatch, '');
    totalImportsRemoved++;

    // 2. Replace JSX component usage: <VarName /> or <VarName className="..." />
    //    Handles self-closing tags with any props
    const componentRegex = new RegExp(
      `<${varName}(\\s[^>]*)?\\/>`
      , 'g'
    );
    content = content.replace(componentRegex, (m, props) => {
      if (!props) {
        return `<img src="${publicPath}" alt="" />`;
      }
      // preserve existing props but add src and alt
      // remove any existing src= from props
      let cleanProps = props.replace(/\s*src=\{[^}]*\}/g, '').replace(/\s*src="[^"]*"/g, '');
      return `<img src="${publicPath}" alt=""${cleanProps} />`;
    });

    // 3. Replace src={varName} with src="/assets/filename.svg"
    const srcAttrRegex = new RegExp(`src=\\{\\s*${varName}\\s*\\}`, 'g');
    content = content.replace(srcAttrRegex, `src="${publicPath}"`);

    // 4. Replace template literal uses: `${varName}` in src
    const tplLiteralRegex = new RegExp(`src=\`[^'"\`]*\\$\\{\\s*${varName}\\s*\\}[^'\`]*\``, 'g');
    content = content.replace(tplLiteralRegex, `src="${publicPath}"`);

    // 5. Replace any remaining bare {varName} used as img src value (edge cases)
    // e.g. src = {varName} with whitespace
    const looseAttrRegex = new RegExp(`src\\s*=\\s*\\{\\s*${varName}\\s*\\}`, 'g');
    content = content.replace(looseAttrRegex, `src="${publicPath}"`);

    totalReplacementsMade++;
  }

  // Clean up multiple blank lines left after removing imports
  content = content.replace(/\n{3,}/g, '\n\n');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`   ✅ Saved`);
  }
}

console.log(`\n✅ Done!`);
console.log(`   Imports removed:      ${totalImportsRemoved}`);
console.log(`   Variables processed:  ${totalReplacementsMade}`);
console.log(`\n⚠️  Remember to copy your SVG files to public/assets/ so the paths resolve.\n`);
