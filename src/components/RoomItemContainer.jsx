import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const RoomItemContainer = ({ activeIcon, onClick, label }) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const openDropDown = () => setIsOpenDropDown((prev) => !prev);

  const { t } = useTranslation();

  const items = useSelector((state) => state.user.items);

  // Memoized room items and counts calculation
  const { roomCounts, roomItems } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        // Count items per room
        acc.roomCounts[item.room] =
          (acc.roomCounts[item.room] || 0) + (item.numberOfCount || 1);

        // Collect items for the current room
        if (item.room === activeIcon) {
          // Use item.name or item.itemName or whatever property contains the display name
          const itemName = item.name || item.itemName || "Unnamed Item";
          acc.roomItems.push(itemName);
        }
        return acc;
      },
      { roomCounts: {}, roomItems: [] }
    );
  }, [items, activeIcon]);

  // Safe function to get room count
  const getRoomCount = (roomName) => {
    return roomCounts[roomName] ?? 0;
  };

  let content = (
    <div className="bg-[#FFF5DA] h-[48px] w-[48px] rounded-[6px] flex justify-center items-center ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
      >
        <path
          d="M4.4691 12.291C5.06178 12.291 5.63019 12.5265 6.04928 12.9456C6.46837 13.3646 6.70382 13.9331 6.70382 14.5257V15.6431H20.1121V14.5257C20.1121 13.9331 20.3476 13.3646 20.7667 12.9456C21.1858 12.5265 21.7542 12.291 22.3469 12.291C22.9395 12.291 23.508 12.5265 23.927 12.9456C24.3461 13.3646 24.5816 13.9331 24.5816 14.5257V20.1125C24.5816 20.4089 24.4639 20.6931 24.2543 20.9026C24.0448 21.1122 23.7606 21.2299 23.4642 21.2299H3.35174C3.05539 21.2299 2.77119 21.1122 2.56164 20.9026C2.3521 20.6931 2.23438 20.4089 2.23438 20.1125V14.5257C2.23437 13.9331 2.46982 13.3646 2.88891 12.9456C3.308 12.5265 3.87641 12.291 4.4691 12.291Z"
          stroke="#121212"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.46875 12.2911V8.939C4.46875 8.04997 4.82191 7.19735 5.45055 6.56872C6.07919 5.94008 6.9318 5.58691 7.82083 5.58691H18.9944C19.8835 5.58691 20.7361 5.94008 21.3647 6.56872C21.9934 7.19735 22.3465 8.04997 22.3465 8.939V12.2911M13.4076 5.58691V15.6432"
          stroke="#121212"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );

  switch (activeIcon) {
    case "Living Room":
      content = (
        <div className="bg-[#FFF5DA] h-[48px] w-[48px] rounded-[6px] flex justify-center items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M4.4691 12.291C5.06178 12.291 5.63019 12.5265 6.04928 12.9456C6.46837 13.3646 6.70382 13.9331 6.70382 14.5257V15.6431H20.1121V14.5257C20.1121 13.9331 20.3476 13.3646 20.7667 12.9456C21.1858 12.5265 21.7542 12.291 22.3469 12.291C22.9395 12.291 23.508 12.5265 23.927 12.9456C24.3461 13.3646 24.5816 13.9331 24.5816 14.5257V20.1125C24.5816 20.4089 24.4639 20.6931 24.2543 20.9026C24.0448 21.1122 23.7606 21.2299 23.4642 21.2299H3.35174C3.05539 21.2299 2.77119 21.1122 2.56164 20.9026C2.3521 20.6931 2.23438 20.4089 2.23438 20.1125V14.5257C2.23437 13.9331 2.46982 13.3646 2.88891 12.9456C3.308 12.5265 3.87641 12.291 4.4691 12.291Z"
              stroke="#121212"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.46875 12.2911V8.939C4.46875 8.04997 4.82191 7.19735 5.45055 6.56872C6.07919 5.94008 6.9318 5.58691 7.82083 5.58691H18.9944C19.8835 5.58691 20.7361 5.94008 21.3647 6.56872C21.9934 7.19735 22.3465 8.04997 22.3465 8.939V12.2911M13.4076 5.58691V15.6432"
              stroke="#121212"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      );
      // Code to be executed if expression matches value1
      break;
    // case "Toilet and bath":
    //   content = (
    //     <div className="bg-[#f3f3f3] h-[48px] w-[48px] rounded-[6px] flex justify-center items-center ">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="24"
    //         height="24"
    //         viewBox="0 0 24 24"
    //         fill="none"
    //       >
    //         <path
    //           d="M12 6.375C12 6.67337 11.8815 6.95952 11.6705 7.1705C11.4595 7.38147 11.1734 7.5 10.875 7.5H9.375C9.07663 7.5 8.79048 7.38147 8.5795 7.1705C8.36853 6.95952 8.25 6.67337 8.25 6.375C8.25 6.07663 8.36853 5.79048 8.5795 5.5795C8.79048 5.36853 9.07663 5.25 9.375 5.25H10.875C11.1734 5.25 11.4595 5.36853 11.6705 5.5795C11.8815 5.79048 12 6.07663 12 6.375ZM16.5141 18.3394L16.8563 20.7347C16.8943 21.0006 16.8747 21.2717 16.7988 21.5294C16.723 21.7871 16.5926 22.0255 16.4166 22.2285C16.2406 22.4314 16.023 22.5942 15.7786 22.7058C15.5342 22.8173 15.2687 22.875 15 22.875H9C8.73134 22.875 8.46582 22.8173 8.22141 22.7058C7.977 22.5942 7.75942 22.4314 7.5834 22.2285C7.40737 22.0255 7.27702 21.7871 7.20117 21.5294C7.12532 21.2717 7.10573 21.0006 7.14375 20.7347L7.48594 18.3394C6.01488 17.5303 4.78786 16.3413 3.93286 14.8965C3.07786 13.4517 2.62621 11.8039 2.625 10.125C2.625 9.82663 2.74353 9.54048 2.9545 9.3295C3.16548 9.11853 3.45163 9 3.75 9H4.875V3.75C4.875 3.25272 5.07254 2.77581 5.42417 2.42417C5.77581 2.07254 6.25272 1.875 6.75 1.875H17.25C17.7473 1.875 18.2242 2.07254 18.5758 2.42417C18.9275 2.77581 19.125 3.25272 19.125 3.75V9H20.25C20.5484 9 20.8345 9.11853 21.0455 9.3295C21.2565 9.54048 21.375 9.82663 21.375 10.125C21.3738 11.8039 20.9221 13.4517 20.0671 14.8965C19.2121 16.3413 17.9851 17.5303 16.5141 18.3394ZM7.125 9H16.875V4.125H7.125V9ZM14.3634 19.1981C12.8135 19.6006 11.1865 19.6006 9.63656 19.1981L9.43219 20.625H14.5678L14.3634 19.1981ZM19.0359 11.25H4.96875C5.23592 12.9238 6.09106 14.4476 7.38062 15.5476C8.67018 16.6477 10.3097 17.252 12.0047 17.252C13.6997 17.252 15.3392 16.6477 16.6288 15.5476C17.9183 14.4476 18.7735 12.9238 19.0406 11.25H19.0359Z"
    //           fill="#121212"
    //         />
    //       </svg>
    //     </div>
    //   );
    //   // Code to be executed if expression matches value2
    //   break;

    case "Bathroom":
      content = (
        <div className="bg-[#F7F0FF] h-[48px] w-[48px] rounded-[6px] flex justify-center items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7 16C7.28333 16 7.521 15.904 7.713 15.712C7.905 15.52 8.00067 15.2827 8 15C7.99933 14.7173 7.90333 14.48 7.712 14.288C7.52067 14.096 7.28333 14 7 14C6.71667 14 6.47933 14.096 6.288 14.288C6.09667 14.48 6.00067 14.7173 6 15C5.99933 15.2827 6.09533 15.5203 6.288 15.713C6.48067 15.9057 6.718 16.0013 7 16ZM10 16C10.2833 16 10.521 15.904 10.713 15.712C10.905 15.52 11.0007 15.2827 11 15C10.9993 14.7173 10.9033 14.48 10.712 14.288C10.5207 14.096 10.2833 14 10 14C9.71667 14 9.47933 14.096 9.288 14.288C9.09667 14.48 9.00067 14.7173 9 15C8.99933 15.2827 9.09533 15.5203 9.288 15.713C9.48067 15.9057 9.718 16.0013 10 16ZM13 16C13.2833 16 13.521 15.904 13.713 15.712C13.905 15.52 14.0007 15.2827 14 15C13.9993 14.7173 13.9033 14.48 13.712 14.288C13.5207 14.096 13.2833 14 13 14C12.7167 14 12.4793 14.096 12.288 14.288C12.0967 14.48 12.0007 14.7173 12 15C11.9993 15.2827 12.0953 15.5203 12.288 15.713C12.4807 15.9057 12.718 16.0013 13 16ZM7 13C7.28333 13 7.521 12.904 7.713 12.712C7.905 12.52 8.00067 12.2827 8 12C7.99933 11.7173 7.90333 11.48 7.712 11.288C7.52067 11.096 7.28333 11 7 11C6.71667 11 6.47933 11.096 6.288 11.288C6.09667 11.48 6.00067 11.7173 6 12C5.99933 12.2827 6.09533 12.5203 6.288 12.713C6.48067 12.9057 6.718 13.0013 7 13ZM10 13C10.2833 13 10.521 12.904 10.713 12.712C10.905 12.52 11.0007 12.2827 11 12C10.9993 11.7173 10.9033 11.48 10.712 11.288C10.5207 11.096 10.2833 11 10 11C9.71667 11 9.47933 11.096 9.288 11.288C9.09667 11.48 9.00067 11.7173 9 12C8.99933 12.2827 9.09533 12.5203 9.288 12.713C9.48067 12.9057 9.718 13.0013 10 13ZM13 13C13.2833 13 13.521 12.904 13.713 12.712C13.905 12.52 14.0007 12.2827 14 12C13.9993 11.7173 13.9033 11.48 13.712 11.288C13.5207 11.096 13.2833 11 13 11C12.7167 11 12.4793 11.096 12.288 11.288C12.0967 11.48 12.0007 11.7173 12 12C11.9993 12.2827 12.0953 12.5203 12.288 12.713C12.4807 12.9057 12.718 13.0013 13 13ZM5 10H15V9C15 7.61667 14.5123 6.43767 13.537 5.463C12.5617 4.48833 11.3827 4.00067 10 4C8.61733 3.99933 7.43833 4.487 6.463 5.463C5.48767 6.439 5 7.618 5 9V10ZM6.55 8.5C6.68333 7.65 7.071 6.93767 7.713 6.363C8.355 5.78833 9.11733 5.50067 10 5.5C10.8827 5.49933 11.6453 5.787 12.288 6.363C12.9307 6.939 13.318 7.65133 13.45 8.5H6.55ZM2 20C1.45 20 0.979333 19.8043 0.588 19.413C0.196667 19.0217 0.000666667 18.5507 0 18V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H18C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H2ZM2 18H18V2H2V18Z"
              fill="#121212"
            />
          </svg>
        </div>
      );
      // Code to be executed if expression matches value2
      break;
    case "Bedroom":
      content = (
        <div className="bg-[#EEF3F9] h-[48px] w-[48px] rounded-[6px] flex justify-center items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22 17V14M22 14H2M22 14H12V9H19C19.7956 9 20.5587 9.31607 21.1213 9.87868C21.6839 10.4413 22 11.2044 22 12V14ZM2 8V17M5 9C5 9.53043 5.21071 10.0391 5.58579 10.4142C5.96086 10.7893 6.46957 11 7 11C7.53043 11 8.03914 10.7893 8.41421 10.4142C8.78929 10.0391 9 9.53043 9 9C9 8.46957 8.78929 7.96086 8.41421 7.58579C8.03914 7.21071 7.53043 7 7 7C6.46957 7 5.96086 7.21071 5.58579 7.58579C5.21071 7.96086 5 8.46957 5 9Z"
              stroke="#121212"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      );
      // Code to be executed if expression matches value2
      break;
    case "Dinning Room":
      content = (
        <div className="bg-[#E8F7F3] h-[48px] w-[48px] rounded-[6px] flex justify-center items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6.75 17C6.96667 17 7.146 16.929 7.288 16.787C7.43 16.645 7.50067 16.466 7.5 16.25V10.25C7.93333 10.1167 8.29167 9.87933 8.575 9.538C8.85833 9.19667 9 8.784 9 8.3V4.5C9 4.36667 8.95 4.25 8.85 4.15C8.75 4.05 8.63333 4 8.5 4C8.36667 4 8.25 4.05 8.15 4.15C8.05 4.25 8 4.36667 8 4.5V7H7.25V4.5C7.25 4.36667 7.2 4.25 7.1 4.15C7 4.05 6.88333 4 6.75 4C6.61667 4 6.5 4.05 6.4 4.15C6.3 4.25 6.25 4.36667 6.25 4.5V7H5.5V4.5C5.5 4.36667 5.45 4.25 5.35 4.15C5.25 4.05 5.13333 4 5 4C4.86667 4 4.75 4.05 4.65 4.15C4.55 4.25 4.5 4.36667 4.5 4.5V8.3C4.5 8.78333 4.64167 9.196 4.925 9.538C5.20833 9.88 5.56667 10.1173 6 10.25V16.25C6 16.4667 6.071 16.646 6.213 16.788C6.355 16.93 6.534 17.0007 6.75 17ZM12.75 17C12.9667 17 13.146 16.929 13.288 16.787C13.43 16.645 13.5007 16.466 13.5 16.25V10.65C14.05 10.3833 14.4793 9.95833 14.788 9.375C15.0967 8.79167 15.2507 8.10833 15.25 7.325C15.25 6.375 15.0127 5.58333 14.538 4.95C14.0633 4.31667 13.4673 4 12.75 4C12.0327 4 11.437 4.31667 10.963 4.95C10.489 5.58333 10.2513 6.375 10.25 7.325C10.25 8.10833 10.4043 8.79167 10.713 9.375C11.0217 9.95833 11.4507 10.3833 12 10.65V16.25C12 16.4667 12.071 16.646 12.213 16.788C12.355 16.93 12.534 17.0007 12.75 17ZM2 20C1.45 20 0.979333 19.8043 0.588 19.413C0.196667 19.0217 0.000666667 18.5507 0 18V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H18C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H2ZM2 18H18V2H2V18Z"
              fill="#121212"
            />
          </svg>
        </div>
      );
      // Code to be executed if expression matches value2
      break;
    case "Kitchen":
      content = (
        <div className="bg-[#FCEAEA] h-[48px] w-[48px] rounded-[6px] flex justify-center items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
          >
            <path
              d="M20 6H16V3C16 1.34 14.66 0 13 0C11.34 0 10 1.34 10 3H12C12 2.45 12.45 2 13 2C13.55 2 14 2.45 14 3V6H6C7.1 6 8 5.1 8 4V0H2V4C2 5.1 2.9 6 4 6H0V8H2V16H18V8H20V6ZM4 2H6V4H4V2ZM4 14V8H9V14H4ZM16 14H11V8H16V14Z"
              fill="#121212"
            />
          </svg>
        </div>
      );
      // Code to be executed if expression matches value2
      break;
    // Add more cases as needed
    default:
      content = (
        <div className="bg-[#FFF5DA] h-[48px] w-[48px] rounded-[6px] flex justify-center items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M4.4691 12.291C5.06178 12.291 5.63019 12.5265 6.04928 12.9456C6.46837 13.3646 6.70382 13.9331 6.70382 14.5257V15.6431H20.1121V14.5257C20.1121 13.9331 20.3476 13.3646 20.7667 12.9456C21.1858 12.5265 21.7542 12.291 22.3469 12.291C22.9395 12.291 23.508 12.5265 23.927 12.9456C24.3461 13.3646 24.5816 13.9331 24.5816 14.5257V20.1125C24.5816 20.4089 24.4639 20.6931 24.2543 20.9026C24.0448 21.1122 23.7606 21.2299 23.4642 21.2299H3.35174C3.05539 21.2299 2.77119 21.1122 2.56164 20.9026C2.3521 20.6931 2.23438 20.4089 2.23438 20.1125V14.5257C2.23437 13.9331 2.46982 13.3646 2.88891 12.9456C3.308 12.5265 3.87641 12.291 4.4691 12.291Z"
              stroke="#121212"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.46875 12.2911V8.939C4.46875 8.04997 4.82191 7.19735 5.45055 6.56872C6.07919 5.94008 6.9318 5.58691 7.82083 5.58691H18.9944C19.8835 5.58691 20.7361 5.94008 21.3647 6.56872C21.9934 7.19735 22.3465 8.04997 22.3465 8.939V12.2911M13.4076 5.58691V15.6432"
              stroke="#121212"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      );
    // Code to be executed if expression doesn't match any case
  }

  return (
    <div className="my-4 hover:border-[#054D96] w-full border-[1px] rounded-[12px] px-[20px] border-[#e3e3e3] ">
      <div className="flex items-center justify-between w-full py-[16px] ">
        <div className="flex items-center">
          {content}
          <p className="mx-2 font-sans text-[18px] roomItemName text-[#525252] font-bold ">
            {label} {activeIcon}
          </p>
          {!isOpenDropDown && (
            <div className="flex bg-[#F0F9FF] numberOfItemsContainer border-[1px] border-[#E0F2FE] rounded-[4px] p-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
              >
                <path
                  d="M3.77578 6.9998L0.925781 4.1498L1.63828 3.4373L3.77578 5.5748L8.36328 0.987305L9.07578 1.6998L3.77578 6.9998Z"
                  fill="#3C82F6"
                />
              </svg>
              <p className="font-sans text-[16px] text-[#3C82F6] ml-2 leading-[25.6px] ">
                {getRoomCount(activeIcon)}
                <span className="selectedText">
                  {" "}
                  {t("roomItemContainer.selected")}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <div>
            <p
              onClick={onClick}
              className="text-[#b8b8b8] mr-2 cursor-pointer addItemsText hover:text-[#3C82F6] font-sans text-[14px] font-bold "
            >
              {" "}
              {t("roomItemContainer.add")}
            </p>
            <button
              onClick={onClick}
              className="h-[28px] mr-2 w-[28px] rounded-full addNewItemBtn hidden self-center justify-center items-center border-[1px] border-[#b8b8b8] cursor-pointer text-[14px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M14.8571 9.07143H9.14286V14.4286C9.14286 15.0179 8.62857 15.5 8 15.5C7.37143 15.5 6.85714 15.0179 6.85714 14.4286V9.07143H1.14286C0.514286 9.07143 0 8.58929 0 8C0 7.41071 0.514286 6.92857 1.14286 6.92857H6.85714V1.57143C6.85714 0.982143 7.37143 0.5 8 0.5C8.62857 0.5 9.14286 0.982143 9.14286 1.57143V6.92857H14.8571C15.4857 6.92857 16 7.41071 16 8C16 8.58929 15.4857 9.07143 14.8571 9.07143Z"
                  fill="#b8b8b8"
                />
              </svg>
            </button>
          </div>
          <div>
            <div
              onClick={openDropDown}
              className="h-[32px] cursor-pointer w-[32px] rounded-full  flex items-center border-[1px] border-[#f7f7f7] justify-center "
            >
              {!isOpenDropDown ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M1.63654 5.79295C1.82406 5.60548 2.07837 5.50017 2.34354 5.50017C2.6087 5.50017 2.86301 5.60548 3.05054 5.79295L8.00054 10.743L12.9505 5.79295C13.1391 5.61079 13.3917 5.51 13.6539 5.51228C13.9161 5.51456 14.1669 5.61973 14.3524 5.80513C14.5378 5.99054 14.6429 6.24135 14.6452 6.50355C14.6475 6.76575 14.5467 7.01835 14.3645 7.20695L8.70754 12.864C8.52001 13.0514 8.2657 13.1567 8.00054 13.1567C7.73537 13.1567 7.48106 13.0514 7.29354 12.864L1.63654 7.20695C1.44907 7.01942 1.34375 6.76512 1.34375 6.49995C1.34375 6.23479 1.44907 5.98048 1.63654 5.79295Z"
                    fill="#525252"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                >
                  <path
                    d="M13.3635 7.70705C13.1759 7.89452 12.9216 7.99983 12.6565 7.99983C12.3913 7.99983 12.137 7.89452 11.9495 7.70705L6.99946 2.75705L2.04946 7.70705C1.86086 7.88921 1.60826 7.99 1.34606 7.98772C1.08387 7.98544 0.833052 7.88028 0.647644 7.69487C0.462237 7.50946 0.357068 7.25865 0.35479 6.99645C0.352512 6.73425 0.453306 6.48165 0.635464 6.29305L6.29246 0.636048C6.47999 0.448577 6.7343 0.343262 6.99946 0.343262C7.26463 0.343262 7.51894 0.448577 7.70646 0.636048L13.3635 6.29305C13.5509 6.48058 13.6563 6.73488 13.6563 7.00005C13.6563 7.26521 13.5509 7.51952 13.3635 7.70705Z"
                    fill="#525252"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpenDropDown && (
        <div className="flex items-center border-[#e3e3e3] border-t-[1px] w-full py-[16px] ">
          <div className="flex bg-[#F0F9FF] w-[200px] border-[1px] border-[#E0F2FE] rounded-[4px] p-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
            >
              <path
                d="M3.77578 6.9998L0.925781 4.1498L1.63828 3.4373L3.77578 5.5748L8.36328 0.987305L9.07578 1.6998L3.77578 6.9998Z"
                fill="#3C82F6"
              />
            </svg>
            <p className="font-sans text-[16px] numberText text-[#3C82F6] ml-2 leading-[25.6px] ">
              {getRoomCount(activeIcon)}{" "}
              <span className="selectedText">
                {t("roomItemContainer.selected")}{" "}
              </span>
            </p>
          </div>
          <div className="w-full flex flex-wrap items-center ">
            {roomItems?.length > 0 && (
              <div className="w-full flex flex-wrap items-center">
                {roomItems.slice(0, 5).map((item, id) => (
                  <div key={id} className="flex ml-2 items-center">
                    <p className="mr-2 text-[14px] allItemsTextX font-sans leading-[18.2px] text-[#707070]">
                      {item}
                    </p>
                    {/* Only show dot if not the last visible item AND there are more items to show */}
                    {(id < 4 || roomItems.length <= 5) &&
                      id < roomItems.length - 1 && (
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
                {roomItems.length > 5 && (
                  <div className="flex ml-2 items-center">
                    <p className="text-[14px] font-sans leading-[18.2px] text-[#3C82F6]">
                      +{roomItems.length - 5} {t("roomItemContainer.more")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomItemContainer;
