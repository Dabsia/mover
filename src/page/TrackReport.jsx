import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import QuoteHeader from "../components/QuoteHeader";

const TrackReport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="w-[90vw] relative max-w-[1500px] mx-auto mt-24">
        <div className="w-full mt-4 ">
          <QuoteHeader />
          <div className="w-full h-[70vh] bg-white">
            <div className="flex items-center">
              <Link to="/">
                <p className="text-[#9e9e9e] text-[14px] font-sans leading-[19.6px]">
                  Home
                </p>{" "}
              </Link>
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
              <p className="text-[#525252] text-[16px] font-bold font-sans  ">
                Track your report
              </p>
            </div>
            <div className="relative ">
              <div className="w-[50%] relative max-w-[1500px] mx-auto mt-8">
                <div className="movingCompanyDetailBox h-fit w-full">
                  <div className="overflow-y-scroll pb-[70px] custom-scroll ">
                    <h3 className="mb-3 font-sans text-[20px] font-bold text-[#121212] ">
                      Track Report
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
                        We’ve received your report and our team is currently
                        reviewing it. You can track the status of your report
                        here.
                      </p>
                    </div>
                    <div className="flex gap-x-[22px] border-[1px] border-[#e5e5e5] p-8 rounded-[12px] moveTimeLine items-center">
                      <div className="moveTimeLineInfo relative ">
                        <p className="font-sans text-[18px] mb-2 font-extralight text-[#121212] ">
                          Report tracking
                        </p>
                        <div className="">
                          <div className="flex gap-[10px] mb-[30px] relative items-center">
                            <div className="absolute h-[80px] w-[2px] left-2 top-11 bg-[#b8b8b8] rounded-[1px] "></div>

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
                              <div>
                                <p className="font-sans text-[18px] font-bold text-[#121212] ">
                                  Report Received
                                </p>
                                <p className="text-[14px] font-sans text-[#707070] w-[60%] trackMoveText font-extralight ">
                                  Your report has been received succesfully
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-[10px] mb-[30px] relative items-center">
                            <div className="absolute h-[80px] w-[2px] left-2 top-11 bg-[#b8b8b8] rounded-[1px] "></div>
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
                              <div>
                                <p className="font-sans text-[18px] font-bold text-[#121212] ">
                                  Pending review and action
                                </p>
                                <p className="text-[14px] font-sans text-[#707070] w-[60%] trackMoveText font-extralight ">
                                  Report has been escalated and currently
                                  undergoing review
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-[10px] mb-[30px] relative items-center">
                            <div className="absolute h-[80px] w-[2px] left-2 top-11 bg-[#b8b8b8] rounded-[1px] "></div>
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
                              <div>
                                <p className="font-sans text-[18px] font-bold text-[#121212] ">
                                  Report being treated
                                </p>
                                <p className="text-[14px] font-sans text-[#707070] w-[60%] trackMoveText font-extralight ">
                                  Your claims regarding the report has been
                                  verified and acknowledged
                                </p>
                              </div>
                            </div>
                          </div>
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
                              <div>
                                <p className="font-sans text-[18px] font-bold text-[#121212] ">
                                  Resolution
                                </p>
                                <p className="text-[14px] font-sans text-[#707070] w-[60%] trackMoveText font-extralight ">
                                  Your claims has been resolved, the mover will
                                  reach out to you for a resolution
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default TrackReport;
