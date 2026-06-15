import React, { useEffect } from "react";
import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="  w-full  bg-gradient-to-b mt-[80px] from-[#E8F5F5] to-white">
        <div className="w-[90vw] heroSection pt-14 max-w-[1500px] items-center flex justify-between mx-auto">
          <div className="md:w-[70%] w-[100%] mx-auto  ">
            <h1 className="font-unbounded font-semibold text-[48px] text-black ">
              {t("privacy.title")}
            </h1>
            <hr className="my-5" />
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoOne")}
              </h3>
              <p className="w-full text-[#707070] leading-[160%] text-[16px] font-sans  ">
                {t("privacy.oneDesc")}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoTwo")}
              </h3>
              <p className="w-full flex flex-col  ">
                <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoTwoDesc1")}
                </span>
                <span className="text-[#707070] my-3 leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoTwoDesc2")}
                </span>
                <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoTwoDesc3")}
                </span>
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoThree")}
              </h3>
              <p className="w-full flex flex-col  ">
                <span className="text-[#707070] font-bold leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoThreeHeader")}
                </span>
                <span className="text-[#707070] my-3 leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoThreeDesc1")}
                </span>
                <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoThreeDesc2")}
                </span>
                <span className="text-[#707070] my-3 leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoThreeDesc3")}
                </span>
                <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoThreeDesc4")}
                </span>
                <span className="text-[#707070] my-3 leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoThreeDesc5")}
                </span>
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoFour")}
              </h3>
              <p className="w-full flex flex-col  ">
                <span className="text-[#707070] font-bold leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoFourHeader")}
                </span>
                <span className="text-[#707070] my-3 leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoFourDesc1")}
                </span>
                <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoFourDesc2")}
                </span>
                <span className="text-[#707070] my-3 leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoFourDesc3")}
                </span>
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoFive")}
              </h3>
              <p className="w-full text-[#707070] leading-[160%] text-[16px] font-sans  ">
                {t("privacy.infoFiveDesc")}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoSix")}
              </h3>
              <p className="w-full flex flex-col  ">
                <span className="text-[#707070] font-bold leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoSixHeader")}
                </span>
                <span className="text-[#707070] my-3 leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoSixDesc1")}
                </span>
                <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoSixDesc2")}
                </span>
                <span className="text-[#707070] my-3 leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoSixDesc3")}
                </span>
                <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoSixDesc4")}
                </span>
                <span className="text-[#707070] mt-3 leading-[160%] text-[16px] font-sans ">
                  {t("privacy.infoSixDesc5")}
                </span>
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoSeven")}
              </h3>
              <p className="w-full text-[#707070] leading-[160%] text-[16px] font-sans  ">
                {t("privacy.infoSevenDesc")}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoEight")}
              </h3>
              <p className="w-full flex flex-col  ">
                <div className="flex md:flex-row flex-col md:items-center">
                  <span className="text-[#707070] font-bold leading-[160%] text-[16px] font-sans ">
                    {t("privacy.infoEight1Header")}
                  </span>
                  <span className="ml-1 text-[#707070] leading-[160%] text-[16px] font-sans  ">
                    {t("privacy.infoEight1Desc")}
                  </span>
                </div>
                <div className="flex my-3 md:flex-row flex-col md:items-center">
                  <span className="text-[#707070] font-bold leading-[160%] text-[16px] font-sans ">
                    {t("privacy.infoEight2Header")}
                  </span>
                  <span className="ml-1 text-[#707070] leading-[160%] text-[16px] font-sans  ">
                    {t("privacy.infoEight2Desc")}
                  </span>
                </div>
                <div className="flex md:items-center md:flex-row flex-col">
                  <span className="text-[#707070] font-bold leading-[160%] text-[16px] font-sans ">
                    {t("privacy.infoEight3Header")}
                  </span>
                  <span className="ml-1 text-[#707070] leading-[160%] text-[16px] font-sans  ">
                    {t("privacy.infoEight3Desc")}
                  </span>
                </div>
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoNine")}
              </h3>
              <p className="w-full text-[#707070] leading-[160%] text-[16px] font-sans  ">
                {t("privacy.infoNineDesc")}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("privacy.infoTen")}
              </h3>
              <p className="w-full text-[#707070] leading-[160%] text-[16px] font-sans  ">
                {t("privacy.infoTenDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ContactUs />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
