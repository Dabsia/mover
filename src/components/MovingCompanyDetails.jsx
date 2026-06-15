import React, { useMemo } from "react";
import img from "../Assets/Rectangle 4562.svg";
import { useDispatch, useSelector } from "react-redux";
import { convertTo12Hour, formatDate, stripPTags } from "../utils";
import { resetMoversInfo } from "../redux/action";

const MovingCompanyDetails = ({ makeInActive }) => {
  const mover = useSelector((state) => state.user.moversData);
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(resetMoversInfo());
    makeInActive();
  };

  // Memoized room items and counts calculation
  const { roomCounts } = useMemo(() => {
    // Handle both old and new data structures
    const moveItemsData = mover?.moveDetails?.moveItemsDetails;

    if (!moveItemsData || !Array.isArray(moveItemsData)) {
      return { roomCounts: {}, roomItems: [], totalItems: 0 };
    }

    // Check if it's the new structure (array of objects with roomName, count, items)
    const isNewStructure =
      moveItemsData.length > 0 &&
      moveItemsData[0].hasOwnProperty("roomName") &&
      moveItemsData[0].hasOwnProperty("count") &&
      moveItemsData[0].hasOwnProperty("items");

    if (isNewStructure) {
      // Handle new structure
      const roomCounts = {};
      const roomItems = [];
      let totalItems = 0;

      moveItemsData.forEach((room) => {
        const roomName = room.roomName;
        const count = room.count || 0;
        const items = room.items || [];

        // Store room count
        roomCounts[roomName] = count;

        // Store room items with details
        roomItems.push({
          roomName,
          count,
          items: items.map((item) => ({
            name: item,
            room: roomName,
          })),
        });

        // Add to total
        totalItems += count;
      });

      return { roomCounts, roomItems, totalItems };
    } else {
      // Handle old structure (backwards compatibility)
      return moveItemsData.reduce(
        (acc, item) => {
          const roomName = item.room;
          const itemCount = item.numberOfCount || 1;

          // Count items per room
          acc.roomCounts[roomName] =
            (acc.roomCounts[roomName] || 0) + itemCount;

          // Store room items
          const existingRoom = acc.roomItems.find(
            (r) => r.roomName === roomName
          );
          if (existingRoom) {
            existingRoom.items.push({
              name: item.name || item.itemName,
              count: itemCount,
              room: roomName,
            });
            existingRoom.count += itemCount;
          } else {
            acc.roomItems.push({
              roomName,
              count: itemCount,
              items: [
                {
                  name: item.name || item.itemName,
                  count: itemCount,
                  room: roomName,
                },
              ],
            });
          }

          acc.totalItems += itemCount;
          return acc;
        },
        { roomCounts: {}, roomItems: [], totalItems: 0 }
      );
    }
  }, [mover?.moveDetails?.moveItemsDetails]);

  // Safe function to get room count - handles exact and fuzzy matching
  const getRoomCount = (roomName) => {
    if (!roomName || !roomCounts) return 0;

    // First try exact match
    if (roomCounts[roomName] !== undefined) {
      return roomCounts[roomName];
    }

    // Try case-insensitive match
    const lowerRoomName = roomName.toLowerCase();
    const exactMatch = Object.keys(roomCounts).find(
      (key) => key.toLowerCase() === lowerRoomName
    );

    if (exactMatch) {
      return roomCounts[exactMatch];
    }

    // Try partial/fuzzy matching for common variations
    const fuzzyMatch = Object.keys(roomCounts).find((key) => {
      const keyLower = key.toLowerCase();
      const searchLower = lowerRoomName;

      // Handle common variations
      const variations = {
        "toilet and bath": [
          "bathroom",
          "toilet",
          "bath",
          "restroom",
          "washroom",
        ],
        bathroom: ["toilet and bath", "toilet", "bath", "restroom", "washroom"],
        "living room": ["lounge", "sitting room", "family room"],
        bedroom: ["bed room", "master bedroom", "guest room"],
        kitchen: ["cooking area", "kitchenette"],
        "dining room": ["dining area", "dining"],
      };

      // Check if either matches the other's variations
      const searchVariations = variations[searchLower] || [];
      const keyVariations = variations[keyLower] || [];

      return (
        searchVariations.includes(keyLower) ||
        keyVariations.includes(searchLower) ||
        keyLower.includes(searchLower) ||
        searchLower.includes(keyLower)
      );
    });

    return fuzzyMatch ? roomCounts[fuzzyMatch] : 0;
  };

  const additionalInfo = stripPTags(mover?.additionalInformation);

  return (
    <div className="ml-4 mb-[40px] movingCompanyDetailBox h-fit ">
      <div className="overflow-y-scroll pb-[70px] custom-scroll ">
        <div className="flex altQuoteTop mb-3 items-center">
          <p
            onClick={goBack}
            className="text-[#9e9e9e] cursor-pointer text-[14px] font-sans leading-[19.6px]"
          >
            Quotes
          </p>{" "}
          <div className="mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
            >
              <path
                d="M0.219801 0.720115C0.0788617 0.861097 -0.000314284 1.05228 -0.000314301 1.25163C-0.000314319 1.45098 0.0788616 1.64217 0.219801 1.78315L3.94119 5.50454L0.219801 9.22592C0.0828549 9.36771 0.00707833 9.55762 0.00879111 9.75474C0.0105039 9.95186 0.0895692 10.1404 0.228958 10.2798C0.368347 10.4192 0.556907 10.4983 0.754025 10.5C0.951143 10.5017 1.14105 10.4259 1.28284 10.289L5.53574 6.03606C5.67668 5.89508 5.75586 5.70389 5.75586 5.50454C5.75586 5.30519 5.67668 5.114 5.53574 4.97302L1.28284 0.720115C1.14186 0.579175 0.950669 0.5 0.75132 0.5C0.551971 0.5 0.360784 0.579175 0.219801 0.720115Z"
                fill="#E3E3E3"
              />
            </svg>
          </div>
          <div>
            <p className="text-[#525252] moversWebHeader text-[16px] font-bold font-sans  ">
              Quote Breakdown & Moving Company Details
            </p>
            <p className="text-[#525252] moversMobileHeader text-[16px] font-bold font-sans  ">
              Quote Breakdown
            </p>
          </div>
        </div>
        <div className="w-full h-[300px] overflow-hidden rounded-[20px] relative">
          <img
            src={img}
            className=" w-full h-full object-cover rounded-[25px]"
            alt="hero"
          />
          {/* <img src={img || mover?.image} alt="user" className="w-full  " /> */}
          <div className="absolute bottom-[20px] flex justify-center items-center left-[5] w-full  ">
            <div className="w-full px-[23px] ">
              <div className="bg-[#d9d9d9] w-fit flex items-center  p-[10px] rounded-t-[10px] bg-opacity-70 backdrop-blur-sm h-[50px]">
                <div className="border-[0.5px] backdrop-blur-[3px] bg-[rgba(255,255,255,0.50)] border-[#D1D1D1] py-1 px-2  w-fit items-center rounded-[18px] flex ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                  >
                    <path
                      d="M9 13.3589L14.562 16.5L13.086 10.58L18 6.59684L11.529 6.07474L9 0.5L6.471 6.07474L0 6.59684L4.905 10.58L3.438 16.5L9 13.3589Z"
                      fill="#121212"
                    />
                  </svg>
                  <p className="ml-1 self-center text-[16px] font-sora ">4.3</p>
                </div>
              </div>
              <div className="bg-[#d9d9d9] flex items-center movingCompanyNameContainer w-fit rounded-tr-[10px] py-[10px] bg-opacity-70 backdrop-blur-sm rounded-b-[10px] pl-[14px] ">
                <span className="mr-1 font-unbounded movingCompanyName text-[24px] text-[#121212] font-bold leading-[25.6px] ">
                  {mover?.companyName}
                </span>
                <div className="bg-[#DCFAE6] mx-3 rounded-[4px] px-[8px] py-[4px] ">
                  <p className="text-[#079455] movingCompanyNameAvailable text-[14px] font-sans leading-[18.2px] ">
                    Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 border-[1px] w-full h-[146px] flex justify-center moveDetailsMainiContainer items-center rounded-[20px] border-[#136AB5] ">
          <div className=" w-[95%] moveDetailsOptionsContainer flex items-center justify-between h-[75%]">
            <div className="flex moveCompanyDirectionContainer flex-col relative h-full justify-between">
              <div
                className={`absolute top-10 movingCompanyDetailsIconXCoontainer left-[15px]
             bg-[#E3E8EF] h-[28px] w-[2px] rounded-[2px] `}
              ></div>
              <div className="flex items-center  ">
                <div className="movingCompanyDetailsIconXCoontainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="30"
                      height="30"
                      rx="15"
                      fill="#E4F0FC"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="30"
                      height="30"
                      rx="15"
                      stroke="#248CD9"
                      stroke-width="2"
                    />
                    <circle cx="16" cy="16" r="5" fill="#075DB2" />
                  </svg>
                </div>
                <div className="bg-[#f7f7f7] w-[400px] ml-3 movingCompanyDirection flex items-center rounded-[10px] p-[10px] ">
                  <div className="flex items-center">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11C21 14.074 19.324 16.59 17.558 18.395C16.6757 19.2871 15.7129 20.0958 14.682 20.811L14.256 21.101L14.056 21.234L13.679 21.474L13.343 21.679L12.927 21.921C12.6446 22.0822 12.3251 22.1669 12 22.1669C11.6749 22.1669 11.3554 22.0822 11.073 21.921L10.657 21.679L10.137 21.359L9.945 21.234L9.535 20.961C8.42283 20.2085 7.3869 19.3491 6.442 18.395C4.676 16.589 3 14.074 3 11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2ZM12 4C10.1435 4 8.36301 4.7375 7.05025 6.05025C5.7375 7.36301 5 9.14348 5 11C5 13.322 6.272 15.36 7.871 16.996C8.55853 17.692 9.30166 18.3308 10.093 18.906L10.551 19.232C10.699 19.3353 10.8413 19.4313 10.978 19.52L11.368 19.77L11.711 19.979L12 20.148L12.455 19.879L12.822 19.649C13.0173 19.525 13.2263 19.386 13.449 19.232L13.907 18.906C14.6983 18.3308 15.4415 17.692 16.129 16.996C17.728 15.361 19 13.322 19 11C19 9.14348 18.2625 7.36301 16.9497 6.05025C15.637 4.7375 13.8565 4 12 4ZM12 7C13.0609 7 14.0783 7.42143 14.8284 8.17157C15.5786 8.92172 16 9.93913 16 11C16 12.0609 15.5786 13.0783 14.8284 13.8284C14.0783 14.5786 13.0609 15 12 15C10.9391 15 9.92172 14.5786 9.17157 13.8284C8.42143 13.0783 8 12.0609 8 11C8 9.93913 8.42143 8.92172 9.17157 8.17157C9.92172 7.42143 10.9391 7 12 7ZM12 9C11.4696 9 10.9609 9.21071 10.5858 9.58579C10.2107 9.96086 10 10.4696 10 11C10 11.5304 10.2107 12.0391 10.5858 12.4142C10.9609 12.7893 11.4696 13 12 13C12.5304 13 13.0391 12.7893 13.4142 12.4142C13.7893 12.0391 14 11.5304 14 11C14 10.4696 13.7893 9.96086 13.4142 9.58579C13.0391 9.21071 12.5304 9 12 9Z"
                          fill="#12B981"
                        />
                      </svg>
                    </div>
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px] leading-[25.6px] ">
                      From
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px]">
                      -
                    </p>
                    <p className="text-[#707070] overflow-hidden text-ellipsis whitespace-nowrap movingContainerFromLocation ml-2 font-sans text-[16px] leading-[25.6px] max-w-[300px]">
                      {mover?.moveDetails?.from}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center  ">
                <div className="movingCompanyDetailsIconXCoontainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="30"
                      height="30"
                      rx="15"
                      fill="#E4F0FC"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="30"
                      height="30"
                      rx="15"
                      stroke="#248CD9"
                      stroke-width="2"
                    />
                    <circle cx="16" cy="16" r="5" fill="#075DB2" />
                  </svg>
                </div>
                <div className="bg-[#f7f7f7] w-[400px] ml-3 movingCompanyDirection flex items-center rounded-[10px] p-[10px] ">
                  <div className="flex items-center">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11C21 14.074 19.324 16.59 17.558 18.395C16.6757 19.2871 15.7129 20.0958 14.682 20.811L14.256 21.101L14.056 21.234L13.679 21.474L13.343 21.679L12.927 21.921C12.6446 22.0822 12.3251 22.1669 12 22.1669C11.6749 22.1669 11.3554 22.0822 11.073 21.921L10.657 21.679L10.137 21.359L9.945 21.234L9.535 20.961C8.42283 20.2085 7.3869 19.3491 6.442 18.395C4.676 16.589 3 14.074 3 11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2ZM12 4C10.1435 4 8.36301 4.7375 7.05025 6.05025C5.7375 7.36301 5 9.14348 5 11C5 13.322 6.272 15.36 7.871 16.996C8.55853 17.692 9.30166 18.3308 10.093 18.906L10.551 19.232C10.699 19.3353 10.8413 19.4313 10.978 19.52L11.368 19.77L11.711 19.979L12 20.148L12.455 19.879L12.822 19.649C13.0173 19.525 13.2263 19.386 13.449 19.232L13.907 18.906C14.6983 18.3308 15.4415 17.692 16.129 16.996C17.728 15.361 19 13.322 19 11C19 9.14348 18.2625 7.36301 16.9497 6.05025C15.637 4.7375 13.8565 4 12 4ZM12 7C13.0609 7 14.0783 7.42143 14.8284 8.17157C15.5786 8.92172 16 9.93913 16 11C16 12.0609 15.5786 13.0783 14.8284 13.8284C14.0783 14.5786 13.0609 15 12 15C10.9391 15 9.92172 14.5786 9.17157 13.8284C8.42143 13.0783 8 12.0609 8 11C8 9.93913 8.42143 8.92172 9.17157 8.17157C9.92172 7.42143 10.9391 7 12 7ZM12 9C11.4696 9 10.9609 9.21071 10.5858 9.58579C10.2107 9.96086 10 10.4696 10 11C10 11.5304 10.2107 12.0391 10.5858 12.4142C10.9609 12.7893 11.4696 13 12 13C12.5304 13 13.0391 12.7893 13.4142 12.4142C13.7893 12.0391 14 11.5304 14 11C14 10.4696 13.7893 9.96086 13.4142 9.58579C13.0391 9.21071 12.5304 9 12 9Z"
                          fill="#DE2527"
                        />
                      </svg>
                    </div>
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px] leading-[25.6px] ">
                      To
                    </p>
                  </div>

                  <div className="flex">
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px]">
                      -
                    </p>
                    <p className="text-[#707070] overflow-hidden text-ellipsis whitespace-nowrap movingContainerFromLocation ml-2 font-sans text-[16px] leading-[25.6px] max-w-[300px]">
                      {mover?.moveDetails?.to}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[42%] movingCompanyMoreDetails h-full flex flex-col justify-between  ">
              <div className="webOptionsContainer">
                <p className="text-[#9e9e9e] font-normal text-[16px] leading-[25.6px] font-sans ">
                  22 miles away
                </p>
                <p className="font-unbounded text-[36px] leading-[38.5px] text-[#136AB5] font-semibold ">
                  {" "}
                  €{mover?.amount}
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#373737] font-sans ">
                  {additionalInfo}
                </p>
              </div>
              <div className="mobileOptionsContainer">
                <p className="font-unbounded mobileOptionsContainerAmount text-[36px] leading-[38.5px] text-[#136AB5] font-semibold ">
                  {" "}
                  €{mover?.amount}
                </p>
                <div>
                  <p className="text-[#9e9e9e] mobileOptionsContainerDistance font-normal text-[16px] leading-[25.6px] font-sans ">
                    22 miles away
                  </p>
                  <p className="text-[16px] leading-[25.6px] mobileOptionsContainerOptions font-light text-[#373737] font-sans ">
                    {additionalInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="h-[160px] w-full webTable border-[#e3e3e3] border-[1px] rounded-[12px] ">
            <div className="w-full h-[50%] flex items-center justify-between border-[#e3e3e3] border-b-[1px]">
              <div className="flex rounded-tl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Move Size
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  House - {mover?.moveDetails?.numberOfRooms}{" "}
                  {mover?.moveDetails?.numberOfRooms > 1 ? "Rooms" : "Room"}
                </p>
              </div>

              <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Living Room
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Living Room")} items selected
                </p>
              </div>
              <div className="flex p-[16px] rounded-tr-[12px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Bedroom
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Bedroom")} items selected
                </p>
              </div>
            </div>
            <div className="w-full h-[50%] flex items-center justify-between ">
              <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Toilet and bath
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Toilet and bath")} items selected
                </p>
              </div>
              <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Dinning Room
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Dinning Room")} items selected
                </p>
              </div>
              <div className="flex p-[16px] rounded-br-[12px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Kitchen
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Kitchen")} items selected
                </p>
              </div>
            </div>
          </div>

          {/* mobile */}
          <div className="h-fit w-full mobileTable border-[#e3e3e3] border-[1px] rounded-[12px] ">
            <div className="w-full h-[50%] flex items-center justify-between border-[#e3e3e3] border-b-[1px]">
              <div className="flex w-[50%] rounded-tl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7]  h-full justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Move Size
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  House - {mover?.moveDetails?.numberOfRooms}{" "}
                  {mover?.moveDetails?.numberOfRooms > 1 ? "Rooms" : "Room"}
                </p>
              </div>

              <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[50%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Living Room
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Living Room")} items selected
                </p>
              </div>
            </div>
            <div className="w-full h-[50%] flex items-center border-[#e3e3e3] border-b-[1px] justify-between ">
              <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Bedroom
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Bedroom")} items selected
                </p>
              </div>
              <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[50%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Dinning Room
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Dinning Room")} items selected
                </p>
              </div>
            </div>
            <div className="w-full h-[50%] flex items-center justify-between ">
              <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Bath / Toilet
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Toilet and bath")} items selected
                </p>
              </div>
              <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[50%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Kitchen
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {getRoomCount("Kitchen")} items selected
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[90px] webTable flex items-center border-[#e3e3e3] border-[1px] mt-[20px] rounded-[12px] justify-between ">
            <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full justify-between">
              <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                Move Date
              </p>
              <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                {formatDate(mover?.moveDetails?.moveDate)}
              </p>
            </div>
            <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
              <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                Day
              </p>
              <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                {mover?.moveDetails?.moveDay}
              </p>
            </div>
            <div className="flex p-[16px] rounded-br-[12px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
              <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                Move Time
              </p>
              <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                {convertTo12Hour(mover?.moveDetails?.moveTime)}
              </p>
            </div>
          </div>
          <div className="w-full h-[90px] webTable flex items-center border-[#e3e3e3] border-[1px] mt-[20px] rounded-[12px] justify-between ">
            <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full justify-between">
              <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                Movers phone
              </p>
              <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                {mover?.moveDetails?.phoneNumber}
              </p>
            </div>
            <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
              <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                Movers email
              </p>
              <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                {mover?.moveDetails?.email}
              </p>
            </div>
            <div className="flex p-[16px] rounded-br-[12px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
              <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                Address
              </p>
              <p className="text-[16px] overflow-hidden text-ellipsis whitespace-nowrap leading-[25.6px] font-light text-[#121212] font-sans ">
                {mover?.moveDetails?.from}
              </p>
            </div>
          </div>

          {/* mobile */}
          <div className="h-fit w-full mobileTable border-[#e3e3e3] border-[1px] rounded-[12px] ">
            <div className="w-full h-[50%] flex items-center justify-between border-[#e3e3e3] border-b-[1px]">
              <div className="flex w-[50%] rounded-tl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7]  h-full justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Move Date
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {formatDate(mover?.moveDetails?.moveDate)}
                </p>
              </div>

              <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[50%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Day
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {mover?.moveDetails?.moveDay}
                </p>
              </div>
            </div>
            <div className="w-full h-[50%] flex items-center border-[#e3e3e3] border-b-[1px] justify-between ">
              <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Move Time
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {convertTo12Hour(mover?.moveDetails?.moveTime)}
                </p>
              </div>
              <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[50%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Movers phone
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                  {mover?.moveDetails?.phoneNumber}
                </p>
              </div>
            </div>
            <div className="w-full h-[50%] flex items-center justify-between ">
              <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Movers email
                </p>
                <p className="text-[16px] tableText leading-[25.6px] font-light text-[#121212] font-sans ">
                  {mover?.moveDetails?.email}
                </p>
              </div>
              <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[50%] h-full  justify-between">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  Address
                </p>
                <p className="text-[16px] tableText overflow-hidden text-ellipsis whitespace-nowrap leading-[25.6px] font-light text-[#121212] font-sans ">
                  {mover?.moveDetails?.from}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingCompanyDetails;
