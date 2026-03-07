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
          <div className="table-responsive">
            <Table className="cart-table table-borderless">
              <thead className="d-none d-md-table-header-group">
                <tr className="table-head">
                  <th scope="col">{t("image")}</th>
                  <th scope="col">{t("product_name")}</th>
                  <th className="d-none d-md-table-cell" scope="col">{t("price")}</th>
                  <th scope="col">{t("quantity")}</th>
                  <th className="d-none d-md-table-cell" scope="col">{t("total")}</th>
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
                  <td colSpan="4" className="d-md-table-cell d-none text-end fw-bold">{t("total_price")} :</td>
                  <td className="d-md-none fw-bold">{t("total_price")} :</td>
                  <td>
                    <h2 className="fw-bold">{convertCurrency(getTotal(cartProducts)?.toFixed(2))}</h2>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </Table>
          </div>
        </Col>
      ) : (
        <NoDataFound customClass="no-data-added" imageUrl={`/assets/svg/empty-items.svg`} title="no_item" description="no_cart_item_desc" height={230} width={270} />
      )}
    </Row>
  );
};

export default ShowCartData;
