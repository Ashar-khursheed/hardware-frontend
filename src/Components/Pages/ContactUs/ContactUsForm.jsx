import SimpleInputField from "@/Components/Widgets/InputFields/SimpleInputField";
import RecaptchaField from "@/Components/Widgets/RecaptchaField";
import SettingContext from "@/Context/SettingContext";
import { ContactUsAPI } from "@/Utils/AxiosUtils/API";
import { getRecaptchaConfig } from "@/Utils/CustomFunctions/RecaptchaUtils";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import useCreate from "@/Utils/Hooks/useCreate";
import { YupObject, emailSchema, nameSchema, phoneSchema, recaptchaSchema } from "@/Utils/Validation/ValidationSchema";
import { Form, Formik } from "formik";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import { RiSendPlaneFill } from "react-icons/ri";

const ContactUsForm = () => {
  const { t } = useTranslation("common");
  const { settingData } = useContext(SettingContext);
  const { enabled: recaptchaEnabled } = getRecaptchaConfig(settingData);
  const reCaptchaRef = useRef();
  const { mutate, isLoading } = useCreate(ContactUsAPI, false, false, "No", (resDta) => ToastNotification("success", resDta?.data?.message));
  return (
    <Formik
      enableReinitialize
      initialValues={{ name: "", email: "", phone: "", subject: "", message: "", recaptcha: "" }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        subject: nameSchema,
        message: nameSchema,
        recaptcha: recaptchaEnabled ? recaptchaSchema : "",
      })}
      onSubmit={(values, { resetForm }) => {
        mutate(values, {
          onSuccess: () => {
            resetForm();
            reCaptchaRef.current?.reset();
          },
        });
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="theme-form contact-form">
          <Row className="g-3">
            <SimpleInputField
              nameList={[
                { name: "name", placeholder: t("Enter Full Name"), toplabel: "Full Name", colprops: { xs: 12 } },
                { name: "email", placeholder: t("enter_email_address"), toplabel: "Email Address", colprops: { md: 6 } },
                { name: "phone", placeholder: t("enter_phone"), toplabel: "Phone Number", type: "number", colprops: { md: 6 } },
                { name: "subject", placeholder: t("Enter Subject"), toplabel: "Subject", colprops: { xs: 12 } },
                { name: "message", placeholder: t("write_message"), toplabel: "Message", colprops: { xs: 12 }, type: "textarea", rows: 5 },
              ]}
            />
            {recaptchaEnabled && (
              <Col xs="12">
                <RecaptchaField
                  ref={reCaptchaRef}
                  error={errors.recaptcha && touched.recaptcha ? errors.recaptcha : ""}
                  onChange={(value) => setFieldValue("recaptcha", value)}
                />
              </Col>
            )}
            <Col xs="12">
              <button className="btn-premium-submit" type="submit" disabled={isLoading}>
                {t("send_message")}
                <RiSendPlaneFill className="ms-2" />
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUsForm;
