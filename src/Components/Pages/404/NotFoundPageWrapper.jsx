"use client";
import NotFoundPage from "@/Components/Pages/404";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import { useContext } from "react";

const NotFoundPageWrapper = () => {
  const { isLoading, themeOption } = useContext(ThemeOptionContext);
  if (isLoading && !themeOption?.general) return <Loader />;
  return <NotFoundPage />;
};

export default NotFoundPageWrapper;
