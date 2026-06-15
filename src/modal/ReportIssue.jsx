import React, { useState } from "react";
import { formattedItems, countMap } from "../utils";
import ReportIcon1 from "../Assets/SVG/ReportIcon1";
import RightIcon from "../Assets/SVG/RightIcon";
import ReportIcon2 from "../Assets/SVG/ReportIcon2";
import { useNavigate } from "react-router-dom";
import TrackCodeModal from "../modal/TrackCodeModal";
// import "./ReportIssue.css";

const ReportIssue = ({ closeModal }) => {
  const navigate = useNavigate();
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  const openTrackModal = () => {
    setIsTrackModalOpen(true);
    // closeModal();
  };

  const closeTrackModal = () => {
    setIsTrackModalOpen(false);
  };

  return (
    <div className="fixed top-0 z-50 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.10)] h-full w-full flex justify-center items-center ">
      <div className="bg-white flex flex-col justify-between w-[50%] rounded-[16px] h-[50%]">
        <div className="flex items-center w-full justify-between p-[28px] border-b-[1px] border-[#E3E8EF] ">
          <div className="flex inventoryListHeader items-center">
            <h3 className="font-sans text-[20px] font-bold text-[#121212] ">
              Report an Issue
            </h3>
          </div>
          <div
            onClick={closeModal}
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
            </svg>
          </div>
        </div>
        <div className="w-full pt-4 h-[90%]">
          <div className=" p-[28px] w-full flex-col flex gap-4 py-4 mx-auto h-full ">
            <div
              onClick={() => navigate("/make-report")}
              className="border-[1px] cursor-pointer  px-[16px] py-[12px] flex justify-between items-center border-[#e3e3e3] rounded-[12px] h-[100px] "
            >
              <div className="flex items-center gap-4 w-[90%] ">
                <div className=" h-[60px] flex-shrink-0 w-[60px] rounded-full bg-[#C0FEFF] items-center flex justify-center ">
                  <ReportIcon1 />
                </div>
                <div>
                  <h3 className=" font-sora font-medium text-[18px] text-black ">
                    Make a report
                  </h3>
                  <p className="w-full mr-4 font-sans font-light text-[16px] text-[#707070] ">
                    Report a delivery issue such as missing or damaged goods.
                    Our team will investigate and get back to you promptly.
                  </p>
                </div>
              </div>
              <RightIcon color="#b8b8b8" />
            </div>
            <div
              onClick={openTrackModal}
              className="border-[1px] cursor-pointer px-[16px] py-[12px] flex justify-between items-center border-[#e3e3e3] rounded-[12px] h-[100px] "
            >
              <div className="flex items-center gap-4 w-[90%] ">
                <div className=" h-[60px] flex-shrink-0 w-[60px] rounded-full bg-[#fff5da] items-center flex justify-center ">
                  <ReportIcon2 />
                </div>
                <div>
                  <h3 className=" font-sora font-medium text-[18px] text-black ">
                    Track a report
                  </h3>
                  <p className="w-full mr-4 font-sans font-light text-[16px] text-[#707070] ">
                    Stay informed by checking the current status, and progress
                    of your submitted report. We’ll keep you in the loop every
                    step of the way.
                  </p>
                </div>
              </div>
              <RightIcon color="#b8b8b8" />
            </div>
          </div>
        </div>
      </div>
      {isTrackModalOpen && <TrackCodeModal closeModal={closeTrackModal} />}
    </div>
  );
};

export default ReportIssue;
