import AuthModal from "@/Components/Auth/AuthModal";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import request from "@/Utils/AxiosUtils";
import { AllLanguageApi, CompareAPI } from "@/Utils/AxiosUtils/API";
import TabFocusChecker from "@/Utils/CustomFunctions/TabFocus";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useContext, useEffect, useState } from "react";
import ExitModal from "./ExitModal";
import Footers from "./Footer";
import Headers from "./Header";
import MobileMenu from "./Header/Widgets/MobileMenu";
import NewsLetterModal from "./NewsLetterModal";
import RecentPurchase from "./RecentPurchase";
import StickyCompare from "./StickyCompare";
import TapTop from "./TapTop";
import ThemeCustomizer from "./ThemeCustomizer";
import LanguageContext from "@/Context/LanguageContext";

const SubLayout = ({ children }) => {
  const isTabActive = TabFocusChecker();
  const { themeOption, setOpenAuthModal } = useContext(ThemeOptionContext);
  const [makeExitActive, setMakeExitActive] = useState(false);
  const path = useSearchParams();
  const theme = path.get("theme");
  const pathName = usePathname();
  const disableMetaTitle = ["product", "blogs", "brand"];
  const accountVerified = Cookies.get("uat_multikart");
  const authToast = Cookies.get("showAuthToast");
  const { localLanguage } = useContext(LanguageContext);

  const protectedRoutes = [`/account/dashboard`, `/account/notification`, `/account/wallet`, `/account/bank-details`, `/account/bank-details`, `/account/point`, `/account/refund`, `/account/order`, `/account/addresses`, `/wishlist`, `/compare`];

  useEffect(() => {
    if (!accountVerified && authToast && protectedRoutes.includes(pathName)) {
      ToastNotification("error", "Unauthenticated");
      setOpenAuthModal(true);
    }
    return () => Cookies.remove("showAuthToast");
  }, [pathName]);

  useEffect(() => {
    const themeColorMap = {
      fashion_one: "#ec8951", tools: "#ec8951", game: "#ec8951", left_sidebar: "#ec8951", video: "#ec8951", full_page: "#ec8951",
      bicycle: "#ff4c3b", christmas: "#ff4c3b",
      fashion_two: "#fe816d",
      fashion_three: "#96796d",
      fashion_four: "#000000",
      fashion_five: "#C0AA73",
      fashion_six: "#90453e",
      fashion_seven: "#3fd09e",
      furniture_one: "#d4b196", furniture_two: "#d4b196", furniture_dark: "#d4b196", jewellery_two: "#d4b196", jewellery_three: "#d4b196",
      electronics_one: "#1a7ef2",
      electronics_two: "#6d7e87",
      electronics_three: "#2874f0",
      marketplace_one: "#3e5067",
      marketplace_two: "#f39910", marketplace_four: "#f39910",
      marketplace_three: "#387ef0",
      vegetables_one: "#ff5141",
      vegetables_two: "#81ba00", vegetables_three: "#81ba00", nursery: "#81ba00",
      jewellery_one: "#5fcbc4",
      vegetables_four: "#206664",
      bag: "#f0b54d", beauty: "#f0b54d",
      watch: "#e4604a",
      medical: "#38c6bb",
      perfume: "#6d6659",
      yoga: "#f0583d",
      marijuana: "#5d7227",
      shoes: "#d57151",
      kids: "#fa869b", flower: "#fa869b",
      books: "#5ecee4",
      goggles: "#dc457e",
      video_slider: "#e38888",
      gym: "#01effc",
      digital_download: "#234ca1",
      pets: "#479FB3",
      parallax: "#866e6c",
      surfboard: "#2E94D2",
      single_product: "#854D9C",
      gradient: "#dd5e89"
    };

    const themeColor2Map = {
      marketplace_two: "#394868", marketplace_four: "#394868",
      vegetables_four: "#ee7a63",
      marijuana: "#203f15",
      gym: "#485ff2",
      single_product: "#d04ed6",
      gradient: "#f7bb97"
    };

    let newThemeColor = theme ? themeColorMap[theme] : themeOption?.general?.primary_color;
    let newThemeColor2 = theme ? themeColor2Map[theme] : themeOption?.general?.secondary_color;

    // Fallback to red-orange if no theme color is set
    if (!newThemeColor) newThemeColor = "#ff4e50";

    setThemeColor(newThemeColor);
    setThemeColor2(newThemeColor2 || "");
  }, [theme, pathName, themeOption]);

  //  Setting the current url in cookies for redirection of protected routes
  useEffect(() => {
    if (typeof window !== "undefined") {
      Cookies.set("currentPath", window.location.pathname + window.location.search);
    }
  }, [pathName, path]);

  const {
    data: CompareData,
    refetch,
  } = useQuery(
    [CompareAPI],
    () => {
      if (Cookies.get("uat_multikart")) {
        return request({ url: CompareAPI });
      }
      return Promise.resolve(null);
    },
    {
      enabled: !!Cookies.get("uat_multikart"),
      refetchOnWindowFocus: false,
      select: (res) => res?.data?.data,
    }
  );

  const [themeColor, setThemeColor] = useState("");
  const [themeColor2, setThemeColor2] = useState("");

  const { data } = useQuery(["newLang"], () => request({ url: AllLanguageApi }), {
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 24 * 60 * 60 * 1000,
    select: (res) => res.data.data
  });

  useEffect(() => {
    if (themeColor) {
      document.body.style.setProperty("--theme-color", themeColor);
    }
    if (themeColor2) {
      document.body.style.setProperty("--theme-color2", themeColor2);
    } else {
      document.body.style.removeProperty("--theme-color2");
    }

    const lang = data?.find(lang => lang.locale === localLanguage)?.is_rtl
    // Set Direction
    if (themeOption?.general?.language_direction === 'rtl' || lang === 1) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      document.body.classList.add('rtl');
    } else {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
      document.body.classList.remove('rtl');
    }

  }, [themeColor, themeColor2, localLanguage, data]);

  useEffect(() => {
    const message = themeOption?.general?.taglines;
    let timer;

    if (!message || message.length === 0) return;

    const updateTitle = (index) => {
      document.title = message[index];
      timer = setTimeout(() => {
        const nextIndex = (index + 1) % message.length;
        updateTitle(nextIndex);
      }, 500);
    };

    if (!disableMetaTitle.includes(pathName.split("/")[1].toLowerCase())) {
      if (!isTabActive && themeOption?.general?.exit_tagline_enable) {
        updateTitle(0);
      } else {
        let value = themeOption?.general?.site_title && themeOption?.general?.site_tagline ? `${themeOption?.general?.site_title} | ${themeOption?.general?.site_tagline}` : "Hardware Store | Premium Tools";
        document.title = value;
        clearTimeout(timer);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isTabActive, themeOption, pathName]);

  return (
    <>
      <Headers />
      {/* {pathName?.split("/")[1].toLowerCase() != "product" && <MobileMenu />} */}
      <div style={{ minHeight: "60vh" }}>
        {children}
      </div>
      <AuthModal />
      {theme != "full_page" && <Footers />}
      {themeOption?.general?.customizer_enable && <ThemeCustomizer />}
      <NextTopLoader showSpinner={false} color={themeColor || "#2874f0"} height={4} crawl={true} showAtBottom={false} />
      <RecentPurchase />
      {themeOption?.popup?.news_letter?.is_enable && <NewsLetterModal setMakeExitActive={setMakeExitActive} />}
      <div className="compare-tap-top-box">
        {CompareData?.length > 0 && <StickyCompare CompareData={CompareData} />}
        <TapTop />
      </div>
      {themeOption?.popup?.exit?.is_enable && makeExitActive && <ExitModal dataApi={themeOption?.popup?.exit} headerLogo={themeOption?.logo?.header_logo?.original_url} />}
    </>
  );
};

export default SubLayout;
