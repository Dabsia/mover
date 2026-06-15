import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LocationMap from "./LocationMap";

const TrackMove = () => {
  const moversData = useSelector((state) => state.user.moversData);
  console.log(moversData.moveDetails, "move");
  const code = JSON.parse(localStorage.getItem("Code")) || null;
  console.log(code?.result);

  const { state } = useLocation();
  const locationData = state?.data?.result;

  const fetchTrackingData = async () => {
    try {
      const response = await axios.get(
        `https://involved-birgit-zinter-cb767b47.koyeb.app/api/MoveRequest/TrackMove?code=${code?.result}`
      );

      // Check if response is valid
      if (!response.data) {
        throw new Error("No response data");
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data?.responseMessage ||
            "Failed to fetch tracking data"
        );
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error(error.message || "Failed to fetch tracking data");
      }
    }
  };

  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["trackMove"],
    queryFn: fetchTrackingData,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    retry: 3,
    staleTime: 0,
    enabled: !!code?.result,
  });

  if (isLoading) {
    return (
      <div className="ml-4 movingCompanyDetailBox h-fit w-full">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#136AB5]"></div>
          <span className="ml-2 text-[#136AB5]">Loading tracking data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-4 movingCompanyDetailBox h-fit w-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">
            <p>Error loading tracking data</p>
            <p className="text-sm">
              {error?.message || "No tracking data available"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  console.log(data, "tracking data");

  // Check if we have valid tracking data
  const hasTrackingData = state?.data?.responseStatus === true && locationData;

  // Get coordinates - use API data or fallback to moversData
  const fromPickupLongitude =
    hasTrackingData && locationData.fromLongitude
      ? locationData.fromLongitude
      : moversData?.moveDetails?.pickUpLongitude;

  const fromPickupLatitude =
    hasTrackingData && locationData.fromLatitude
      ? locationData.fromLatitude
      : moversData?.moveDetails?.pickUpLatitude;

  const toDropOffLongitude =
    hasTrackingData && locationData.toLongitude
      ? locationData.toLongitude
      : moversData?.moveDetails?.dropOffLongitude;

  const toDropOffLatitude =
    hasTrackingData && locationData.toLatitude
      ? locationData.toLatitude
      : moversData?.moveDetails?.dropOffLatitude;

  console.log(
    fromPickupLongitude,
    fromPickupLatitude,
    toDropOffLongitude,
    toDropOffLatitude,
    "coords"
  );

  // Get status flags from API - use defaults if no tracking data
  const hasArrived = hasTrackingData ? locationData.hasArrived || false : false;
  const inTransit = hasTrackingData ? locationData.inTransit || false : false;
  const isCompleted = hasTrackingData
    ? locationData.isCompleted || false
    : false;

  // Helper function to determine if step is active
  const isStepActive = (step) => {
    switch (step) {
      case "payment":
        return true; // Payment is always completed if we're on tracking page
      case "pickup":
        return inTransit || hasArrived || isCompleted;
      case "transit":
        return hasArrived || isCompleted;
      case "unload":
        return isCompleted;
      default:
        return false;
    }
  };

  return (
    <div className="ml-4 movingCompanyDetailBox h-fit w-full">
      <div className="overflow-y-scroll pb-[70px] custom-scroll ">
        <h3 className="mb-3 font-sans text-[20px] font-bold text-[#121212] ">
          {t("trackMove.title")}
        </h3>

        <div className="flex moversTrackInfoContainer items-center mb-4 bg-[#F0F9FD] w-fit rounded-[12px] p-[20px]  ">
          <div className="flex justify-center border-[1px] border-black items-center w-[24px] h-[24px] min-w-[24px] min-h-[24px] rounded-full mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="12"
              viewBox="0 0 4 12"
              fill="none"
            >
              <path
                d="M3.70645 4.07477L0.684674 4.45348L0.576471 4.95491L1.17027 5.06444C1.55822 5.15681 1.63475 5.29668 1.5503 5.68331L0.576471 10.2595C0.320478 11.4431 0.715024 12 1.64267 12C2.36182 12 3.1971 11.6675 3.57581 11.2109L3.69193 10.662C3.42802 10.8942 3.04271 10.9866 2.78672 10.9866C2.42384 10.9866 2.29189 10.7319 2.38558 10.2833L3.70645 4.07477ZM3.79881 1.31955C3.79881 1.66952 3.65979 2.00515 3.41233 2.25261C3.16486 2.50008 2.82923 2.6391 2.47926 2.6391C2.1293 2.6391 1.79366 2.50008 1.5462 2.25261C1.29874 2.00515 1.15971 1.66952 1.15971 1.31955C1.15971 0.969584 1.29874 0.633951 1.5462 0.386488C1.79366 0.139024 2.1293 0 2.47926 0C2.82923 0 3.16486 0.139024 3.41233 0.386488C3.65979 0.633951 3.79881 0.969584 3.79881 1.31955Z"
                fill="black"
              />
            </svg>
          </div>
          <p className="text-[#136AB5] moversTrackInfo font-sans text-[16px] leading-[25.6px]  ">
            {t("trackMove.desc")}
          </p>
        </div>

        <div className="flex gap-x-[22px] moveTimeLine items-center">
          {/* LocationMap - Show if we have valid coordinates */}
          {fromPickupLongitude &&
          fromPickupLatitude &&
          toDropOffLongitude &&
          toDropOffLatitude ? (
            <LocationMap
              fromPickupLongitude={fromPickupLongitude}
              fromPickupLatitude={fromPickupLatitude}
              toDropOffLongitude={toDropOffLongitude}
              toDropOffLatitude={toDropOffLatitude}
            />
          ) : (
            <div className="w-1/2 h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Loading map data...</p>
            </div>
          )}

          <div className="mt-4 moveTimeLineInfo relative ">
            {/* KEEP the overlay - it only shows when move is NOT completed */}
            {!isCompleted && (
              <div className="w-full h-[420px] moveTimeLineInfoOverlay absolute top-0 z-30 ">
                <div className="w-full h-[25%]"></div>
                <div className="w-full h-[75%] bg-white opacity-90 "></div>
              </div>
            )}
            <p className="font-sans text-[18px] mb-2 font-extralight text-[#121212] ">
              {t("trackMove.timeline")}
            </p>
            <div className="">
              {/* Payment Made */}
              <div className="flex gap-[10px] mb-[30px] relative items-center">
                <div
                  className={`absolute h-[80px] w-[2px] left-2 top-11 rounded-[1px] ${
                    isStepActive("pickup") ? "bg-[#136AB5]" : "bg-[#b8b8b8]"
                  }`}
                ></div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                >
                  <circle
                    cx="9.5"
                    cy="10"
                    r="9"
                    fill="#F5F5F5"
                    stroke="#121212"
                  />
                  <circle
                    cx="9.49862"
                    cy="9.99996"
                    r="6.14706"
                    fill="#121212"
                  />
                </svg>
                <div className="flex gap-[10px] items-center">
                  <div className="flex items-center justify-center rounded-full h-[50px] w-[50px] min-h-[50px] min-w-[50px] border-[1px] border-[#e3e3e3] trackMoveIconContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="13"
                      viewBox="0 0 24 13"
                      fill="none"
                    >
                      <path
                        d="M0 7.91554L5.88006 12.3928L15.3219 1.62763L13.4548 0L5.54037 9.02372L1.50256 5.94902L0 7.91554ZM24 1.62763L22.133 0L14.2371 9.00269L13.3036 8.25813L11.7539 10.19L14.5396 12.4138L24 1.62763Z"
                        fill="#121212"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-[18px] font-bold text-[#121212] ">
                      {t("trackMove.paymentMade")}
                    </p>
                    <p className="text-[14px] font-sans text-[#707070] w-[60%] trackMoveText font-extralight ">
                      {t("trackMove.paymentConfirmed")}{" "}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pickup Start */}
              <div className="flex gap-[10px] mb-[30px] relative items-center">
                <div
                  className={`absolute h-[80px] w-[2px] left-2 top-11 rounded-[1px] ${
                    isStepActive("transit") ? "bg-[#136AB5]" : "bg-[#b8b8b8]"
                  }`}
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                >
                  <circle
                    cx="9.5"
                    cy="10"
                    r="9"
                    fill="#F5F5F5"
                    stroke="#121212"
                  />
                  <circle
                    cx="9.49862"
                    cy="9.99996"
                    r="6.14706"
                    fill="#121212"
                  />
                </svg>
                <div className="flex gap-[10px] items-center">
                  <div className="flex items-center justify-center rounded-full h-[50px] w-[50px] min-h-[50px] min-w-[50px] border-[1px] border-[#e3e3e3] trackMoveIconContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M10 12H15M7 12H7.00898M12 16H7M15 16H14.991"
                        stroke="#141B34"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 1V3M5 1V3"
                        stroke="#141B34"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.5 11.2432C1.5 6.88594 1.5 4.70728 2.75212 3.35364C4.00424 2 6.01949 2 10.05 2H11.95C15.9805 2 17.9958 2 19.2479 3.35364C20.5 4.70728 20.5 6.88594 20.5 11.2432V11.7568C20.5 16.1141 20.5 18.2927 19.2479 19.6464C17.9958 21 15.9805 21 11.95 21H10.05C6.01949 21 4.00424 21 2.75212 19.6464C1.5 18.2927 1.5 16.1141 1.5 11.7568V11.2432Z"
                        stroke="#141B34"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 7H20"
                        stroke="#141B34"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-[18px] font-bold text-[#121212] ">
                      {t("trackMove.pickupStart")}
                    </p>
                    <p className="text-[14px] font-sans text-[#707070] w-[60%] trackMoveText font-extralight ">
                      {t("trackMove.mover")}
                    </p>
                  </div>
                </div>
              </div>

              {/* In Transit */}
              <div className="flex gap-[10px] mb-[30px] relative items-center">
                <div
                  className={`absolute h-[80px] w-[2px] left-2 top-11 rounded-[1px] ${
                    isStepActive("unload") ? "bg-[#136AB5]" : "bg-[#b8b8b8]"
                  }`}
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                >
                  <circle
                    cx="9.5"
                    cy="10"
                    r="9"
                    fill="#F5F5F5"
                    stroke="#121212"
                  />
                  <circle
                    cx="9.49862"
                    cy="9.99996"
                    r="6.14706"
                    fill="#121212"
                  />
                </svg>
                <div className="flex gap-[10px] items-center">
                  <div className="flex items-center justify-center rounded-full h-[50px] w-[50px] min-h-[50px] min-w-[50px] border-[1px] border-[#e3e3e3] trackMoveIconContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M10 17.5H16M16 17.5V6.5C16 5.96957 15.7893 5.46086 15.4142 5.08579C15.0391 4.71071 14.5304 4.5 14 4.5H4C3.46957 4.5 2.96086 4.71071 2.58579 5.08579C2.21071 5.46086 2 5.96957 2 6.5V16.5C2 16.7652 2.10536 17.0196 2.29289 17.2071C2.48043 17.3946 2.73478 17.5 3 17.5H4M16 17.5V8.5H18C19.0609 8.5 20.0783 8.92143 20.8284 9.67157C21.5786 10.4217 22 11.4391 22 12.5V16.5C22 16.7652 21.8946 17.0196 21.7071 17.2071C21.5196 17.3946 21.2652 17.5 21 17.5M16 17.5H21M21 17.5C21 18.2956 20.6839 19.0587 20.1213 19.6213C19.5587 20.1839 18.7956 20.5 18 20.5C17.2044 20.5 16.4413 20.1839 15.8787 19.6213C15.3161 19.0587 15 18.2956 15 17.5H21ZM22 14.5H20"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 20.5C8.65685 20.5 10 19.1569 10 17.5C10 15.8431 8.65685 14.5 7 14.5C5.34315 14.5 4 15.8431 4 17.5C4 19.1569 5.34315 20.5 7 20.5Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-[18px] font-bold text-[#121212] ">
                      {t("trackMove.transit")}
                    </p>
                    <p className="text-[14px] font-sans text-[#707070] w-[60%] trackMoveText font-extralight ">
                      {t("trackMove.belongings")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Unload */}
              <div className="flex gap-[10px] items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                >
                  <circle
                    cx="9.5"
                    cy="10"
                    r="9"
                    fill="#F5F5F5"
                    stroke="#121212"
                  />
                  <circle
                    cx="9.49862"
                    cy="9.99996"
                    r="6.14706"
                    fill="#121212"
                  />
                </svg>
                <div className="flex gap-[10px] items-center">
                  <div className="flex items-center justify-center rounded-full h-[50px] w-[50px] min-h-[50px] min-w-[50px] border-[1px] border-[#e3e3e3] trackMoveIconContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="33"
                      viewBox="0 0 33 33"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.4144 6L26.3265 9.08524L27.449 10.033V23.6242L26.81 24.5921L16.2245 28L5.62166 24.5921L5 23.6242V10.033L6.05338 9.08524L15.9482 6H16.4144ZM16.259 8.0165L9.35165 10.033L10.3014 10.4363L16.2245 12.2511L21.405 10.6178L23.0455 10.033L16.259 8.0165ZM6.72684 22.8579L15.3611 25.6205V14.066L6.72684 11.3639V22.8579ZM17.0879 14.066V25.6205L25.7221 22.8579V11.3034L22.2339 12.4185V17.5949L20.5071 18.1192V12.971L17.0879 14.066Z"
                        fill="#121212"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-[18px] font-bold text-[#121212] ">
                      {t("trackMove.unload")}
                    </p>
                    <p className="text-[14px] font-sans text-[#707070] w-[60%] trackMoveText font-extralight ">
                      {t("trackMove.moverUload")}
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

export default TrackMove;
