import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";

const CartButtons = () => {
  const { t } = useTranslation("common");
  return (
    <Row className="cart-buttons g-4">
      <Col xs="6">
        <Link href="/category/storage-devices" legacyBehavior>
          <a className="btn btn-outline-primary w-100 rounded-pill">{t("continue_shopping")}</a>
        </Link>
      </Col>
      <Col xs="6">
        <Link href="/checkout" legacyBehavior>
          <a className="btn btn-primary w-100 rounded-pill text-white">{t("check_out")}</a>
        </Link>
      </Col>
    </Row>
  );
};

export default CartButtons;
