import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";

const CartButtons = () => {
  const { t } = useTranslation("common");
  return (
    <Row className=" cart-buttons">
      <Col xs="6">
        <Link href="/collections" className="btn">
          {t("continue_shopping")}
        </Link>
      </Col>
      <Col xs="6">
        <Link href="/checkout" className="btn">
          {t("check_out")}
        </Link>
      </Col>
    </Row>
  );
};

export default CartButtons;
