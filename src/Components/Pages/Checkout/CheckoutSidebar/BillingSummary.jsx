import NoDataFound from "@/Components/Widgets/NoDataFound";
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import Loader from "@/Layout/Loader";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ApplyCoupon from "./ApplyCoupon";
import PlaceOrder from "./PlaceOrder";
import PointWallet from "./PointWallet";
import { ImagePath } from "@/Utils/Constants";

const BillingSummary = ({ data, values, setFieldValue, isLoading, mutate, storeCoupon, setStoreCoupon, errorCoupon, appliedCoupon, setAppliedCoupon, errors }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { cartProducts } = useContext(CartContext);
  const { t } = useTranslation("common");
  const access_token = Cookies.get("uat_multikart");

  return (
    <div className="checkout-details ">
      {cartProducts?.length > 0 ? (
        <div className="order-box">
          <div className="title-box">
            <h4>{t("billing_summary")}</h4>
            {access_token && <ApplyCoupon values={values} setFieldValue={setFieldValue} data={data} storeCoupon={storeCoupon} setStoreCoupon={setStoreCoupon} errorCoupon={errorCoupon} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} mutate={mutate} isLoading={isLoading} />}
          </div>
          <div>
            <div className="custom-box-loader">
              {isLoading && (
                <div className="box-loader">
                  <Loader />
                </div>
              )}
              <ul className="sub-total">
                <li>
                  {t("subtotal")}
                  <span className="count">{data?.data?.total?.sub_total ? convertCurrency(data?.data?.total?.sub_total) : t(`not_calculated_yet`)}</span>
                </li>
                <li>
                  {t("shipping")}
                  <span className="count">{data?.data?.total?.shipping_total >= 0 ? convertCurrency(data?.data?.total?.shipping_total) : t(`not_calculated_yet`)}</span>
                </li>
                <li>
                  {t("tax")}
                  <span className="count">{data?.data?.total?.tax_total ? convertCurrency(data?.data?.total?.tax_total) : t(`not_calculated_yet`)}</span>
                </li>

                <PointWallet values={values} setFieldValue={setFieldValue} data={data} />
              </ul>
              <ul className="total">
                { appliedCoupon == "applied" && data?.data?.total?.coupon_total_discount ? (
                  <li className="list-total">
                    {t("you_save")}
                    <span className="count">{data?.data?.total?.coupon_total_discount ? convertCurrency(data?.data?.total?.coupon_total_discount - data?.data?.total?.tax_total) : ""}</span>
                  </li>
                ) : null}
                <li className="list-total">
                  {t("total")}
                  <span className="count">{data?.data?.total?.total ? convertCurrency(data?.data?.total?.total) : t(`not_calculated_yet`)}</span>
                </li>
              </ul>
              <PlaceOrder values={values} errors={errors} />
            </div>
          </div>
        </div>
      ) : (
        <NoDataFound customClass="no-data-added" height={156} width={180} imageUrl={`/assets/svg/empty-items.svg`} title="no_cart_item_desc" />
      )}
    </div>
  );
};

export default BillingSummary;
