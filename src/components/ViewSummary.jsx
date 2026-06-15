import React, { useMemo } from "react";
import "./ViewSummary.css";
import { useSelector } from "react-redux";
import { formatDate, getDayOfWeek, convertTo12Hour, roomType } from "../utils";
import { useTranslation } from "react-i18next";

const ViewSummary = ({ errMessage }) => {
  const data = useSelector((state) => state.user);
  console.log(data);

  const { t } = useTranslation();

  // Memoized room items and counts calculation
  const { roomCounts } = useMemo(() => {
    return data?.items?.reduce(
      (acc, item) => {
        // Count items per room
        acc.roomCounts[item.room] =
          (acc.roomCounts[item.room] || 0) + (item.numberOfCount || 1);
        return acc;
      },
      { roomCounts: {}, roomItems: [] }
    );
  }, [data.items]);

  // Safe function to get room count
  const getRoomCount = (roomName) => {
    return roomCounts[roomName] ?? 0;
  };

  const isSmallSpace = roomType(data);

  return (
    <div className="ml-4 summaryBox w-full">
      <div className="overflow-y-scroll pb-[80px] viewSummaryContainer h-[700px] custom-scroll w-full">
        <div className="flex mb-4 items-center">
          <h3 className="mr-2 font-sans text-[20px] font-bold text-[#121212] ">
            {t("summary.title")}
          </h3>
        </div>
        {errMessage && <p className="text-red-500">{errMessage}</p>}
        <div className="p-[24px] w-full h-fit mb-20 summaryContainer rounded-[12px] ">
          <div className="relative mb-[20px]">
            <div className="absolute top-[65px] sideSide left-[15px] bg-[#E3E8EF] h-[65px] w-[2px] rounded-[2px]"></div>
            <div className="flex items-center">
              <div className="sideSide">
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

              <div className="md:h-[88px] h-fit boxSide ml-[10px] w-full px-[24px] py-[16px] border-[#e3e3e3] flex flex-col justify-between border-[1px] rounded-[12px] ">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  {t("summary.movingFrom")}
                </p>
                <p
                  className="text-[20px] text-[#136AB5] font-bold font-sans
              max-w-[800px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {data?.moreInfo?.pickUpAddress}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-[20px] lineView items-center hidden h-[40px] justify-center">
            <div className="h-full bg-[#3C82F6] rounded-[2px] w-[2px] "></div>
          </div>
          <div className="mb-[20px]">
            <div className="flex items-center">
              <div className="sideSide">
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

              <div className="md:h-[88px] h-fit boxSide ml-[10px] w-full px-[24px] py-[16px] border-[#e3e3e3] flex flex-col justify-between border-[1px] rounded-[12px] ">
                <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                  {t("summary.movingTo")}
                </p>
                <p
                  className="text-[20px] text-[#136AB5] font-bold font-sans
              max-w-[800px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {data?.moreInfo?.dropOffAddress}
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-[30px] sideSide "></div>
            <div className="w-full boxSide ml-[10px]">
              {!isSmallSpace && (
                <div className="h-[160px] w-full webTable border-[#e3e3e3] border-[1px] rounded-[12px] ">
                  <div className="w-full h-[50%] flex items-center justify-between border-[#e3e3e3] border-b-[1px]">
                    <div className="flex rounded-tl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.moveSize")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {data?.houseSize}
                      </p>
                    </div>

                    <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.livingRoom")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Living Room")} {t("summary.items")}
                      </p>
                    </div>
                    <div className="flex p-[16px] rounded-tr-[12px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.toilet")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Toilet and bath")} {t("summary.items")}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[50%] flex items-center justify-between ">
                    <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.kitchen")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Kitchen")} {t("summary.items")}
                      </p>
                    </div>
                    <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.dinning")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Dinning Room")} {t("summary.items")}
                      </p>
                    </div>
                    <div className="flex p-[16px] rounded-br-[12px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.bed")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Bedroom")} {t("summary.items")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* mobile */}
              {!isSmallSpace && (
                <div className="h-fit w-full mobileTable border-[#e3e3e3] border-[1px] rounded-[12px] ">
                  <div className="w-full h-[50%] flex items-center justify-between border-[#e3e3e3] border-b-[1px]">
                    <div className="flex w-[50%] rounded-tl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7]  h-full justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.moveSize")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {data?.houseSize}
                      </p>
                    </div>

                    <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[50%] h-full  justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.livingRoom")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Living Room")} {t("summary.items")}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[50%] flex items-center border-[#e3e3e3] border-b-[1px] justify-between ">
                    <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.bed")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Bedroom")} {t("summary.items")}
                      </p>
                    </div>
                    <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[50%] h-full  justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.dinning")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Dinning Room")} {t("summary.items")}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[50%] flex items-center justify-between ">
                    <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.toilet")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Toilet and bath")} {t("summary.items")}
                      </p>
                    </div>
                    <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[50%] h-full  justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                        {t("summary.kitchen")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                        {getRoomCount("Kitchen")} {t("summary.items")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop for others */}
              {isSmallSpace && (
                <div className="w-full h-[90px] webTable flex items-center border-[#e3e3e3] border-[1px] rounded-[12px] justify-between ">
                  <div className="flex w-[50%] rounded-tl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7]  h-full justify-between">
                    <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                      {t("summary.moveSize")}
                    </p>
                    <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                      {data?.houseSize}
                    </p>
                  </div>
                  <div className="flex w-[50%] rounded-br-[12px] p-[16px]  flex-col  hover:bg-[#f7f7f7]  h-full justify-between">
                    <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                      {data?.houseSize}
                    </p>
                    <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                      {getRoomCount("Others")} {t("summary.items")}
                    </p>
                  </div>
                </div>
              )}

              {/* mobile */}
              {isSmallSpace && (
                <div className="h-fit w-full mobileTable border-[#e3e3e3] border-[1px] mt-[20px] rounded-[12px]">
                  <div className="w-full h-[50%] flex items-center justify-between border-[#e3e3e3] border-b-[1px]">
                    <div className="flex w-[50%] rounded-tl-[12px] p-[16px] flex-col hover:bg-[#f7f7f7] h-full justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070]">
                        {t("summary.moveSize")}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans">
                        {data?.houseSize}
                      </p>
                    </div>

                    <div className="flex flex-col p-[16px] hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                      <p className="font-sans text-[14px] leading-[19.6px] text-[#707070]">
                        {data?.houseSize}
                      </p>
                      <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans">
                        {getRoomCount("Others")} {t("summary.items")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full h-[90px] webTable flex items-center border-[#e3e3e3] border-[1px] mt-[20px] rounded-[12px] justify-between ">
                <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full justify-between">
                  <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                    {t("summary.moveDate")}
                  </p>
                  <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                    {formatDate(data?.moreInfo?.moveDate)}
                  </p>
                </div>
                <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                  <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                    {t("summary.day")}
                  </p>
                  <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                    {getDayOfWeek(data?.moreInfo?.moveDate)}
                  </p>
                </div>
                <div className="flex p-[16px] rounded-br-[12px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                  <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                    {t("summary.moveTime")}
                  </p>
                  <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                    {convertTo12Hour(data?.moreInfo?.moveDate)}
                  </p>
                </div>
              </div>
              <div className="w-full h-[90px] webTable flex items-center border-[#e3e3e3] border-[1px] mt-[20px] rounded-[12px] justify-between ">
                <div className="flex rounded-bl-[12px] p-[16px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full justify-between">
                  <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                    {t("summary.moverPhone")}
                  </p>
                  <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                    {data?.moreInfo?.phoneNumber}
                  </p>
                </div>
                <div className="flex flex-col p-[16px]  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                  <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                    {t("summary.moverEmail")}
                  </p>
                  <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans ">
                    {data?.moreInfo?.email}
                  </p>
                </div>
                <div className="flex p-[16px] rounded-br-[12px] flex-col  hover:bg-[#f7f7f7] w-[33%] h-full  justify-between">
                  <p className="font-sans text-[14px] leading-[19.6px] text-[#707070] ">
                    {t("summary.address")}
                  </p>
                  <p className="text-[16px] overflow-hidden text-ellipsis whitespace-nowrap leading-[25.6px] font-light text-[#121212] font-sans ">
                    {data?.moreInfo?.pickUpAddress}
                  </p>
                </div>
              </div>

              {/* mobile */}
              <div className="h-fit w-full mobileTable border-[#e3e3e3] border-[1px] mt-[20px] rounded-[12px]">
                <div className="w-full h-[50%] flex items-center justify-between border-[#e3e3e3] border-b-[1px]">
                  <div className="flex w-[50%] rounded-tl-[12px] p-[16px] flex-col hover:bg-[#f7f7f7] h-full justify-between">
                    <p className="font-sans text-[14px] leading-[19.6px] text-[#707070]">
                      {t("summary.moveDate")}
                    </p>
                    <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans">
                      {formatDate(data?.moreInfo?.moveDate)}
                    </p>
                  </div>

                  <div className="flex flex-col p-[16px] hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                    <p className="font-sans text-[14px] leading-[19.6px] text-[#707070]">
                      {t("summary.day")}
                    </p>
                    <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans">
                      {getDayOfWeek(data?.moreInfo?.moveDate)}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[50%] flex items-center border-[#e3e3e3] border-b-[1px] justify-between">
                  <div className="flex rounded-bl-[12px] p-[16px] flex-col hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                    <p className="font-sans text-[14px] leading-[19.6px] text-[#707070]">
                      {t("summary.moveTime")}
                    </p>
                    <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans">
                      {convertTo12Hour(data?.moreInfo?.moveDate)}
                    </p>
                  </div>
                  <div className="flex flex-col p-[16px] hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                    <p className="font-sans text-[14px] leading-[19.6px] text-[#707070]">
                      {t("summary.moverPhone")}
                    </p>
                    <p className="text-[16px] leading-[25.6px] font-light text-[#121212] font-sans">
                      {data?.moreInfo?.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[50%] flex items-center justify-between">
                  <div className="flex rounded-bl-[12px] p-[16px] flex-col hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                    <p className="font-sans text-[14px] leading-[19.6px] text-[#707070]">
                      {t("summary.moverEmail")}
                    </p>
                    <p className="text-[16px] tableText leading-[25.6px] font-light text-[#121212] font-sans">
                      {data?.moreInfo?.email}
                    </p>
                  </div>
                  <div className="flex flex-col p-[16px] hover:bg-[#f7f7f7] w-[50%] h-full justify-between">
                    <p className="font-sans text-[14px] leading-[19.6px] text-[#707070]">
                      {t("summary.address")}
                    </p>
                    <p className="text-[16px] tableText overflow-hidden text-ellipsis whitespace-nowrap leading-[25.6px] font-light text-[#121212] font-sans">
                      {data?.moreInfo?.pickUpAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSummary;
