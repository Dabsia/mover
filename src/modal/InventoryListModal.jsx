import { useState, useMemo, useEffect } from "react";
import InventoryItem from "../components/InventoryItem";
import { useDispatch } from "react-redux";
import { setUserItems } from "../redux/action";
import SearchIcon from "../Assets/SVG/SearchIcon";
import { useTranslation } from "react-i18next";
import centerTable from "../Assets/centerTable.png";
import chair from "../Assets/chair.png";
import couch from "../Assets/couch.png";
import cupboard from "../Assets/cupboard.png";
import dresser from "../Assets/dresser.jpg";
import frame from "../Assets/frame.jpg";
import mirror from "../Assets/mirror.png";
import tv from "../Assets/tv.png";
import lamp from "../Assets/lamp.png";
import glassTable from "../Assets/glassTable.png";
import bed from "../Assets/bed.png";
import bedStand from "../Assets/bedStand.png";
import bigDrawer from "../Assets/bigdrawer.png";
import closet from "../Assets/closet.jpg";
import drawer from "../Assets/drawer.png";
import smallCupboard from "../Assets/smallCupboard.png";
import barStand from "../Assets/barStand.png";
import dispenser from "../Assets/dispenser.png";
import bench from "../Assets/foamChair.png";
import rug from "../Assets/rug.png";
import diningChair from "../Assets/slimChair.png";
import stool from "../Assets/stool.png";
import table from "../Assets/table.png";
import fridge from "../Assets/fridge.png";
import toaster from "../Assets/toaster.png";
import microwave from "../Assets/microwave.png";
import blender from "../Assets/blender.png";
import trashbin from "../Assets/trashbin.png";
import washer from "../Assets/washer.png";
import broom from "../Assets/broom.png";
import "../modal/InventoryListModal.css";

