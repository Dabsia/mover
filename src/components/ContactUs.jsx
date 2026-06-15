import React from "react";
import "./contactUs.css";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-[100vw]">
      <div className="contact_us_container mx-auto w-[90vw] max-w-[1500px]">
        <div className="contact_us_header">{t("contact.title")}</div>
        <div className="contact_us_text">{t("contact.description")}</div>
        <div className="contact_us_partners">{t("contact.enquiry")}</div>
      </div>
    </div>
  );
};

export default ContactUs;
