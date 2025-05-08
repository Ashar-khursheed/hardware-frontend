import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { RiMailLine, RiMapPinLine, RiPhoneLine } from "react-icons/ri";

const FooterStoreInformation = ({ icon }) => {
  const { t } = useTranslation("common");
  const { themeOption } = useContext(ThemeOptionContext);

  return (
    <ul className={icon ? "contact-list" : "contact-details"}>
      {themeOption?.footer?.about_address && (
        <li>
          {icon && <RiMapPinLine />}
          {themeOption?.footer?.about_address}
        </li>
      )}
      {themeOption?.footer?.support_number && (
        <li>
          {icon && <RiPhoneLine />}
          {t("call_us")}: {themeOption?.footer?.support_number}
        </li>
      )}
      {themeOption?.footer?.about_email && (
        <li>
          {icon && <RiMailLine />}
          {t("email_us")}: {themeOption?.footer?.about_email}
        </li>
      )}
    </ul>
  );
};

export default FooterStoreInformation;
