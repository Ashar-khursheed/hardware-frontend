import NoDataFound from "@/Components/Widgets/NoDataFound";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Link from "next/link";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

const FooterUsefulLinks = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");

  return (
    <div className="footer-content">
      {themeOption?.footer?.useful_link?.length ? (
        <ul>
          {themeOption?.footer?.useful_link?.map((item, i) => (
            <li key={i}>
              <Link href={`/${item?.value}`} legacyBehavior>
                <a>{item?.label || item?.value}</a>
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

export default FooterUsefulLinks;
