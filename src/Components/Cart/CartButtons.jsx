import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";

const CartButtons = () => {
  const { t } = useTranslation("common");
  return (
    <Row className=" cart-buttons">
      <Col xs="6">
        <Link href="/collections" legacyBehavior>
          <a className="btn">{t("continue_shopping")}</a>
        </Link>
      </Col>
      <Col xs="6">
        <Link href="/checkout" legacyBehavior>
          <a className="btn">{t("check_out")}</a>
        </Link>
      </Col>
    </Row>
  );
};

export default CartButtons;
