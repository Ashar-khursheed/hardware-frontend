"use client";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import React, { useEffect, useMemo } from "react";
import { I18nextProvider as Provider, initReactI18next } from "react-i18next";

import { getOptions } from "./settings";
import request from "@/Utils/AxiosUtils";

const loadResources = async (language, namespace) => {

  try {
    const response = await request({url:`${process.env.API_PROD_URL}/translation/front`}, false);
    return response.data;
  } catch (error) {
    console.error("Error loading translations:", error);
    return null;
  }
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  // .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .use(resourcesToBackend((language, namespace) => loadResources(language, namespace)))
  .init({
    ...getOptions(),
    detection: {
      caches: ["cookie"],
    },
  });

export function I18nProvider({ children, language }) {
  // useMemo(() => {
  //   i18next.changeLanguage(language);
  // }, []);
  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);
  return <Provider i18n={i18next}>{children}</Provider>;
}
