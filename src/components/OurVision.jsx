import React from "react";
import userSatisfaction from "../Assets/user-satisfaction.svg";
import innovation from "../Assets/innovation.svg";
import simplicity from "../Assets/simplicity.svg";
import { useNavigate } from "react-router-dom";
import "./ourVision.css";
import { useTranslation } from "react-i18next";

const OurVision = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mx-auto bg-[#121212] w-full ">
      <div className="container_our_vision mx-auto w-[90vw] max-w-[1500px]">
        <div className="first_container_vision">
          <h2>{t("vision.title")}</h2>
          <div>
            <div className="card_our_vision">
              <div className="first_card">
                <img src={userSatisfaction} alt="Thumbs Up Icon" />
                <div className="first_card_text">
                  <span>{t("vision.vision1Title")}</span>
                  <span>{t("vision.vision1Desc")}</span>
                </div>
              </div>
              <div className="first_card diff_class">
                <img src={innovation} alt="" />
                <div className="first_card_text">
                  <span>{t("vision.vision2Title")}</span>
                  <span>{t("vision.vision2Desc")}</span>
                </div>
              </div>
              <div className="first_card">
                <img src={simplicity} alt="" />
                <div className="first_card_text">
                  <span>{t("vision.vision3Title")}</span>
                  <span>{t("vision.vision3Desc")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="second_container_vision">
          <h2>{t("vision.main")}</h2>
          <span>{t("vision.description")}</span>
          <button
            onClick={() => navigate("/quote")}
            className="get_started_btn"
          >
            {t("features.getStartedBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