const InventoryListModal = ({
  activeRoom,
  closeInventoryListModal,
  isInventoryListModalOpen,
  openUploadImageModal,
}) => {
  const { t } = useTranslation();
  const [allInventories, setAllInventories] = useState([]);

  // Initialize itemsByRoom from localStorage if available
  const [itemsByRoom, setItemsByRoom] = useState(() => {
    try {
      const saved = localStorage.getItem("inventory_selections");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return {};
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  // Save to localStorage whenever itemsByRoom changes
  useEffect(() => {
    try {
      localStorage.setItem("inventory_selections", JSON.stringify(itemsByRoom));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [itemsByRoom]);

  // Room data configuration with direct image imports
  const ROOM_DATA = useMemo(
    () => ({
      "Living Room": [
        { id: 0, title: "Glass Lounge Table", img: glassTable },
        { id: 1, title: "Arm Chair", img: chair },
        { id: 2, title: "Picture / Painting", img: frame },
        { id: 3, title: "Mirror", img: mirror },
        { id: 4, title: "Book Case", img: cupboard },
        { id: 5, title: "Center Table", img: centerTable },
        { id: 6, title: "TV", img: tv },
        { id: 7, title: "TV Stand", img: dresser },
        { id: 8, title: "Sectional Sofa", img: couch },
        { id: 9, title: "Elegant Floor Lamp", img: lamp },
      ],
      Bedroom: [
        { id: 0, title: "Bed (All Parts Included)", img: bedStand },
        { id: 1, title: "Lamp", img: lamp },
        { id: 2, title: "Dresser", img: drawer },
        { id: 3, title: "Picture / Painting", img: frame },
        { id: 4, title: "TV", img: tv },
        { id: 5, title: "Walk-in Closet", img: closet },
        { id: 6, title: "Mirror", img: mirror },
        { id: 7, title: "Armchair", img: chair },
        { id: 8, title: "Mattress", img: bed },
        { id: 9, title: "Desk", img: bigDrawer },
        { id: 10, title: "Night Stand", img: smallCupboard },
      ],
      "Dinning Room": [
        { id: 1, title: "Bar Stool", img: stool },
        { id: 2, title: "Dining Chairs", img: diningChair },
        { id: 3, title: "Dining Table", img: table },
        { id: 4, title: "Cabinet", img: dispenser },
        { id: 5, title: "Area Rug", img: rug },
        { id: 6, title: "Bench", img: bench },
        { id: 7, title: "Lounge Table", img: centerTable },
        { id: 8, title: "Mirror", img: mirror },
        { id: 9, title: "China Cabinet", img: barStand },
      ],
      Kitchen: [
        { id: 0, title: "Dining Table", img: table },
        { id: 1, title: "Dresser", img: bigDrawer },
        { id: 2, title: "Dining Chairs", img: diningChair },
        { id: 3, title: "Picture / Painting", img: frame },
        { id: 4, title: "Bar Stool", img: stool },
        { id: 5, title: "China Cabinet", img: barStand },
        { id: 6, title: "Refridgerator", img: fridge },
        { id: 7, title: "Toaster", img: toaster },
        { id: 8, title: "Bench", img: bench },
        { id: 9, title: "Microwave", img: microwave },
        { id: 10, title: "Blender", img: blender },
        { id: 11, title: "Trash Can", img: trashbin },
        { id: 12, title: "Electric Broom", img: broom },
        { id: 13, title: "Washer", img: washer },
      ],
      Others: [
        { id: 0, title: "Dining Table", img: table },
        { id: 1, title: "Dresser", img: bigDrawer },
        { id: 2, title: "Dining Chairs", img: diningChair },
        { id: 3, title: "Picture / Painting", img: frame },
        { id: 4, title: "Bar Stool", img: stool },
        { id: 5, title: "China Cabinet", img: barStand },
        { id: 6, title: "Refridgerator", img: fridge },
        { id: 7, title: "Toaster", img: toaster },
        { id: 8, title: "Bench", img: bench },
        { id: 9, title: "Microwave", img: microwave },
        { id: 10, title: "Blender", img: blender },
        { id: 11, title: "Trash Can", img: trashbin },
        { id: 12, title: "Electric Broom", img: broom },
        { id: 13, title: "Washer", img: washer },
        { id: 14, title: "Cabinet", img: dispenser },
        { id: 15, title: "Area Rug", img: rug },
        { id: 16, title: "Lounge Table", img: centerTable },
        { id: 17, title: "Mirror", img: mirror },
        { id: 18, title: "Glass Lounge Table", img: glassTable },
        { id: 19, title: "Arm Chair", img: chair },
        { id: 20, title: "Book Case", img: cupboard },
        { id: 21, title: "Center Table", img: centerTable },
        { id: 22, title: "TV", img: tv },
        { id: 23, title: "TV Stand", img: dresser },
        { id: 24, title: "Sectional Sofa", img: couch },
        { id: 25, title: "Elegant Floor Lamp", img: lamp },
      ],
    }),
    []
  );

  // Get current room data
  const currentRoomData = useMemo(() => {
    return ROOM_DATA[activeRoom] || [];
  }, [ROOM_DATA, activeRoom]);

  // Get items for current room
  const currentRoomItems = useMemo(() => {
    return itemsByRoom[activeRoom] || [];
  }, [itemsByRoom, activeRoom]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentRoomData;
    }
    const lowerQuery = searchQuery.toLowerCase();
    return currentRoomData.filter((item) =>
      item.title.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, currentRoomData]);

  // Check if an item is already selected
  const isItemSelected = (itemTitle) => {
    const currentRoomItems = itemsByRoom[activeRoom] || [];
    return currentRoomItems.some((item) => item.itemName === itemTitle);
  };

  // Get count for a specific item
  const getItemCount = (itemTitle) => {
    const currentRoomItems = itemsByRoom[activeRoom] || [];
    const item = currentRoomItems.find((item) => item.itemName === itemTitle);
    return item ? item.numberOfCount : 0;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Searching for:", searchQuery);
  };

  const appendItemToArray = (newItem) => {
    setItemsByRoom((prevItemsByRoom) => {
      const currentRoomItems = prevItemsByRoom[activeRoom] || [];
      const existingItemIndex = currentRoomItems.findIndex(
        (item) => item.itemName === newItem.itemName
      );
      let updatedRoomItems;

      if (existingItemIndex >= 0) {
        if (newItem.numberOfCount === 0) {
          // Remove item if count is 0
          updatedRoomItems = currentRoomItems.filter(
            (_, index) => index !== existingItemIndex
          );
        } else {
          // Update item count
          updatedRoomItems = [...currentRoomItems];
          updatedRoomItems[existingItemIndex] = {
            ...updatedRoomItems[existingItemIndex],
            numberOfCount: newItem.numberOfCount,
          };
        }
      } else if (newItem.numberOfCount > 0) {
        // Add new item
        updatedRoomItems = [
          ...currentRoomItems,
          {
            itemName: newItem.itemName,
            numberOfCount: newItem.numberOfCount,
            room: newItem.room,
          },
        ];
      } else {
        updatedRoomItems = currentRoomItems;
      }

      return {
        ...prevItemsByRoom,
        [activeRoom]: updatedRoomItems,
      };
    });
  };

  const handleInventoriesSelected = (newItems) => {
    setAllInventories((prevItems) => [...prevItems, newItems]);
  };

  const handleRemoveInventory = (itemToRemove) => {
    setAllInventories((prevItems) => {
      const index = prevItems.indexOf(itemToRemove);
      if (index !== -1) {
        const newItems = [...prevItems];
        newItems.splice(index, 1);
        return newItems;
      }
      return prevItems;
    });
  };

  // Clear selections for current room
  const clearRoomSelections = () => {
    setItemsByRoom((prev) => ({
      ...prev,
      [activeRoom]: [],
    }));
  };

  // Clear all selections across all rooms
  const clearAllSelections = () => {
    setItemsByRoom({});
    localStorage.removeItem("inventory_selections");
  };

  const handleSubmit = () => {
    // if (currentRoomItems.length === 0) return;
    // Combine all room items before dispatching
    const allItems = Object.values(itemsByRoom).flat();
    console.log("Submitting all items:", allItems);
    dispatch(setUserItems(allItems));
    closeInventoryListModal();
  };

  // Get total count of all items across all rooms for display
  const totalItemsCount = useMemo(() => {
    return Object.values(itemsByRoom).reduce(
      (total, roomItems) => total + roomItems.length,
      0
    );
  }, [itemsByRoom]);

  return (
    <div className="fixed top-0 z-50 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.10)] h-full w-full flex justify-center items-center ">
      <div className="bg-white flex flex-col justify-between w-[90%] rounded-[16px] h-[90%]">
        <div className="flex items-center w-full justify-between p-[28px] border-b-[1px] border-[#E3E8EF] ">
          <div className="flex inventoryListHeader items-center">
            <h3 className="mr-2 font-sans text-[20px] font-bold text-[#121212] ">
              {t("roomItemContainer.addItems")}
            </h3>
          </div>
          <div
            onClick={closeInventoryListModal}
            className="h-[32px] cursor-pointer w-[32px] rounded-full  flex items-center border-[1px] border-[#f7f7f7] justify-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.68 14L8 9.68L12.32 14L14 12.32L9.68 8L14 3.68L12.32 2L8 6.32L3.68 2L2 3.68L6.32 8L2 12.32L3.68 14Z"
                fill="#DE2527"
              />
            </svg>{" "}
          </div>
        </div>

        <div className="w-full overflow-y-scroll h-[80%]">
          <div className="w-[90%] py-4 mx-auto ">
            <div className="h-[42px] w-fit mb-4 rounded-[1000px] mx-auto border-[1px] p-[3px] border-[#E5E5E5] flex items-center ">
              <div
                className={`h-[36px] mr-1 cursor-pointer  border-[1px] rounded-[1000px] p-[10px] flex justify-center items-center border-[#E5E5E5] `}
              >
                <p
                  className={` font-sans text-[16px] inventoryListModal leading-[25.6px] ${
                    isInventoryListModalOpen
                      ? "text-[#121212]"
                      : "text-[#9e9e9e]"
                  }`}
                >
                  {t("uploadModal.btn1")}
                </p>
              </div>
              <div
                onClick={openUploadImageModal}
                className={`h-[36px]  cursor-pointer rounded-[1000px] p-[10px] flex justify-center items-center border-[#E5E5E5] `}
              >
                <p className="font-sans text-[16px] inventoryListModal leading-[25.6px] text-[#9e9e9e] ">
                  {t("uploadModal.btn2")}
                </p>
              </div>
            </div>
            <div className="flex justify-between inventorySearchContainer items-center">
              <p className="font-sans text-[20px] font-semibold italic text-[#9e9e9e]">
                {activeRoom}
              </p>
              <div className="w-[300px] searchInputBx border-[#E5E5E5] h-[40px] justify-between border-[1px] flex items-center rounded-[100px] px-1 ">
                <input
                  type="text"
                  placeholder="Search item here"
                  className="border-none px-4 w-[94%] outline-none"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearchClick();
                    }
                  }}
                />
                <div
                  className="w-[34px] bg-[#F7F7F7] h-[34px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#E5E5E5] transition-colors"
                  onClick={handleSearchClick}
                >
                  <SearchIcon />
                </div>
              </div>
            </div>
          </div>
          {/* Items Grid */}
          <div className="w-[90%] mx-auto overflow-y-auto">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-3 inventoryItemContainer gap-[18px] pb-4 w-full  ">
                {filteredItems.map((property) => {
                  const isSelected = isItemSelected(property.title);
                  const itemCount = getItemCount(property.title);

                  return (
                    <InventoryItem
                      key={property.id}
                      title={property.title}
                      img={property.img}
                      isSelected={isSelected}
                      currentCount={itemCount}
                      activeRoom={activeRoom}
                      handleInventoriesSelected={(item) => {
                        appendItemToArray({
                          itemName: property.title,
                          numberOfCount: item.numberOfCount,
                          room: activeRoom,
                        });
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex allListCont items-center w-full shadow-[0px_-6px_6px_-6px_rgba(0,0,0,0.3)] justify-between  p-[28px] border-t-[1px] border-[#E3E8EF] ">
          <div className="flex allSelectedContainer items-center">
            <div className="flex bg-[#F0F9FF] selectCont border-[1px] border-[#E0F2FE] rounded-[4px] p-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 10 7"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M3.77578 6.9998L0.925781 4.1498L1.63828 3.4373L3.77578 5.5748L8.36328 0.987305L9.07578 1.6998L3.77578 6.9998Z"
                  fill="#3C82F6"
                />
              </svg>
              <p className="font-sans text-[16px] w-[170px] text-[#3C82F6] ml-2 leading-[25.6px]">
                {currentRoomItems.length}{" "}
                <span className="selectedItems uploadImageItemSelected">
                  {t("roomItemContainer.selected")}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap finalItemsContainer ml-2 w-[60%] items-center">
              {currentRoomItems.map((item, index) => (
                <div key={index} className="flex ml-2 items-center">
                  <p className="mr-2 text-[14px] font-sans leading-[18.2px] text-[#707070] ">
                    {item.itemName} ({item.numberOfCount})
                  </p>
                  {index !== currentRoomItems.length - 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="4"
                      height="4"
                      viewBox="0 0 4 4"
                      fill="none"
                    >
                      <circle cx="2" cy="2" r="2" fill="#D1D1D1" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="self-center bg-primary py-2 px-4 w-[150px] inventoryListBtn text-white rounded-[20px] cursor-pointer text-[12px] text-manrope font-light "
          >
            {t("roomItemContainer.addItems")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryListModal;
