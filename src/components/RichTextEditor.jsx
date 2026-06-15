import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ onChange }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (onChange) {
      onChange(value); 
    }
  }, [value, onChange]);

  return (
    <div className="rich_text">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
      />
    </div>
  );
};

export default RichTextEditor;
