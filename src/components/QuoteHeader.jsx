import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useTranslation } from "react-i18next";

const QuoteHeader = () => {
  const { t } = useTranslation();
  return (
    <header className="h-[80px] border-b-[1px] border-[#d1d1d1] w-full z-30 bg-white fixed top-0 left-0 right-0  mx-auto max-w-[1500px] flex justify-center items-center">
      <nav className="flex w-[90vw] relative items-center justify-between">
        <Link to="/" className="">
          <Logo />
        </Link>

        <Link to={"/faq"} className="flex items-center cursor-pointer ">
          <div className="flex justify-center border-[1px] border-black items-center w-[24px] h-[24px] rounded-full mr-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="12"
              viewBox="0 0 4 12"
              fill="none"
            >
              <path
                d="M3.70645 4.07477L0.684674 4.45348L0.576471 4.95491L1.17027 5.06444C1.55822 5.15681 1.63475 5.29668 1.5503 5.68331L0.576471 10.2595C0.320478 11.4431 0.715024 12 1.64267 12C2.36182 12 3.1971 11.6675 3.57581 11.2109L3.69193 10.662C3.42802 10.8942 3.04271 10.9866 2.78672 10.9866C2.42384 10.9866 2.29189 10.7319 2.38558 10.2833L3.70645 4.07477ZM3.79881 1.31955C3.79881 1.66952 3.65979 2.00515 3.41233 2.25261C3.16486 2.50008 2.82923 2.6391 2.47926 2.6391C2.1293 2.6391 1.79366 2.50008 1.5462 2.25261C1.29874 2.00515 1.15971 1.66952 1.15971 1.31955C1.15971 0.969584 1.29874 0.633951 1.5462 0.386488C1.79366 0.139024 2.1293 0 2.47926 0C2.82923 0 3.16486 0.139024 3.41233 0.386488C3.65979 0.633951 3.79881 0.969584 3.79881 1.31955Z"
                fill="black"
              />
            </svg>
          </div>
          <p className="font-sans needMoreAssitance text-[14px] leading-[19.6px] text-[#9e9e9e] ">
            {t("navigation.assistance")} ?
          </p>
        </Link>
      </nav>
    </header>
  );
};

export default QuoteHeader;
