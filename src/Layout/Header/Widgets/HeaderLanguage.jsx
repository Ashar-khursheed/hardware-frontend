"use client";
import LanguageContext from "@/Context/LanguageContext";
import request from "@/Utils/AxiosUtils";
import { AllLanguageApi } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import i18next from "i18next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import Cookies from "js-cookie";

// const HeaderLanguage = () => {
//   const { i18n } = useTranslation("common");
//   const currentLanguage = i18n.resolvedLanguage;
//   const { setLocalLanguage } = useContext(LanguageContext);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedLang, setSelectedLang] = useState({ lang: currentLanguage });
//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   const router = useRouter();

//   const { data: languages } = useQuery(["languages"], () => request({ url: AllLanguageApi }), {enabled: true, refetchOnWindowFocus: false, refetchOnMount: false, select: (res) => res.data.data });
//   useEffect(() => {
//     const defaultLanguage = languages?.find((lang) => lang.locale === currentLanguage);
//     if (defaultLanguage) {
//       setSelectedLang(defaultLanguage);
//     }
//   }, [languages, currentLanguage]);

//   // To change Language
//   const handleChangeLang = (lang) => {
//     setSelectedLang(lang);
//     setLocalLanguage(lang.locale);
//     i18n.changeLanguage(lang.locale);
//     Cookies.set('i18next', lang.locale);
//     router.refresh();
//   };
 
//   return (
//     <Dropdown className="theme-form-select" isOpen={dropdownOpen} toggle={toggle}>
//       <DropdownToggle caret color="transparent" className="select-dropdown" type="button" id="select-language">
//         {selectedLang?.image && <div  className={`iti-flag ${selectedLang.image}`}  />}
//         <span>{selectedLang?.name}</span>
//       </DropdownToggle>
//       <DropdownMenu className="dropdown-menu-end">
//       {languages?.map((elem, i) => {
//           if (elem.locale === currentLanguage) {
//             return null;
//           }
//           return (
//             <a onClick={() => handleChangeLang(elem)} key={i} className={elem.locale === currentLanguage ? "active" : "" }>
//               <DropdownItem id={elem.title}>
//                 <span>{elem.name}</span>
//               </DropdownItem>
//             </a>
//           );
//         })}
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// export default HeaderLanguage;

const HeaderLanguage = () => {
  const { i18n } = useTranslation("common");
  const currentLanguage = i18n.resolvedLanguage;
  const { setLocalLanguage } = useContext(LanguageContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ lang: currentLanguage });
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const router = useRouter();

  const { data: languages } = useQuery(
    ["languages"],
    () => request({ url: AllLanguageApi }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      select: (res) => res.data.data,
    }
  );

  useEffect(() => {
    const defaultLanguage = languages?.find((lang) => lang.locale === currentLanguage);
    if (defaultLanguage) {
      setSelectedLang(defaultLanguage);
    }
  }, [languages, currentLanguage]);

  // To change Language
  const handleChangeLang = (lang) => {
    setSelectedLang(lang);
    setLocalLanguage(lang.locale);
    i18n.changeLanguage(lang.locale);
    Cookies.set("i18next", lang.locale);
    router.refresh();
  };

  const languageItems =
    languages?.map((elem, i) => {
      if (elem.locale === currentLanguage) {
        return null;
      }
      return (
        <a
          onClick={() => handleChangeLang(elem)}
          key={i}
          className={elem.locale === currentLanguage ? "active" : ""}
        >
          <DropdownItem id={elem.title}>
            <span>{elem.name}</span>
          </DropdownItem>
        </a>
      );
    }) || [];

  return (
    <Dropdown
      className="theme-form-select"
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle
        caret
        color="transparent"
        className="select-dropdown"
        type="button"
        id="select-language"
      >
        {selectedLang?.image && (
          <div className={`iti-flag ${selectedLang.image}`} />
        )}
        <span>{selectedLang?.name}</span>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        {languageItems.length > 0 ? (
          languageItems
        ) : (
          <DropdownItem disabled>No other languages available</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default HeaderLanguage;
