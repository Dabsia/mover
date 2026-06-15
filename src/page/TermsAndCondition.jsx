import React, { useEffect } from "react";
import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const TermsAndCondition = () => {
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
              {t("terms.title")}
            </h1>
            <hr className="my-5" />
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoOne")}
              </h3>
              <p className="w-full text-[#707070] leading-[160%] text-[16px] font-sans  ">
                {t("terms.oneDesc")}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoTwo")}
              </h3>
              <ul className="w-full gap-3 flex flex-col ">
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoTwoDesc1")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoTwoDesc2")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoTwoDesc3")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoThree")}
              </h3>
              <ul className="w-full gap-3 flex flex-col ">
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoThreeDesc1")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoThreeDesc2")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoThreeDesc3")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoFour")}
              </h3>
              <ul className="w-full gap-3 flex flex-col ">
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoFourDesc1")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoFourDesc2")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoFourDesc3")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoFive")}
              </h3>
              <ul className="w-full gap-3 flex flex-col ">
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoFiveDesc1")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoFiveDesc2")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoFiveDesc3")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoFiveDesc4")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoSix")}
              </h3>
              <ul className="w-full gap-3 flex flex-col ">
                <p className="w-full text-[#707070] leading-[160%] mb-3 text-[16px] font-sans  ">
                  {t("terms.infoSixDescHeader")}
                </p>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoSixDesc1")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoSixDesc2")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoSixDesc3")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoSeven")}
              </h3>
              <ul className="w-full gap-3 flex flex-col ">
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoSevenDesc1")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoSevenDesc2")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoEight")}
              </h3>
              <ul className="w-full gap-3 flex flex-col ">
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoEightDesc1")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoEightDesc2")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoNine")}
              </h3>
              <ul className="w-full gap-3 flex flex-col ">
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoNineDesc1")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoNineDesc2")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoNineDesc3")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoTen")}
              </h3>
              <ul className="w-full gap-3 flex flex-col ">
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoTenDesc1")}
                  </span>
                </li>
                <li className="list-disc list-inside marker:text-[#707070] ">
                  <span className="text-[#707070] leading-[160%] text-[16px] font-sans ">
                    {t("terms.infoTenDesc2")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold mb-3 font-sans text-[#121212] text-[32px] ">
                {t("terms.infoEleven")}
              </h3>
              <p className="w-full text-[#707070] leading-[160%] text-[16px] font-sans  ">
                {t("terms.infoElevenDesc")}
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

export default TermsAndCondition;
