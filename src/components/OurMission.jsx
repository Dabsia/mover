import React from "react";
import stepIcon from "../Assets/_Step icon base.svg";
import connectorIcon from "../Assets/Connector.svg";
import "./ourMission.css";
import { useTranslation } from "react-i18next";

const OurMission = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="hassle_steps_container">
        <p className="hassle_steps_text">{t("hasslefree.title")}</p>
        <div className="steps">
          <img src={stepIcon} alt="" />
          <img className="connectorLine" src={connectorIcon} alt="" />
          <img src={stepIcon} alt="" />
        </div>
      </div>
      <div className="our_mission_text_container">
        <div className="our_mission_text">
          <h2>{t("hasslefree.description")}</h2>
          <p>{t("hasslefree.more")}</p>
        </div>
        <div className="location_establish">
          <div className="location">
            <span>{t("hasslefree.founded")}</span>
            <h2>{t("hasslefree.founded_year")}</h2>
          </div>
          <div className="ddd location">
            <span>{t("hasslefree.location")}</span>
            <h2>{t("hasslefree.location_name")}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
