import React, { useContext } from "react";
import SettingContext from "@/Context/SettingContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { useTranslation } from "react-i18next";
import { RiPhoneFill } from "react-icons/ri";
import { Col, Row } from "reactstrap";
import HeaderCurrency from "./HeaderCurrency";
import HeaderLanguage from "./HeaderLanguage";
import ZoneBar from "./ZoneBar";
import "../../../assets/css/style.css"; // ✅ adjust based on folder depth


const TopBar = ({ classes }) => {
  const { t } = useTranslation("common");
  const { themeOption } = useContext(ThemeOptionContext);
  const { settingData } = useContext(SettingContext);

  const announcement = themeOption?.header?.announcement || {
    status: 1,
    background_color: "#ffff00",
    text_color: "#000000",
    message: "Welcome to our store!",
  };

  return (
    <>
      {/* Announcement Bar with Scrolling */}
      {announcement?.status && (
        <div
          className="announcement-bar"
          style={{
            backgroundColor: announcement.background_color || "#ffff00",
            color: announcement.text_color || "#000000",
          }}
        >
          <div className="announcement-text">
            {announcement.message || "Welcome to our store!"}
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className={`top-header ${classes?.top_bar_class || ""}`}>
        <div className={`${classes?.container_class || "container"}`}>
          <Row>
            <Col lg={6}>
              <div className="header-contact">
                <ul>
                  <li>
                    {t("welcome_to")} {settingData?.general?.site_name}
                  </li>
                  <li>
                    <RiPhoneFill /> {t("call_us")} :{" "}
                    <a
                      className="text-white"
                      href={`tel:${themeOption?.header?.support_number}`}
                    >
                      {themeOption?.header?.support_number}
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={6} className="text-end">
              <ul className="right-nav-about">
                {settingData?.activation?.zone_enable && <ZoneBar />}
                <li className="right-nav-list">
                  <HeaderLanguage />
                </li>
                <li className="right-nav-list">
                  <HeaderCurrency />
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default TopBar;
