"use client";
import request from "@/Utils/AxiosUtils";
import { ThemeAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useContext, lazy, Suspense } from "react";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";

// Dynamic imports for better code splitting - only load the theme that's actually being used
const themeComponents = {
  fashion_one: lazy(() => import("../Themes/Fashion/Fashion1")),
  fashion_two: lazy(() => import("../Themes/Fashion/Fashion2")),
  fashion_three: lazy(() => import("../Themes/Fashion/Fashion3")),
  fashion_four: lazy(() => import("../Themes/Fashion/Fashion4")),
  fashion_five: lazy(() => import("../Themes/Fashion/Fashion5")),
  fashion_six: lazy(() => import("../Themes/Fashion/Fashion6")),
  fashion_seven: lazy(() => import("../Themes/Fashion/Fashion7")),
  furniture_one: lazy(() => import("../Themes/Furniture/Furniture1")),
  furniture_two: lazy(() => import("../Themes/Furniture/Furniture2")),
  furniture_dark: lazy(() => import("../Themes/Furniture/FurnitureDark")),
  electronics_one: lazy(() => import("../Themes/Electronics/ElectronicsOne")),
  electronics_two: lazy(() => import("../Themes/Electronics/ElectronicsTwo")),
  electronics_three: lazy(() => import("../Themes/Electronics/ElectronicsThree")),
  vegetables_one: lazy(() => import("../Themes/Vegatables/VegetablesOne")),
  vegetables_two: lazy(() => import("../Themes/Vegatables/VegetablesTwo")),
  vegetables_three: lazy(() => import("../Themes/Vegatables/VegetablesThree")),
  vegetables_four: lazy(() => import("../Themes/Vegatables/VegetablesFour")),
  marketplace_one: lazy(() => import("../Themes/Marketplace/MarketplaceOne")),
  marketplace_two: lazy(() => import("../Themes/Marketplace/MarketplaceTwo")),
  marketplace_three: lazy(() => import("../Themes/Marketplace/MarketplaceThree")),
  marketplace_four: lazy(() => import("../Themes/Marketplace/MarketplaceFour")),
  jewellery_one: lazy(() => import("../Themes/Jewellery/JwelleryOne")),
  jewellery_two: lazy(() => import("../Themes/Jewellery/JewelleryTwo")),
  jewellery_three: lazy(() => import("../Themes/Jewellery/JewelleryThree")),
  parallax: lazy(() => import("../Themes/Parallax")),
  game: lazy(() => import("../Themes/Game")),
  gym: lazy(() => import("../Themes/Gym")),
  flower: lazy(() => import("../Themes/Flower")),
  gradient: lazy(() => import("../Themes/Gradient")),
  bicycle: lazy(() => import("../Themes/Bicycle")),
  goggles: lazy(() => import("../Themes/Goggles")),
  nursery: lazy(() => import("../Themes/Nursery")),
  christmas: lazy(() => import("../Themes/Christmas")),
  kids: lazy(() => import("../Themes/Kids")),
  yoga: lazy(() => import("../Themes/Yoga")),
  pets: lazy(() => import("../Themes/Pets")),
  full_page: lazy(() => import("../Themes/FullPage")),
  tools: lazy(() => import("../Themes/Tools")),
  perfume: lazy(() => import("../Themes/Perfume")),
  video: lazy(() => import("../Themes/Video")),
  marijuana: lazy(() => import("../Themes/Marijuana")),
  bag: lazy(() => import("../Themes/Bag")),
  watch: lazy(() => import("../Themes/Watch")),
  shoes: lazy(() => import("../Themes/Shoes")),
  beauty: lazy(() => import("../Themes/Beauty")),
  video_slider: lazy(() => import("../Themes/VideoSlider")),
  surfboard: lazy(() => import("../Themes/SurfBoard")),
  medical: lazy(() => import("../Themes/Medical")),
  books: lazy(() => import("../Themes/Books")),
  single_product: lazy(() => import("../Themes/SingleProduct")),
  digital_download: lazy(() => import("../Themes/DigitalDownload")),
};

const ActiveTheme = () => {
  const { data, isLoading } = useQuery(
    [ThemeAPI], 
    () => request({ url: ThemeAPI }), 
    { 
      enabled: true, 
      refetchOnWindowFocus: false, 
      select: (res) => res?.data.data,
      // Cache theme data for 10 minutes
      staleTime: 10 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );
  
  const search = useSearchParams();
  const themeBySlug = search.get("theme");
  const activeTheme = data?.find((elem) => elem.status === 1);
  const { isLoading: themeLoading } = useContext(ThemeOptionContext);

  if (themeLoading || isLoading) return <Loader />;

  // Get the theme slug to load
  const themeSlug = themeBySlug || activeTheme?.slug;
  
  // Get the lazy-loaded component
  const ThemeComponent = themeComponents[themeSlug];

  // If no theme found, show loader
  if (!ThemeComponent) {
    console.warn(`Theme "${themeSlug}" not found`);
    return <Loader />;
  }

  // Render with Suspense for lazy loading
  return (
    <Suspense fallback={<Loader />}>
      <ThemeComponent />
    </Suspense>
  );
};

export default ActiveTheme;
