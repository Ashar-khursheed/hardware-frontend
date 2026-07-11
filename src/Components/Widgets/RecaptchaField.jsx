"use client";

import SettingContext from "@/Context/SettingContext";
import { getRecaptchaConfig } from "@/Utils/CustomFunctions/RecaptchaUtils";
import dynamic from "next/dynamic";
import { forwardRef, useContext } from "react";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

const RecaptchaField = forwardRef(({ onChange, error, className = "" }, ref) => {
  const { settingData } = useContext(SettingContext);
  const { enabled, siteKey } = getRecaptchaConfig(settingData);

  if (!enabled || !siteKey) return null;

  return (
    <div className={`recaptcha-field ${className}`.trim()}>
      <ReCAPTCHA
        ref={ref}
        sitekey={siteKey}
        onChange={(token) => onChange?.(token || "")}
        onExpired={() => onChange?.("")}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
});

RecaptchaField.displayName = "RecaptchaField";

export default RecaptchaField;
