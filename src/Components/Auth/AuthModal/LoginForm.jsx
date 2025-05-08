import SettingContext from "@/Context/SettingContext";
import Btn from "@/Elements/Buttons/Btn";
import { Href } from "@/Utils/Constants";
import useHandleLogin from "@/Utils/Hooks/useLogin";
import { YupObject, emailSchema, passwordSchema, recaptchaSchema } from "@/Utils/Validation/ValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = ({ setState }) => {
  const [showBoxMessage, setShowBoxMessage] = useState();
  const { mutate, isLoading } = useHandleLogin(setShowBoxMessage);
  const { t } = useTranslation("common");
  const { settingData } = useContext(SettingContext);

  const reCaptchaRef = useRef();
  return (
    <Formik
      initialValues={{
        email: "john.customer@example.com",
        password: "123456789",
        recaptcha: "",
      }}
      validationSchema={YupObject({
        email: emailSchema,
        password: passwordSchema,
        recaptcha: settingData?.google_reCaptcha?.status ? recaptchaSchema : "",
      })}
      onSubmit={mutate}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="auth-form-box">
          {showBoxMessage && (
            <div role="alert" className="alert alert-danger login-alert ">
              <i className="ri-error-warning-line"></i> {showBoxMessage}
            </div>
          )}
          <div className="auth-box mb-3">
            <Label htmlFor="email">{t("email")}</Label>
            <Field name="email" className="form-control" id="email" placeholder={t("email")} required />
            {errors.email && touched.email && <ErrorMessage name="email" render={(msg) => <div className="invalid-feedback d-block">{errors.email}</div>} />}
          </div>
          <div className="auth-box mb-3">
            <Label htmlFor="review">{t("password")}</Label>
            <Field name="password" type="password" className="form-control" id="review" placeholder={t("enter_password")} required />
            <a href={Href} className="forgot" onClick={() => setState("forgot")}>
              {t("forgot_password")}?
            </a>
          </div>
          {settingData?.google_reCaptcha?.status && (
            <div>
              <ReCAPTCHA
                ref={reCaptchaRef}
                sitekey={settingData?.google_reCaptcha?.site_key}
                onChange={(value) => {
                  setFieldValue("recaptcha", value);
                }}
              />
              {errors.recaptcha && touched.recaptcha && <ErrorMessage name="recaptcha" render={(msg) => <div className="invalid-feedback d-block">{errors.recaptcha}</div>} />}
            </div>
          )}
          <Btn loading={isLoading} type="submit">
            {t("login")}
          </Btn>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
