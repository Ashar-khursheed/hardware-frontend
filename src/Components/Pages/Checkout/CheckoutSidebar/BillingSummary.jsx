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

const BillingSummary = ({ data, values, setFieldValue, isLoading, mutate, storeCoupon, setStoreCoupon, errorCoupon, appliedCoupon, setAppliedCoupon, errors, cartTotal }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { cartProducts } = useContext(CartContext);
  const { t } = useTranslation("common");
  const access_token = Cookies.get("uat_multikart");

  // Subtotal calculation
  const hasApiData = data?.data?.total?.sub_total !== undefined;
  const displaySubTotal = hasApiData ? Number(data?.data?.total?.sub_total) : Number(cartTotal || 0);

  // ShipStation shipping cost calculation
  const shipStationCost = values?.shipping_cost !== undefined && values?.shipping_cost !== null 
    ? Number(values.shipping_cost)
    : null;

  const displayShipping = shipStationCost !== null 
    ? shipStationCost 
    : (hasApiData && data?.data?.total?.shipping_total !== undefined ? Number(data?.data?.total?.shipping_total) : 0);

  const displayTax = hasApiData && data?.data?.total?.tax_total !== undefined ? Number(data?.data?.total?.tax_total) : 0;
  
  const couponDiscount = (appliedCoupon === "applied" && data?.data?.total?.coupon_total_discount) 
    ? Number(data?.data?.total?.coupon_total_discount) 
    : 0;

  // Grand total calculation
  const displayTotal = displaySubTotal + displayShipping + displayTax - couponDiscount;

  return (
    <div className="checkout-details ">
      {cartProducts?.length > 0 ? (
        <div className="order-box">

          <div className="checkout-section">
            <div className="checkout-section-header">
              <span className="step-number">4</span>
              <h4>{t("billing_summary")}</h4>
            </div>

            {access_token && <ApplyCoupon values={values} setFieldValue={setFieldValue} data={data} storeCoupon={storeCoupon} setStoreCoupon={setStoreCoupon} errorCoupon={errorCoupon} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} mutate={mutate} isLoading={isLoading} />}
          </div>
          <div>
            <div className={`custom-box-loader ${isLoading ? 'opacity-75' : ''}`}>
              <ul className="sub-total">
                <li>
                  {t("subtotal")}
                  <span className="count">{convertCurrency(displaySubTotal?.toFixed(2))}</span>
                </li>
                <li>
                  {t("shipping")}
                  <span className="count font-weight-bold text-primary">
                    {displayShipping === 0 ? 'FREE' : convertCurrency(displayShipping?.toFixed(2))}
                  </span>
                </li>
                {values?.delivery_description && (
                  <li className="text-muted small py-1" style={{ fontSize: '12px' }}>
                    <i className="ri-truck-line me-1"></i> {values.delivery_description}
                  </li>
                )}
                <li>
                  {t("tax")}
                  <span className="count">
                    {displayTax !== null && displayTax >= 0
                      ? convertCurrency(displayTax?.toFixed(2))
                      : t("-")}
                  </span>
                </li>

                <PointWallet values={values} setFieldValue={setFieldValue} data={data} />
              </ul>
              <ul className="total">
                {appliedCoupon == "applied" && data?.data?.total?.coupon_total_discount ? (
                  <li className="list-total">
                    {t("you_save")}
                    <span className="count">{convertCurrency((data?.data?.total?.coupon_total_discount - data?.data?.total?.tax_total)?.toFixed(2))}</span>
                  </li>
                ) : null}
                <li className="list-total">
                  {t("total")}
                  <span className="count">
                    {isLoading && <small className="text-muted fw-normal me-2" style={{ fontSize: '11px' }}>Calculating...</small>}
                    {convertCurrency(Math.max(0, displayTotal)?.toFixed(2))}
                  </span>
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