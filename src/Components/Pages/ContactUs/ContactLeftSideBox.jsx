import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { RiCellphoneFill, RiMailFill, RiMapPinFill, RiPhoneFill } from "react-icons/ri";
import { Media } from "reactstrap";

const ContactLeftSideBox = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");

  return (
    <div className="premium-contact-right mt-4 pt-2 border-top">
      <ul className="premium-info-list">
        <li className="premium-info-item">
          <div className="premium-contact-icon">
            <RiPhoneFill />
          </div>
          <Media body>
            <h6>{themeOption?.contact_us?.detail_1?.label}</h6>
            <p>{themeOption?.contact_us?.detail_1?.text}</p>
          </Media>
        </li>
        <li className="premium-info-item">
          <div className="premium-contact-icon">
            <RiMapPinFill />
          </div>
          <Media body>
            <h6>{themeOption?.contact_us?.detail_2?.label}</h6>
            <p>{themeOption?.contact_us?.detail_2?.text}</p>
          </Media>
        </li>
        <li className="premium-info-item">
          <div className="premium-contact-icon">
            <RiMailFill />
          </div>
          <Media body>
            <h6>{themeOption?.contact_us?.detail_3?.label}</h6>
            <p>{themeOption?.contact_us?.detail_3?.text}</p>
          </Media>
        </li>
        {/* <li className="premium-info-item">
          <div className="premium-contact-icon">
            <RiCellphoneFill />
          </div>
          <Media body>
            <h6>{themeOption?.contact_us?.detail_4?.label}</h6>
            <p>{themeOption?.contact_us?.detail_4?.text}</p>
          </Media>
        </li> */}
      </ul>
    </div>
  );
};

export default ContactLeftSideBox;
