import CompareContext from "@/Context/CompareContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Btn from "@/Elements/Buttons/Btn";
import { CompareAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { RiRefreshLine } from "react-icons/ri";

const CompareButton = ({ productstate, customClass, hideAction, text }) => {
  const [category, brand, attribute, price, rating, sortBy, field, layout, theme] = useCustomSearchParams(["category", "brand", "attribute", "price", "rating", "sortBy", "field", "layout", "theme"]);
  const { compareState, setCompareState, setOpenCompareSidebar, refetch } = useContext(CompareContext);
  const cookieUAT = Cookies.get("uat_multikart");
  const router = useRouter();
  const pathname = usePathname();
  const { data, mutate, isLoading } = useCreate(CompareAPI, false, false, "Added to Compare List", false, false, false, refetch);
  const { setOpenAuthModal } = useContext(ThemeOptionContext);

  const addToCompare = (productstate) => {
    if (!cookieUAT) {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...category, ...theme }).toString();
      const sendPath = `${pathname}?${queryParams}`;
      Cookies.set("CallBackUrl", sendPath);
      Cookies.set("compareId", productstate?.id);
      setOpenAuthModal(true);
    } else {
      mutate({ product_id: productstate?.id });
    }
  };
  useEffect(() => {
    if (data?.status == 200 || data?.status == 201) {
      setCompareState([...compareState, productstate]);
    }
  }, [isLoading]);
  return (
    <>
      {customClass ? (
        <Btn className={customClass ?? ""} onClick={() => addToCompare(productstate)}>
          <RiRefreshLine />
        </Btn>
      ) : (
        !hideAction?.includes("compare") && (
          <li title="Compare" onClick={() => addToCompare(productstate)}>
            <a>
              <RiRefreshLine /> {text ? text : ""}
            </a>
          </li>
        )
      )}
    </>
  );
};

export default CompareButton;
