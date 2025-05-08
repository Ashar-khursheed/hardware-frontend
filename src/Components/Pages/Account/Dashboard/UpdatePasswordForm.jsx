import SimpleInputField from "@/Components/Widgets/InputFields/SimpleInputField";
import Btn from "@/Elements/Buttons/Btn";
import React from "react";
import { useTranslation } from "react-i18next";
import { Col, ModalFooter, Row } from "reactstrap";

const UpdatePasswordForm = ({ isLoading, setModal }) => {
  const { t } = useTranslation("common");
  return (
    <Row className="g-4">
      <SimpleInputField
        nameList={[
          { name: "current_password", placeholder: t("enter_current_password"), toplabel: "Current Password", colprops: { xs: 12 }, require: "true", type: "password" },
          { name: "password", placeholder: t("enter_new_password"), toplabel: "New Password", colprops: { xs: 12 }, require: "true", type: "password" },
          { name: "password_confirmation", placeholder: t("enter_confirm_password"), toplabel: "Confirm Password", colprops: { xs: 12 }, require: "true", type: "password" },
        ]}
      />
      <Col xs={12}>
        <ModalFooter className="ms-auto justify-content-end save-back-button pt-0">
          <Btn size='md' color="transparent" className="btn-outline fw-bold" onClick={() => setModal(false)}>
            {t("cancel")}
          </Btn>
          <Btn color="transparent" className="btn-solid" type="submit" loading={Number(isLoading)}>
            {t("submit")}
          </Btn>
        </ModalFooter>
      </Col>
    </Row>
  );
};

export default UpdatePasswordForm;
