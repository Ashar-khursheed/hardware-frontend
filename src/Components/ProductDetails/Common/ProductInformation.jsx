import { ModifyString } from "@/Utils/CustomFunctions/ModifyString";
import { useTranslation } from "react-i18next";

const ProductInformation = ({ productState }) => {
  const { t } = useTranslation("common");
  return (
    <div className="bordered-box">
      <h4 className="sub-title">{t("ProductInformation")}</h4>

      <ul className="shipping-info">
        <li>
          {t("sku")} : {productState?.selectedVariation?.sku ?? productState?.product?.sku}
        </li>

        {productState?.selectedVariation?.unit ? (
          <li>
            {t("unit")} : {productState?.selectedVariation?.unit ?? productState?.product?.unit}
          </li>
        ) : null}
        {productState?.product?.weight ? (
          <li>
            {t("weight")} : {productState?.product?.weight} {ModifyString("gms")}
          </li>
        ) : null}
        <li>
          {t("stock_status")} :{productState?.selectedVariation?.stock_status ? ModifyString(productState?.selectedVariation?.stock_status, false, "_") : ModifyString(productState?.product?.stock_status, false, "_")}
        </li>
        <li>
          {t("quantity")} : {productState?.selectedVariation?.quantity ?? productState?.product?.quantity} Items Left
        </li>
        {
          productState?.product?.external_details?.length  > 0 &&
          productState?.product?.external_details?.map(detail => (
            <li>
              { detail?.key }: { detail?.value }
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ProductInformation;
