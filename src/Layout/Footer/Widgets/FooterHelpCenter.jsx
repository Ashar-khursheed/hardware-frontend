import NoDataFound from "@/Components/Widgets/NoDataFound";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Link from "next/link";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

const FooterHelpCenter = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");

  return (
    <div className="footer-content">
      {themeOption?.footer?.help_center?.length ? (
        <ul>
          {themeOption?.footer?.help_center?.map((item, i) => (
            <li key={i}>
              <Link
                href={item?.value?.charAt(0) == "/" ? item?.value : `/${item?.value}`}
                className="text-content"
                legacyBehavior>
                 <a> {t(item?.name)} </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <NoDataFound customClass={"no-data-footer"} title={"no_link_found"} />
      )}
    </div>
  );
};

export default FooterHelpCenter;
