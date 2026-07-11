import SettingContext from "@/Context/SettingContext";
import Btn from "@/Elements/Buttons/Btn";
import RecaptchaField from "@/Components/Widgets/RecaptchaField";
import { Href } from "@/Utils/Constants";
import { getRecaptchaConfig } from "@/Utils/CustomFunctions/RecaptchaUtils";
import useHandleLogin from "@/Utils/Hooks/useLogin";
import { YupObject, emailSchema, passwordSchema, recaptchaSchema } from "@/Utils/Validation/ValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "reactstrap";

const LoginForm = ({ setState }) => {
  const [showBoxMessage, setShowBoxMessage] = useState();
  const { mutate, isLoading } = useHandleLogin(setShowBoxMessage);
  const { t } = useTranslation("common");
  const { settingData } = useContext(SettingContext);
  const { enabled: recaptchaEnabled } = getRecaptchaConfig(settingData);

  const reCaptchaRef = useRef();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: "",
        password: "",
        recaptcha: "",
      }}
      validationSchema={YupObject({
        email: emailSchema,
        password: passwordSchema,
        recaptcha: recaptchaEnabled ? recaptchaSchema : "",
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
            <a href={Href} className="forgot" onClick={(e) => { e.preventDefault(); setState("forgot"); }}>
              {t("forgot_password")}?
            </a>
          </div>
          {recaptchaEnabled && (
            <div className="mb-3">
              <RecaptchaField
                ref={reCaptchaRef}
                error={errors.recaptcha && touched.recaptcha ? errors.recaptcha : ""}
                onChange={(value) => setFieldValue("recaptcha", value)}
              />
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
