import SimpleInputField from "@/Components/Widgets/InputFields/SimpleInputField";
import Btn from "@/Elements/Buttons/Btn";
import { ContactUsAPI } from "@/Utils/AxiosUtils/API";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import useCreate from "@/Utils/Hooks/useCreate";
import { YupObject, emailSchema, nameSchema, phoneSchema } from "@/Utils/Validation/ValidationSchema";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import { RiSendPlaneFill } from "react-icons/ri";

const ContactUsForm = () => {
  const { t } = useTranslation("common");
  const { mutate, isLoading } = useCreate(ContactUsAPI, false, false, "No", (resDta) => ToastNotification("success", resDta?.data?.message));
  return (
    <Formik
      initialValues={{ name: "", email: "", phone: "", subject: "", message: "" }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        subject: nameSchema,
        message: nameSchema,
      })}
      onSubmit={(values, { resetForm }) => {
        mutate(values, {
          onSuccess: () => {
            resetForm();
          },
        });
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
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
