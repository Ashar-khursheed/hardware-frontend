import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Link from "next/link";
import React, { useContext } from "react";
import { RiFacebookFill, RiInstagramFill, RiPinterestFill, RiTwitterFill } from "react-icons/ri";

const FooterSocial = () => {
  const { themeOption } = useContext(ThemeOptionContext)
  return (
    <>
      <div className="footer-social">
        <ul>
          {themeOption?.footer?.facebook && (
            <li>
              <Link href={themeOption?.footer?.facebook} target="_blank" legacyBehavior>
                <RiFacebookFill />
              </Link>
            </li>
          )}
          {themeOption?.footer?.twitter && (
            <li>
              <Link href={themeOption?.footer?.twitter} target="_blank" legacyBehavior>
                <RiTwitterFill />
              </Link>
            </li>
          )}
          {themeOption?.footer?.instagram && (
            <li>
              <Link href={themeOption?.footer?.instagram} target="_blank" legacyBehavior>
                <RiInstagramFill />
              </Link>
            </li>
          )}
          {themeOption?.footer?.pinterest && (
            <li>
              <Link href={themeOption?.footer?.pinterest} target="_blank" legacyBehavior>
                <RiPinterestFill />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default FooterSocial;
