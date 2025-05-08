import AccountContext from "@/Context/AccountContext";
import Btn from "@/Elements/Buttons/Btn";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const ResponsiveMenuOpen = () => {
  const { mobileSideBar, setMobileSideBar } = useContext(AccountContext);

  const { t } = useTranslation("common");
  return (
    <Btn className="show-btn" onClick={() => setMobileSideBar(!mobileSideBar)}>
      {t("show_menu")}
    </Btn>
  );
};

export default ResponsiveMenuOpen;
