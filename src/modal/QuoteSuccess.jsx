import React from "react";
import QuoteSuccessIcon from "../Assets/SVG/QuoteSuccess";
import PrimaryBtn from "../components/PrimaryBtn";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const QuoteSuccess = ({ closeModal }) => {
  const { t } = useTranslation();
  const data = useSelector((state) => state.user);

  const firstName = data?.moreInfo?.fullName?.split(" ");
  return (
    <div className="fixed top-0 z-50 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.10)] h-full w-full flex justify-center items-center">
      <div className="flex flex-col rounded-[12px] bg-white w-[470px] justify-center">
        <div className="flex flex-col  justify-center items-center px-[24px] pt-[24px] ">
          <div>
            <QuoteSuccessIcon />
          </div>
          <h2 className="my-3 text-center font-sans text-[24px] w-[70%] text-[#121212] font-bold ">
            {t("quoteSuccess.thanks")} {firstName[0]}
          </h2>
          <p className="text-[16px] mb-3 font-light leading-[25.6px] text-[#525252] font-sans ">
            {t("quoteSuccess.sentToEmail")}
            {/* clear this when ready  */}
          </p>
        </div>
        <div className="border-[#e3e3e3] flex items-center justify-center p-[16px] border-t-[1px]">
          <PrimaryBtn handlePress={closeModal} className={"text-[14px] "}>
            {t("quoteSuccess.btn")}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

export default QuoteSuccess;
