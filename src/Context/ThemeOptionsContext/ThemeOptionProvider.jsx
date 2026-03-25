// "use client";
// import request from "@/Utils/AxiosUtils";
// import { ThemeOptionsAPI } from "@/Utils/AxiosUtils/API";
// import { useQuery } from "@tanstack/react-query";
// import React, { useEffect, useState } from "react";
// import ThemeOptionContext from ".";

// const ThemeOptionProvider = (props) => {
//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [openOffCanvas, setOpenOffCanvas] = useState(false);
//   const [paginationDetails, setPaginationDetails] = useState({});
//   const [cartCanvas, setCartCanvas] = useState(false);
//   const [mobileSideBar, setMobileSideBar] = useState(false);
//   const [collectionMobile, setCollectionMobile] = useState(false);
//   const [themeOption, setThemeOption] = useState({});
//   const [variant, setVariant] = useState("");

//   const { data, isLoading } = useQuery([ThemeOptionsAPI], () => request({ url: ThemeOptionsAPI }), {
//     enabled: true,
//     refetchOnWindowFocus: false,
//     staleTime: 60 * 60 * 1000,
//     select: (res) => res?.data,
//   });

//   useEffect(() => {
//     if (data) {
//       setThemeOption(data?.options);
//     }
//   }, [data]);

//   return (
//     <>
//       <ThemeOptionContext.Provider value={{ ...props, setVariant, variant, isLoading, openAuthModal, setOpenAuthModal, themeOption, openOffCanvas, paginationDetails, setPaginationDetails, setOpenOffCanvas, cartCanvas, setCartCanvas, mobileSideBar, setMobileSideBar, collectionMobile, setCollectionMobile }}>{props.children}</ThemeOptionContext.Provider>
//     </>
//   );
// };

// export default ThemeOptionProvider;
"use client";
import request from "@/Utils/AxiosUtils";
import { ThemeOptionsAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ThemeOptionContext from ".";

const ThemeOptionProvider = (props) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openOffCanvas, setOpenOffCanvas] = useState(false);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [cartCanvas, setCartCanvas] = useState(false);
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [collectionMobile, setCollectionMobile] = useState(false);
  const [themeOption, setThemeOption] = useState({});
  const [variant, setVariant] = useState("");

  const { data, isLoading } = useQuery([ThemeOptionsAPI], () => request({ url: ThemeOptionsAPI }), {
    enabled: true,
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    // ✅ LocalStorage se cache load karo
    initialData: () => {
      if (typeof window === 'undefined') return undefined;
      try {
        const cached = localStorage.getItem('theme_options');
        return cached ? JSON.parse(cached) : undefined;
      } catch {
        return undefined;
      }
    },
    select: (res) => res?.data,
  });

  useEffect(() => {
    if (data) {
      setThemeOption(data?.options);
      // ✅ Cache save karo localStorage mein
      try {
        localStorage.setItem('theme_options', JSON.stringify({ data }));
      } catch { }
    }
  }, [data]);

  return (
    <ThemeOptionContext.Provider value={{
      ...props,
      setVariant,
      variant,
      isLoading: isLoading && !themeOption?.general, // ✅ Cache ho toh loader mat dikhao
      openAuthModal,
      setOpenAuthModal,
      themeOption,
      openOffCanvas,
      paginationDetails,
      setPaginationDetails,
      setOpenOffCanvas,
      cartCanvas,
      setCartCanvas,
      mobileSideBar,
      setMobileSideBar,
      collectionMobile,
      setCollectionMobile
    }}>
      {props.children}
    </ThemeOptionContext.Provider>
  );
};

export default ThemeOptionProvider;