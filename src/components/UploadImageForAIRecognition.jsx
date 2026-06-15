import React from "react";
import "./UploadImageForAIRecognition.css";
import { useTranslation } from "react-i18next";

const UploadImageForAIRecognition = ({ openUploadImageModal }) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={openUploadImageModal}
      className="mt-4 w-full h-[280px] border-[1px] cursor-pointer border-[#054D96] rounded-[12px]"
    >
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full imageContainer flex justify-center items-center rounded-t-[12px] h-[240px]"
      >
        <div className="backdrop-blur-[3px] blurryContainer bg-[rgba(255,255,255,0.50)] w-[50%] h-[75%] rounded-[10px]  ">
          <div className="flex flex-col w-[80%] mx-auto items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M23.9718 18.2614C18.0798 20.208 16.1178 22.1704 14.1711 28.0621C14.0109 28.5465 13.326 28.5465 13.1659 28.0621C11.2193 22.1701 9.25689 20.2081 3.36523 18.2614C2.88086 18.1013 2.88086 17.4164 3.36523 17.2562C9.25723 15.3096 11.2192 13.3472 13.1659 7.45556C13.3261 6.97119 14.011 6.97119 14.1711 7.45556C16.1177 13.3476 18.0801 15.3096 23.9718 17.2562C24.4561 17.4164 24.4561 18.1013 23.9718 18.2614Z"
                fill="black"
              />
              <path
                d="M28.246 8.58524C25.3007 9.55791 24.319 10.5397 23.345 13.4862C23.2656 13.7284 22.9231 13.7284 22.8424 13.4862C21.8697 10.5409 20.888 9.55924 17.9414 8.58524C17.6992 8.50581 17.6992 8.16337 17.9414 8.08264C20.8867 7.10997 21.8684 6.12821 22.8424 3.18164C22.9218 2.93945 23.2643 2.93945 23.345 3.18164C24.3177 6.12694 25.2994 7.10864 28.246 8.08264C28.4882 8.16207 28.4882 8.50451 28.246 8.58524Z"
                fill="black"
              />
            </svg>
            <p className="font-sans imageRecogText text-[20px] my-2 text-[#121212] ">
              {t("uploadContainer.title")}
            </p>
            <p className=" font-sans text-[14px] imageRecogDesc text-center text-[#121212] mb-2">
              {t("uploadContainer.desc")}
            </p>
            <button className="self-center bg-primary py-1 px-2 text-white rounded-[20px] cursor-pointer text-[12px] text-manrope font-light ">
              {t("uploadContainer.btn")}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center h-[40px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <g clip-path="url(#clip0_1323_4742)">
            <path
              d="M6.99947 1.1665C5.2448 1.1665 4.1073 2.34425 2.76213 2.77359C2.21497 2.94859 1.94138 3.0355 1.83055 3.15859C1.71972 3.28109 1.68763 3.46134 1.62288 3.82067C0.928717 7.66834 2.44538 11.2255 6.06205 12.6103C6.44997 12.7591 6.64422 12.8332 7.00122 12.8332C7.35822 12.8332 7.55305 12.7585 7.94155 12.6098C11.5576 11.2255 13.0726 7.66834 12.3784 3.82067C12.3136 3.46134 12.281 3.28109 12.1701 3.158C12.0593 3.03492 11.7863 2.948 11.2391 2.77359C9.89338 2.34425 8.75413 1.1665 6.99947 1.1665Z"
              stroke="#054D96"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.9799 5.80928C5.9799 5.77428 5.98456 5.57244 5.98573 5.31928C5.98573 5.08711 5.9659 4.86428 6.07673 4.66011C6.4909 3.83528 7.6809 3.91928 7.9749 4.75928C8.02565 4.89753 8.02915 5.11628 8.0274 5.31928C8.02565 5.57769 8.0309 5.80928 8.0309 5.80928M6.03065 6.05486C5.40065 6.05486 5.08565 6.50986 5.01565 6.78986C4.94565 7.06986 4.94565 8.08486 4.98765 8.50486C5.12765 9.02986 5.47765 9.24686 5.82065 9.31686C6.13565 9.34486 7.46565 9.33436 7.85065 9.33436C8.41065 9.34486 8.83065 9.13486 9.00565 8.50486C9.04065 8.29486 9.07565 7.13986 8.98815 6.78986C8.80265 6.22986 8.34065 6.05486 7.99065 6.05486H6.03065Z"
              stroke="#054D96"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1323_4742">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className="text-[#054D96] ml-1 textSecure font-sans tetxt-[14px] font-bold  ">
          {t("uploadContainer.secure")}
        </p>
      </div>
    </div>
  );
};

export default UploadImageForAIRecognition;
