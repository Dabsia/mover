import React from "react";
import { useTranslation } from "react-i18next";

const StaticMoversStepper = () => {
  const { t } = useTranslation();
  const activeTab = 4;
  return (
    <div className="h-fit w-[350px] staticContainer mb-4 bg-[#f7f7f7] rounded-[20px] border-[1px] border-[#E4F2FB] px-[24px] py-[32px] ">
      <div className="flex relative">
        <div
          className={`absolute top-8 left-[15px] ${
            activeTab > 1 ? "bg-[#248CD9]" : "bg-[#E3E8EF]"
          } h-[40px] w-[2px] rounded-[2px] `}
        ></div>
        <div className="mr-4">
          <div className="h-[32px] w-[32px] flex justify-center items-center border-[2px] border-[#248CD9] rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
            >
              <path
                d="M2 8.81818C2 8.81818 3.28571 8.81818 5 12C5 12 9.76471 3.66667 14 2"
                stroke="#248CD9"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="h-[70px] ">
          <p
            className={`text-[#121212] max-w-[210px] truncate font-sans font-bold text-[16px] mb-2`}
          >
            {t("moversProgress.location")}
          </p>
        </div>
      </div>
      <div className="flex relative">
        <div
          className={`absolute top-8 left-[15px] ${
            activeTab > 2 ? "bg-[#248CD9]" : "bg-[#E3E8EF]"
          } h-[40px] w-[2px] rounded-[2px] `}
        ></div>
        <div className="mr-4">
          <div className="h-[32px] w-[32px] flex justify-center items-center border-[2px] border-[#248CD9] rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
            >
              <path
                d="M2 8.81818C2 8.81818 3.28571 8.81818 5 12C5 12 9.76471 3.66667 14 2"
                stroke="#248CD9"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="h-[70px] ">
          <p
            className={`text-[#121212] max-w-[210px] truncate font-sans font-bold text-[16px] mb-2`}
          >
            {t("moversProgress.setup")}
          </p>
        </div>
      </div>
      <div className="flex relative">
        <div
          className={`absolute top-8 left-[15px] ${
            activeTab > 3 ? "bg-[#248CD9]" : "bg-[#E3E8EF]"
          } h-[40px] w-[2px] rounded-[2px] `}
        ></div>
        <div className="mr-4">
          <div className="h-[32px] w-[32px] flex justify-center items-center border-[2px] border-[#248CD9] rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
            >
              <path
                d="M2 8.81818C2 8.81818 3.28571 8.81818 5 12C5 12 9.76471 3.66667 14 2"
                stroke="#248CD9"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="h-[70px] ">
          <p
            className={`text-[#121212] max-w-[210px] truncate font-sans font-bold text-[16px] mb-2`}
          >
            {t("moversProgress.moving")}
          </p>
        </div>
      </div>
      <div className="flex ">
        <div className="mr-4">
          <div className="h-[32px] w-[32px] flex justify-center items-center border-[2px] border-[#248CD9] rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
            >
              <path
                d="M2 8.81818C2 8.81818 3.28571 8.81818 5 12C5 12 9.76471 3.66667 14 2"
                stroke="#248CD9"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="h-fit ">
          <p
            className={`text-[#121212] max-w-[210px] truncate font-sans font-bold text-[16px] mb-2`}
          >
            {t("moversProgress.view")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaticMoversStepper;
