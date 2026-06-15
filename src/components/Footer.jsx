import React, { useState } from "react";
import logo from "../Assets/domain.com.png";
import { SiGmail } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReportIssue from "../modal/ReportIssue";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const { t } = useTranslation();

  const openModal = () => setIsReportModalOpen(true);
  const closeModal = () => setIsReportModalOpen(false);

  return (
    <div className="bg-[#E5E5E5] w-full h-fit ">
      <div className="w-[90vw] py-10  max-w-[1500px] mx-auto">
        <div className="flex footerContainer justify-between">
          <div>
            <img src={logo} alt="logo" className="" />
            <div className="flex mt-5">
              <a
                href="mailto:support@zinter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGmail size={20} className="mr-2 cursor-pointer" />
              </a>

              <a
                href="https://www.linkedin.com/company/zinter-bv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={20} className="mr-2 cursor-pointer" />
              </a>

              <a
                href="https://x.com/MoveWithZinter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitterX size={20} className="mr-2 cursor-pointer" />
              </a>

              <a
                href="https://facebook.com/MoveWithZinter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={20} className="cursor-pointer" />
              </a>
            </div>
          </div>
          <div className="flex footerSubContainer">
            <div className="mr-8">
              <p className="font-sans text-[24px] footerMainText text-[#136AB5] text-right font-bold ">
                {t("footer.quicklinks")}
              </p>
              <div className="flex flex-col">
                <Link
                  to="/about-us"
                  className="font-sora text-right font-regular footerDesc"
                >
                  {" "}
                  {t("footer.aboutUs")}
                </Link>
                <span
                  onClick={openModal}
                  className="font-sora cursor-pointer font-regular text-[#136AB5] text-[15px] text-right footerDesc mt-2"
                >
                  {" "}
                  {t("footer.reportIssue")}
                </span>
                {/* <Link
                  to="/faq"
                  className="font-sora text-right font-regular footerDesc mt-2"
                >
                  {" "}
                  Frequently Asked Questions
                </Link> */}
                <Link
                  to="/privacy-policy"
                  className="font-sora text-right font-regular footerDesc mt-2"
                >
                  {" "}
                  {t("footer.privacyPolicy")}
                </Link>
                <Link
                  to="/terms"
                  className="font-sora text-right font-regular footerDesc mt-2"
                >
                  {" "}
                  {t("footer.termsConditions")}
                </Link>
              </div>
            </div>
            <div className="footerSubBox">
              <p className="font-sans text-[24px] footerMainText text-[#136AB5] text-right font-bold ">
                {t("footer.contact")}
              </p>
              <div className="flex flex-col">
                <a
                  href="mailto:support@zinter.nl"
                  className="font-sora mb-2 text-right font-regular"
                >
                  {" "}
                  support@zinter.nl
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 w-full py-4 footerEndContainer flex justify-between border-black mt-6 ">
          <p className="font-sans text-[18px] text-[#121212] font-normal ">
            {t("footer.copyright")}
          </p>
          <p className="font-sans text-[18px] text-[#121212] font-normal ">
            Zinter.nl
          </p>
        </div>
      </div>
      {isReportModalOpen && <ReportIssue closeModal={closeModal} />}
    </div>
  );
};

export default Footer;
