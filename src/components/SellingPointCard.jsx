import React from "react";
import RightIcon from "../Assets/SVG/RightIcon";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SellingPointCard = ({ card }) => {
  const { t } = useTranslation();
  return (
    <div className="h-fit border-2 border-[#BCDFF6] sellingpointCard rounded-[18px] p-4 w-full ">
      <img
        src={card?.img}
        alt="more"
        className="w-full object-cover h-[160px] sellingpointCardImage rounded-[18px] "
      />
      <p className="font-unbounded text-[#121212] sellingCardText font-bold my-2 text-[20px]">
        {card?.text}
      </p>
      <Link to="/quote">
        <div className="flex my-2 items-center">
          <p className="font-sans font-bold text-[#3C82F6] mr-2 ">
            {t("features.getStartedBtn")}
          </p>
          <RightIcon color="#3C82F6" />
        </div>
      </Link>
    </div>
  );
};

export default SellingPointCard;
