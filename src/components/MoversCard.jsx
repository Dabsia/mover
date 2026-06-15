import img from "../Assets/Rectangle 4562.svg";
import { useDispatch } from "react-redux";
import { setMoversData } from "../redux/action";
import { useTranslation } from "react-i18next";
import { stripPTags } from "../utils";

const MoversCard = ({ makeActive, quoteData }) => {
  const dispatch = useDispatch();
  const makeCardActive = () => {
    dispatch(setMoversData(quoteData));
    makeActive();
  };

  const { t } = useTranslation();

  // Get the stripped text
  const additionalInfo = stripPTags(quoteData?.additionalInformation);
  const shouldShowLoremText = (additionalInfo?.length || 0) > 50;

  return (
    <div
      onClick={makeCardActive}
      className="relative w-full moversCardHolder h-fit border-[1px] cursor-pointer pb-3 border-[#e3e3e3] rounded-[16px]"
    >
      <div className="border-[0.5px] backdrop-blur-[3px] bg-[rgba(255,255,255,0.50)] border-[#D1D1D1] py-1 px-2  w-fit absolute top-5 left-5 items-center rounded-[18px] flex ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
        >
          <path
            d="M9 13.2593L14.562 16.4004L13.086 10.4804L18 6.49723L11.529 5.97513L9 0.400391L6.471 5.97513L0 6.49723L4.905 10.4804L3.438 16.4004L9 13.2593Z"
            fill="#FCB92E"
          />
        </svg>
        <p className="ml-1 self-center text-[16px] font-sora ">4.3</p>
      </div>
      {/* <img src={img} alt="user" className="w-full  " /> */}
      <img src={img || quoteData?.image} alt="user" className="w-full  " />
      <div className="border-b-[1px] pb-[20px] border-[#e3e3e3]">
        <div className="w-[90%] mx-auto ">
          <div className="flex items-center mt-2 justify-between">
            <p className="font-sans text-[24px] cardCompanyName leading-[38.5px] font-thin ">
              {" "}
              {quoteData?.companyName}
            </p>
            <div className="bg-[#DCFAE6] rounded-[4px] px-[8px] py-[4px] ">
              <p className="text-[#079455] cardCompanyAvailability text-[14px] font-sans leading-[18.2px] ">
                {t("payment.available")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto mt-3 ">
        <p className="text-[#9e9e9e] font-thin text-[16px] cardCompanyDistance leading-[25.6px] font-sans ">
          22 {t("payment.miles")}
        </p>
        <div className="flex items-center mt-2 justify-between">
          <p className="font-sans text-[32px] cardCompanyAmount leading-[38.5px] font-normal ">
            {" "}
            €{quoteData?.amount}
          </p>

          {!shouldShowLoremText && (
            <p className="text-[#9e9e9e] cardCompanyFeatures font-normal text-[16px] leading-[25.6px] font-sans  ">
              {additionalInfo}
            </p>
          )}
        </div>
        {shouldShowLoremText && (
          <p className="text-[#9e9e9e] cardCompanyFeatures font-normal text-[16px] leading-[25.6px] font-sans  ">
            {additionalInfo}
          </p>
        )}
      </div>
    </div>
  );
};

export default MoversCard;
