import QuoteSuccessIcon from "../Assets/SVG/QuoteSuccess";
import PrimaryBtn from "../components/PrimaryBtn";
import { useSelector } from "react-redux";
import { formatDate } from "../utils";
import { useTranslation } from "react-i18next";

const PaymentSuccess = ({ openModal }) => {
  const moversData = useSelector((state) => state.user.moversData);

  const { t } = useTranslation();

  return (
    <div className="fixed top-0 z-50 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.10)] h-full w-full flex pb-7 justify-center paymentSuccessModal items-center">
      <div className="flex flex-col paymentSuccessModalBox rounded-[12px] bg-white w-[470px] h-fit justify-center">
        <div className="flex flex-col  justify-center items-center px-[24px] pt-[24px] ">
          <div>
            <QuoteSuccessIcon />
          </div>
          <h2 className="my-3 text-center trackMoveSuccessText font-sans text-[24px] w-[90%] text-[#121212] font-bold ">
            {t("paymentSuccess.success")}
          </h2>
          <p className="text-[16px] text-center trackMoveSuccessSubText mb-3 font-light leading-[25.6px] w-[90%] text-[#525252] font-sans ">
            {t("paymentSuccess.tracking")}
          </p>
          <div className="w-[90%] mx-auto trackMoveSuccessInnerBox rounded-[8px] border-[1px] p-4 border-[#e3e3e3] h-fit mb-4 ">
            <p className="font-sans text-center text-[14px] text-[#707070] ml-2 leading-[25.6px] ">
              {t("paymentSuccess.location")}
            </p>
            <div className="flex justify-center items-center">
              <p className="text-[#121212] trackMoveSuccessInnerBoxText font-sans text-[18px] font-bold ">
                {formatDate(moversData?.moveDetails?.moveDate)}
              </p>
              {/* <p className="text-[#121212] trackMoveSuccessInnerBoxText font-sans text-[18px] font-bold ml-2 ">
                {convertTo12Hour(moversData?.moveDetails?.moveTime)}
              </p> */}
            </div>
            <p className="text-[#121212] mt-2 text-center trackMoveSuccessInnerBoxText font-sans text-[18px] font-bold ">
              {moversData?.moveDetails?.from}
            </p>
            <div className="flex flex-wrap w-[90%] items-center mx-auto "></div>
          </div>
        </div>
        <div className="border-[#e3e3e3] flex items-center justify-center p-[16px] border-t-[1px]">
          <PrimaryBtn
            // handlePress={closeSuccessModal}
            handlePress={openModal}
            className={"text-[14px] "}
          >
            {t("paymentSuccess.btn")}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
