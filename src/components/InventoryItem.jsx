import { useState, useEffect } from "react";

const InventoryItem = ({
  activeRoom,
  img,
  title,
  handleInventoriesSelected,
  selectedItems = [],
  isSelected: externalIsSelected,
  currentCount: externalCount,
}) => {
  // Find if this item is already selected from props or selectedItems array
  const existingItem = selectedItems.find((item) => item.itemName === title);

  // Use external props if provided, otherwise use selectedItems array
  const initialCount =
    externalCount !== undefined
      ? externalCount
      : existingItem
      ? existingItem.numberOfCount
      : 0;

  const initialSelected =
    externalIsSelected !== undefined
      ? externalIsSelected
      : existingItem
      ? true
      : false;

  const [isCardSelected, setIsCardSelected] = useState(initialSelected);
  const [count, setCount] = useState(initialCount);

  // Update local state when external props change
  useEffect(() => {
    if (externalIsSelected !== undefined) {
      setIsCardSelected(externalIsSelected);
    }
    if (externalCount !== undefined) {
      setCount(externalCount);
    }
  }, [externalIsSelected, externalCount]);

  // Update when selectedItems array changes
  useEffect(() => {
    if (selectedItems.length > 0) {
      const item = selectedItems.find((item) => item.itemName === title);
      if (item) {
        setIsCardSelected(true);
        setCount(item.numberOfCount);
      } else {
        setIsCardSelected(false);
        setCount(0);
      }
    }
  }, [selectedItems, title]);

  const increaseItems = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (!isCardSelected) {
      setIsCardSelected(true);
    }

    // Call parent handler with updated count
    handleInventoriesSelected({
      itemName: title,
      numberOfCount: newCount,
      room: activeRoom,
    });
  };

  const decreaseItems = () => {
    if (count === 0) return;

    const newCount = count - 1;
    setCount(newCount);

    if (newCount === 0) {
      setIsCardSelected(false);
    }

    // Call parent handler with updated count
    handleInventoriesSelected({
      itemName: title,
      numberOfCount: newCount,
      room: activeRoom,
    });
  };

  return (
    <div
      className={`w-full group cursor-pointer h-[290px] rounded-[16px] border-[1px]
        ${isCardSelected ? "border-[#054D96]" : "border-[#e3e3e3]"}`}
    >
      <div
        className={`border-b-[5px] h-[65%] flex justify-center items-center
        ${isCardSelected ? "border-[#054D96]" : "border-[#e3e3e3]"}`}
      >
        <img
          src={img}
          className="max-w-[150px] object-cover max-h-[110px] "
          alt=""
        />
      </div>
      <div className="flex h-[40%] flex-col items-center justify-center ">
        <p className="font-sans text-[20px] inventoryItemText leading-[32px] text-[#262626] ">
          {title}
        </p>
        <div className="flex mt-1 items-center">
          <button
            className={` bg-[#EEF2F6] h-[25px] w-[25px] flex items-center justify-center ${
              isCardSelected && "bg-primary opacity-100"
            } duration-500 p-1 rounded-[6px] transition`}
            onClick={decreaseItems}
          >
            <p
              className={`font-sans font-bold  text-[18px] text-black ${
                isCardSelected ? "text-white" : "text-black"
              } `}
            >
              -
            </p>
          </button>
          <p
            className={`mx-3 font-sans text-[16px] font-bold ${
              isCardSelected ? "text-black" : "text-black"
            } `}
          >
            {count}
          </p>
          <button
            className={`bg-[#EEF2F6]  h-[25px] w-[25px] flex items-center justify-center ${
              isCardSelected && "bg-primary opacity-100"
            } duration-500 p-1 rounded-[6px] transition`}
            onClick={increaseItems}
          >
            <p
              className={`font-sans font-bold  text-[20px] text-black ${
                isCardSelected ? "text-white" : "text-black"
              } `}
            >
              +
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
