// Count occurrences
export const countMap = (allInventories) =>
  allInventories?.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

// Format the list
export const formattedItems = (countMap) =>
  Object.entries(countMap).map(([item, count]) =>
    count > 1 ? `${item} x ${count}` : item
  );

export const formatTextLength = (text) => {
  return text.length > 30 ? text.slice(0, 30) + "..." : text;
};

export function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString.split("T")[0]);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export function getDayOfWeek(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString.split("T")[0]);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function convertTo12Hour(input) {
  // Handle null, undefined, or empty input
  if (!input) {
    return "Invalid time";
  }

  let date;

  // Check if input is in HH:MM format (like "06:08")
  if (typeof input === "string" && /^\d{1,2}:\d{2}$/.test(input)) {
    const [hours, minutes] = input.split(":").map((num) => parseInt(num, 10));

    // Validate hours and minutes
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return "Invalid time";
    }

    // Create a date object with today's date and the provided time
    date = new Date();
    date.setHours(hours, minutes, 0, 0);
  }
  // Handle existing Date objects or date strings
  else {
    date = new Date(input);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid time";
    }
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export const stripPTags = (html) => {
  return html?.replace(/<\/?p>/g, "") || "";
};

export const roomType = (data) => {
  const roomSize = data?.houseSize || "";
  const roomSizeLower = roomSize.toLowerCase();

  console.log(roomSizeLower);

  // Check if it's a small space
  const isSmallSpace = [
    "few items",
    "studio",
    "small",
    "een aantal items",
    "Small 2 x 4",
    "Small 5 x 5",
    "Small 5 x 10",
    "Small 5 x 15",
    "Small 10 x 20",
  ].some((term) => roomSizeLower.includes(term));
  console.log("Is small space:", isSmallSpace);

  return isSmallSpace;
};

export const incrementHouseSize = (currentHouseSize) => {
  // If empty, start with 1 bedroom
  if (!currentHouseSize || currentHouseSize.trim() === "") {
    return "1 bedroom";
  }

  const lowerSize = currentHouseSize.toLowerCase().trim();

  // Try to extract bedroom count - match patterns like "1 bedroom", "2 bed", "3 br", "4bedroom"
  const bedroomMatch = lowerSize.match(/(\d+)\s*(?:bedroom|bed|br)/);
  if (bedroomMatch) {
    const count = parseInt(bedroomMatch[1], 10);

    // Maximum limit: 6 bedrooms
    if (count >= 6) {
      return currentHouseSize; // Don't increment beyond 6
    }

    // Preserve the original suffix if possible
    const suffixMatch = lowerSize.match(/bedroom|bed|br/);
    const suffix = suffixMatch ? suffixMatch[0] : "bedroom";

    return `${count + 1} ${suffix}`;
  }

  // Try to extract any number (for cases like just "3" or "4 rooms")
  const anyNumberMatch = lowerSize.match(/\d+/);
  if (anyNumberMatch) {
    const count = parseInt(anyNumberMatch[0], 10);

    // Maximum limit: 6
    if (count >= 6) {
      return currentHouseSize; // Don't increment beyond 6
    }

    return `${count + 1} bedroom`;
  }

  // If no number found at all, start at 1 bedroom
  return "1 bedroom";
};
