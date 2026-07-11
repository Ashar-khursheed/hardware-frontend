import React from "react";
import { useTranslation } from "react-i18next";
import { RiFacebookFill, RiInstagramFill, RiPinterestFill, RiTwitterFill } from "react-icons/ri";

const ContactDetails = () => {
  const { t } = useTranslation("common");
  return (
    <div className="premium-contact-title">
      <h2>{t("get_in_touch")}</h2>
      <p>Contact Us Description</p>
      <div className="premium-footer-social">
        <ul className="premium-social-list">
          <li>
            <a target="_blank" href="https://www.facebook.com/people/Thehardwarebox/61589035546495/?locale=en_GB" rel="noreferrer">
              <RiFacebookFill />
            </a>
          </li>
          {/* <li>
            <a target="_blank" href="https://twitter.com/" rel="noreferrer">
              <RiTwitterFill />
            </a>
          </li> */}
          <li>
            <a target="_blank" href="https://www.instagram.com/thehardwarebox" rel="noreferrer">
              <RiInstagramFill />
            </a>
          </li>
          {/* <li>
            <a target="_blank" href="https://pinterest.com/" rel="noreferrer">
              <RiPinterestFill />
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default ContactDetails;
