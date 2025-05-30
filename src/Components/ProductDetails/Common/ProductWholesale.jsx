import SettingContext from "@/Context/SettingContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const ProductWholesale = ({ productState }) => {
  const { t } = useTranslation("common");
  const { convertCurrency } = useContext(SettingContext);
  return (
    <>
      <table className="table mt-2 mb-4 modal-table">
        <thead>
          <tr>
            <th className="border-top-0">{t("min_qty")}</th>
            <th className="border-top-0">{t("max_qty")}</th>
            <th className="border-top-0">{productState.product?.wholesale_price_type == "fixed" ? t("unit_price") : t("percentage")}</th>
          </tr>
        </thead>
        <tbody>
          {productState?.product?.wholesales?.map((wholesale, i) => (
            <tr key={i}>
              <td>{wholesale.min_qty}</td>
              <td>{wholesale.max_qty}</td>
              <td>{productState.product?.wholesale_price_type == "fixed" ? convertCurrency(wholesale.value) : wholesale.value + "% Off"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductWholesale;
