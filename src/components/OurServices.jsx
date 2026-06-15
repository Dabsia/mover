import React from "react";
import residentalMoving from "../Assets/residential-moving.svg";
import customizeMoving from "../Assets/customize-moving.svg";
import customerSolution from "../Assets/customer-solution.svg";
import technologyLogistics from "../Assets/technology-logistics.svg";
import imageRecognition from "../Assets/image-recognition.svg";
import "./ourServices.css";
import { useTranslation } from "react-i18next";

const OurServices = () => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-full">
      <div className="services_container mx-auto w-[90vw] max-w-[1500px]">
        <div className="our_services_container w-full mb-3">
          <div className="w-fit">{t("services.title")}</div>
          <div>{t("services.description")}</div>
          <div>{t("services.more")}</div>
        </div>
        <div>
          <div className="our_services_card_container">
            <div className="our_services_card">
              <img src={residentalMoving} alt="" />
              <h3>{t("services.service1Title")}</h3>
              <span>{t("services.service1Desc")}</span>
            </div>
            <div className="our_services_card">
              <img src={customizeMoving} alt="" />
              <h3>{t("services.service2Title")}</h3>
              <span>{t("services.service2Desc")}</span>
            </div>
            <div className="our_services_card">
              <img src={customerSolution} alt="" />
              <h3>{t("services.service3Title")}</h3>
              <span>{t("services.service3Desc")}</span>
            </div>
          </div>
          <div className="our_services_card_sub_container">
            <div className="our_services_card_sub">
              <img src={technologyLogistics} alt="" />
              <h3>{t("services.service4Title")}</h3>
              <span>{t("services.service4Desc")}</span>
            </div>
            <div className="our_services_card_sub">
              <img src={imageRecognition} alt="" />
              <h3>{t("services.service5Title")}</h3>
              <span>{t("services.service5Desc")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
