import axios from "axios";
import getCookie from "../CustomFunctions/GetCookie";
import Cookies from "js-cookie";
import { fallbackLng } from "@/app/i18n/settings";

const client = axios.create({
  baseURL: process.env.API_PROD_URL,
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.request.use((config) => {
  const { localLanguage, formLanguage } = JSON.parse(
    window.localStorage.getItem("languageContext") || "{}"
  );

  // Determine the appropriate accept-language
  const isTranslateEndpoint = config.url?.includes(`/translation/admin`);
  const acceptLanguage =
    formLanguage && !isTranslateEndpoint
      ? formLanguage
      : localLanguage || fallbackLng;

  config.headers["accept-lang"] = acceptLanguage;

  // Set Authorization token
  const token = Cookies.get("uat_multikart");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

 
  // Append zoneId for specific APIs
  const isZoneIdRequired =
    (config.url?.includes("/product") && config.method?.toLowerCase() === "get") ||
    (config.url?.includes("/order") && config.method?.toLowerCase() === "post") ||
    (config.url?.includes("/checkout") && config.method?.toLowerCase() === "post") ||
    (config.url?.includes("/cart") && config.method?.toLowerCase() === "post");


  if (isZoneIdRequired) {
    const zoneId = localStorage.getItem("zones");
    if (zoneId) {
      try {
        // Parse zones as an array and convert to a comma-separated string
        const zoneIdsString = JSON.parse(zoneId).join(",");
        if (config.method?.toLowerCase() === "get") {
          // Add as query params for GET requests
          config.params = {
            ...(config.params || {}),
            zone_ids: zoneIdsString,
          };
        } else if (config.method?.toLowerCase() === "post") {
          // Add to the request body for POST requests
          config.data = {
            ...(config.data || {}),
            zone_ids: zoneIdsString,
          };
        }
      } catch (error) {
        console.error("Error parsing zones from localStorage:", error);
      }
    }
  }

  return config;
});

const request = async ({ ...options }, router, headerOption) => {
  // client.defaults.headers.common.Authorization = `Bearer ${getCookie("uat_multikart")}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status == 401) {
      Cookies.remove("uat_multikart");
      Cookies.remove("ue_multikart");
      Cookies.remove("account_multikart");
      localStorage.clear();
      router && router.push("/404");
    }
    return error;
  };
  try {
    if (headerOption) {
      options.headers = { ...options.headers, ...headerOption };
    }
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
