const PLACEHOLDER_KEYS = new Set(["", "ENTER_YOUR_SITE_KEY"]);

export const isValidRecaptchaSiteKey = (key) => Boolean(key && !PLACEHOLDER_KEYS.has(String(key).trim()));

/**
 * Resolves reCAPTCHA config. Env key takes priority over admin settings.
 * Widget shows whenever a valid site key is available.
 */
export const getRecaptchaConfig = (settingData) => {
  const recaptcha = settingData?.google_reCaptcha || {};
  const envKey = (process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || "").trim();
  const settingsKey = (recaptcha.site_key || "").trim();

  const siteKey = isValidRecaptchaSiteKey(envKey)
    ? envKey
    : isValidRecaptchaSiteKey(settingsKey)
      ? settingsKey
      : "";

  return {
    enabled: Boolean(siteKey),
    siteKey,
  };
};

export const recaptchaRequiredMessage = "Please complete the reCAPTCHA";
