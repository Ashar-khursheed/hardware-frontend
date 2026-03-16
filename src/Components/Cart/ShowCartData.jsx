import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Table } from "reactstrap";
import emptyCartImage from "../../../public/assets/images/svg/empty-items.svg";
import NoDataFound from "../Widgets/NoDataFound";
import CartData from "./CartData";
import { ImagePath } from "@/Utils/Constants";

const ShowCartData = () => {
  const { getTotal, cartProducts } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const { t } = useTranslation("common");
  return (
    <Row>
      {cartProducts?.length > 0 ? (
        <Col xs={12}>
          {/* Desktop Table - Hidden on Mobile */}
          <div className="table-responsive hbx-cart-container d-none d-md-block">
            <Table className="cart-table table-borderless hbx-cart-table">
              <thead>
                <tr className="table-head">
                  <th scope="col">{t("image")}</th>
                  <th scope="col">{t("product_name")}</th>
                  <th scope="col">{t("price")}</th>
                  <th scope="col">{t("quantity")}</th>
                  <th scope="col">{t("total")}</th>
                  <th scope="col">{t("action")}</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((elem, i) => (
                  <CartData elem={elem} key={i} />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-end fw-bold">{t("total_price")} :</td>
                  <td>
                    <h2 className="fw-bold">{convertCurrency(getTotal(cartProducts)?.toFixed(2))}</h2>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </Table>
          </div>

          {/* Mobile Cart View - Shown only on Mobile */}
          <div className="mobile-cart-view d-md-none">
            {cartProducts.map((elem, i) => (
              <div key={i} className="mobile-cart-card hbx-animate-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <CartData elem={elem} mobileView={true} />
              </div>
            ))}
            <div className="mobile-cart-footer">
              <div className="total-box">
                <span>{t("total_price")}</span>
                <h3>{convertCurrency(getTotal(cartProducts)?.toFixed(2))}</h3>
              </div>
            </div>
          </div>
        </Col>
      ) : (
        <NoDataFound customClass="no-data-added" imageUrl={`/assets/svg/empty-items.svg`} title="no_item" description="no_cart_item_desc" height={230} width={270} />
      )}
    </Row>
  );
};

export default ShowCartData;
