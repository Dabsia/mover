import React from "react";
import QuoteSuccessIcon from "../Assets/SVG/QuoteSuccess";
import PrimaryBtn from "../components/PrimaryBtn";

const ReportSuccess = ({ closeModal }) => {
  return (
    <div className="fixed top-0 z-50 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.10)] h-full w-full flex justify-center items-center">
      <div className="flex flex-col rounded-[12px] bg-white w-[470px] justify-center">
        <div className="flex flex-col  justify-center items-center px-[24px] pt-[24px] ">
          <div>
            <QuoteSuccessIcon />
          </div>
          <h2 className="my-3 text-center font-sans text-[24px] w-[70%] text-[#121212] font-bold ">
            Your report has been sent successfully
          </h2>
          <p className="text-[16px] mb-3 font-light leading-[25.6px] text-[#525252] font-sans ">
            A tracking code has been sent to your mail
          </p>
        </div>
        <div className="border-[#e3e3e3] flex items-center justify-center p-[16px] border-t-[1px]">
          <PrimaryBtn handlePress={closeModal} className={"text-[14px] "}>
            OK, GOT IT
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

export default ReportSuccess;
