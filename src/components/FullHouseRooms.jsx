import RoomItemContainer from "./RoomItemContainer";

const FullHouseRooms = ({ openIsInventoryList, data }) => {
  const roomSize = data?.houseSize || "";
  const roomSizeLower = roomSize.toLowerCase();

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

  // If it's a small space, show ONLY Toilet and bath
  if (isSmallSpace) {
    return (
      <RoomItemContainer
        onClick={() => openIsInventoryList("Others")}
        activeIcon={"Others"}
      />
    );
  }

  // Extract bedroom count for regular houses
  const getBedroomCount = () => {
    // Look for bedroom patterns
    const bedroomMatch = roomSizeLower.match(/(\d+)\s*(?:bedroom|bed|br)/);
    if (bedroomMatch) return parseInt(bedroomMatch[1], 10);

    // Look for any number
    const anyNumberMatch = roomSizeLower.match(/\d+/);
    if (anyNumberMatch) return parseInt(anyNumberMatch[0], 10);

    return 1; // Default to 1 bedroom
  };

  const bedroomCount = getBedroomCount();

  // For regular houses, show all rooms
  return (
    <>
      {/* Bedroom with count */}
      <RoomItemContainer
        onClick={() => openIsInventoryList("Bedroom")}
        activeIcon={"Bedroom"}
        label={bedroomCount > 1 && `${bedroomCount} `}
      />

      {/* Other rooms */}
      <RoomItemContainer
        onClick={() => {
          console.log("Clicked");
          openIsInventoryList("Living Room");
        }}
        activeIcon="Living Room"
      />
      <RoomItemContainer
        onClick={() => openIsInventoryList("Dinning Room")}
        activeIcon="Dinning Room"
      />
      <RoomItemContainer
        onClick={() => openIsInventoryList("Kitchen")}
        activeIcon="Kitchen"
      />
    </>
  );
};

export default FullHouseRooms;
