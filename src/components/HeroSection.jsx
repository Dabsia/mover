import React from "react";
import SecondaryBtn from "./SecondaryBtn";
import PrimaryBtn from "./PrimaryBtn";
import HeroIcon from "../Assets/SVG/HeroIcon";
import StarIcon from "../Assets/SVG/StarIcon";
import ZoomingCard from "./ZoomingCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Use react-i18next

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full bg-gradient-to-b mt-[80px] from-[#E8F5F5] to-white">
      <div className="w-[90vw] heroSection pt-14 max-w-[1500px] items-center flex justify-between mx-auto">
        <div className="w-[60%] heroLeft">
          <h1 className="text-[38px] heroText leading-[150%] font-bold font-unbounded w-[75%]">
            {t("hero.headline")}
          </h1>
          <p className="my-[1rem] heroDesc font-sans text-[16px] leading-[160%] w-[90%] text-[#707070]">
            {t("hero.subheadline")}
          </p>
          <div className="flex heroBtnContainer items-center">
            <PrimaryBtn
              handlePress={() => navigate("/quote")}
              dummy={true}
              className={"text-[20px]"}
            >
              {t("hero.getQuote")}
            </PrimaryBtn>
            <div className="ml-5 secoondaryBtnContaiiner">
              <SecondaryBtn
                handlePress={() => navigate("/track-code")}
                dummy={true}
                className={"text-[20px] "}
              >
                {t("hero.trackMove")}
              </SecondaryBtn>
            </div>
          </div>
        </div>
        <div className="relative heroRight">
          <div className="flex drop-shadow-md smallLocationCard z-10 items-center absolute top-10 left-[-120px] bg-white rounded-[10px] w-fit p-3">
            <div className="bg-[#FFF2EB] h-[45px] w-[41px] rounded-[10px] flex items-center mr-4 justify-center">
              <div className="bg-[#FD6C00] h-[25px] w-[25px] rounded-full flex items-center justify-center">
                <HeroIcon />
              </div>
            </div>
            <div>
              <h4 className="text-[14px] font-sans">Urban Haulers</h4>
              <div className="flex items-center">
                <div className="border-[0.5px] border-[#D1D1D1] p-1 w-fit items-center rounded-[18px] flex">
                  <p className="mr-1 text-[8.58px] font-sora">4.3</p>
                  <StarIcon />
                </div>
                <p className="text-[#707070] text-[11px] font-sora ml-2">
                  Utrecht
                </p>
              </div>
            </div>
          </div>
          <ZoomingCard />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
