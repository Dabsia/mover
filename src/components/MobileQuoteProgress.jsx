import React from "react";

const MobileQuoteProgress = ({ activeTab }) => {
  return (
    <div className="h-fit mb-3 w-full bg-[#f7f7f7] hidden mobileQuoteProgress rounded-[20px] border-[1px] border-[#E4F2FB] px-[24px] py-[32px] ">
      <div className="flex items-center w-full justify-between">
        <div className="flex w-[80%] justify-between items-center ">
          <div className="flex relative">
            <div
              className={`absolute top-4 left-[30px] ${
                activeTab > 1 ? "bg-[#248CD9]" : "bg-[#E3E8EF]"
              } h-[2px] w-[150px] rounded-[2px] mobileProgressArrow`}
            ></div>
            <div className="mr-4">
              {activeTab > 1 ? (
                <div className="h-[32px] w-[32px] flex justify-center z-40 bg-white items-center border-[2px] border-[#248CD9] rounded-full">
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
              ) : (
                <div>
                  {activeTab === 1 ? (
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
                  ) : (
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
                        fill="#fff"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="30"
                        height="30"
                        rx="15"
                        stroke="#CDD5DF"
                        stroke-width="2"
                      />
                      <circle cx="16" cy="16" r="5" fill="#CDD5DF" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex relative">
            <div
              className={`absolute top-4 left-[30px] ${
                activeTab > 2 ? "bg-[#248CD9]" : "bg-[#E3E8EF]"
              }  h-[2px] w-[150px] mobileProgressArrow  rounded-[2px] `}
            ></div>
            <div className="mr-4">
              {activeTab > 2 ? (
                <div className="h-[32px] w-[32px] flex justify-center z-40 bg-white items-center border-[2px] border-[#248CD9] rounded-full">
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
              ) : (
                <div>
                  {activeTab === 2 ? (
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
                  ) : (
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
                        fill="#fff"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="30"
                        height="30"
                        rx="15"
                        stroke="#CDD5DF"
                        stroke-width="2"
                      />
                      <circle cx="16" cy="16" r="5" fill="#CDD5DF" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex relative">
            <div
              className={`absolute top-4 left-[30px] ${
                activeTab > 3 ? "bg-[#248CD9]" : "bg-[#E3E8EF]"
              }  h-[2px] w-[140px]  mobileProgressArrow rounded-[2px] `}
            ></div>
            <div className="mr-4">
              {activeTab > 3 ? (
                <div className="h-[32px] w-[32px] flex justify-center z-40 bg-white items-center border-[2px] border-[#248CD9] rounded-full">
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
              ) : (
                <div>
                  {activeTab === 3 ? (
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
                  ) : (
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
                        fill="#fff"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="30"
                        height="30"
                        rx="15"
                        stroke="#CDD5DF"
                        stroke-width="2"
                      />
                      <circle cx="16" cy="16" r="5" fill="#CDD5DF" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex ">
            <div className="mr-4">
              {activeTab > 4 ? (
                <div className="h-[32px] w-[32px] flex justify-center z-40 items-center border-[2px] border-[#248CD9] rounded-full">
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
              ) : (
                <div>
                  {activeTab === 4 ? (
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
                  ) : (
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
                        fill="#fff"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="30"
                        height="30"
                        rx="15"
                        stroke="#CDD5DF"
                        stroke-width="2"
                      />
                      <circle cx="16" cy="16" r="5" fill="#CDD5DF" />
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-[32px] w-[32px] rounded-full flex justify-center z-40 bg-white  items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.8124 5.26768C13.641 5.09628 13.4085 5 13.166 5C12.9236 5 12.6911 5.09628 12.5197 5.26768L7.99413 9.7932L3.46861 5.26768C3.29618 5.10114 3.06524 5.00899 2.82552 5.01107C2.58581 5.01316 2.35651 5.10931 2.187 5.27882C2.01749 5.44833 1.92134 5.67763 1.91926 5.91734C1.91717 6.15706 2.00932 6.388 2.17586 6.56042L7.34776 11.7323C7.5192 11.9037 7.7517 12 7.99413 12C8.23656 12 8.46906 11.9037 8.6405 11.7323L13.8124 6.56042C13.9838 6.38898 14.0801 6.15648 14.0801 5.91405C14.0801 5.67163 13.9838 5.43913 13.8124 5.26768Z"
              fill="#9E9E9E"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MobileQuoteProgress;
