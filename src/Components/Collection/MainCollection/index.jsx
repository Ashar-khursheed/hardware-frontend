// import ThemeOptionContext from "@/Context/ThemeOptionsContext";
// import Btn from "@/Elements/Buttons/Btn";
// import { storageURL } from "@/Utils/Constants";
// import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
// import { useContext, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { RiFilterFill } from "react-icons/ri";
// import { Col, Row } from "reactstrap";
// import CollectionSidebar from "../CollectionSidebar";
// import CollectionProducts from "./CollectionProducts";
// import FilterBtn from "./FilterBtn";
// import FilterPaginate from "./FilterPaginate";
// import FilterSort from "./FilterSort";
// import GridBox from "./GridBox";
// import OfferBanner from "./OfferBanner";
// import PopUpSidebar from "./PopUpSidebar";

// const MainCollection = ({authorSlug, publicationSlug, filter, setFilter, isBanner, isOffcanvas, classicStoreCard, initialGrid = 3, noSidebar, sellerClass, sidebarPopUp, infiniteScroll, categorySlug }) => {
//   const [grid, setGrid] = useState(initialGrid);
//   const { themeOption, setCollectionMobile } = useContext(ThemeOptionContext);
//   const { t } = useTranslation("common");
//   const [layout] = useCustomSearchParams(["layout"]);

//   useEffect(() => {
//     if (layout?.layout == "collection_2_grid") {
//       setGrid(2);
//     } else if (layout?.layout == "collection_3_grid") {
//       setGrid(3);
//     } else if (layout?.layout == "collection_4_grid") {
//       setGrid(4);
//     } else if (layout?.layout == "collection_5_grid") {
//       setGrid(5);
//     } else if (layout?.layout == "collection_list_view") {
//       setGrid("list");
//     }
//   }, [layout]);
//   return (
//     <div className={`collection-content ${noSidebar ? "col-12" : "col-xl-9 col-lg-8"}`}>
//       <div className="page-main-content">
//         <Row>
//           <Col xs="12">
//             {isBanner && themeOption?.collection?.collection_banner_image_url && (
//               <div className="top-banner-wrapper">
//                 <OfferBanner classes={{ customHoverClass: "banner-contain hover-effect mb-4" }} imgUrl={storageURL + themeOption?.collection?.collection_banner_image_url} />{" "}
//               </div>
//             )}
//             <div className="collection-product-wrapper">
//               <div className="product-top-filter">
//                 {!isOffcanvas && !sidebarPopUp && (
//                   <Btn color="transparent" className="filter-main-btn " onClick={() => setCollectionMobile(true)}>
//                     <RiFilterFill /> {t("filter")}
//                   </Btn>
//                 )}
//                 <Row>
//                   <Col>
//                     <div className={`${sidebarPopUp ? "popup-filter" : "product-filter-content"}`}>
//                       <div className="dropdown-box-group">
//                         {isOffcanvas && <FilterBtn />}
//                         {sidebarPopUp && <PopUpSidebar filter={filter} setFilter={setFilter} />}
//                         <FilterSort filter={filter} setFilter={setFilter} />
//                         <FilterPaginate filter={filter} setFilter={setFilter} />
//                       </div>
//                       <GridBox grid={grid} setGrid={setGrid} />
//                     </div>
//                     {isOffcanvas && <CollectionSidebar sellerClass={"top-filter filter-bottom-content"} filter={filter} setFilter={setFilter} isOffcanvas={true} />}
//                   </Col>
//                 </Row>
//               </div>
//               <CollectionProducts filter={filter} grid={grid} infiniteScroll={infiniteScroll} categorySlug={categorySlug} authorSlug={authorSlug} publicationSlug={publicationSlug} />
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// // export default MainCollection;
// import ThemeOptionContext from "@/Context/ThemeOptionsContext";
// import Btn from "@/Elements/Buttons/Btn";
// import { storageURL } from "@/Utils/Constants";
// import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
// import { useContext, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { RiFilterFill } from "react-icons/ri";
// import { Col, Row } from "reactstrap";
// import { useSearchParams } from "next/navigation";
// import CollectionSidebar from "../CollectionSidebar";
// import CollectionProducts from "./CollectionProducts";
// import FilterBtn from "./FilterBtn";
// import FilterPaginate from "./FilterPaginate";
// import FilterSort from "./FilterSort";
// import GridBox from "./GridBox";
// import OfferBanner from "./OfferBanner";
// import PopUpSidebar from "./PopUpSidebar";

// const MainCollection = ({authorSlug, publicationSlug, filter, setFilter, isBanner, isOffcanvas, classicStoreCard, initialGrid = 3, noSidebar, sellerClass, sidebarPopUp, infiniteScroll, categorySlug }) => {
//   const [grid, setGrid] = useState(initialGrid);
//   const { themeOption, setCollectionMobile } = useContext(ThemeOptionContext);
//   const { t } = useTranslation("common");
//   const [layout] = useCustomSearchParams(["layout"]);
//   const searchParams = useSearchParams();

//   // Sync URL params with filter state
//   useEffect(() => {
//     const paginate = searchParams.get("paginate");
//     const sortBy = searchParams.get("sortBy");
//     const field = searchParams.get("field");

//     setFilter((prev) => ({
//       ...prev,
//       paginate: paginate ? parseInt(paginate) : prev.paginate || 30,
//       sortBy: sortBy || prev.sortBy || "asc",
//       field: field || prev.field || "created_at",
//     }));
//   }, [searchParams]);

//   useEffect(() => {
//     if (layout?.layout == "collection_2_grid") {
//       setGrid(2);
//     } else if (layout?.layout == "collection_3_grid") {
//       setGrid(3);
//     } else if (layout?.layout == "collection_4_grid") {
//       setGrid(4);
//     } else if (layout?.layout == "collection_5_grid") {
//       setGrid(5);
//     } else if (layout?.layout == "collection_list_view") {
//       setGrid("list");
//     }
//   }, [layout]);

//   return (
//     <div className={`collection-content ${noSidebar ? "col-12" : "col-xl-9 col-lg-8"}`}>
//       <div className="page-main-content">
//         <Row>
//           <Col xs="12">
//             {isBanner && themeOption?.collection?.collection_banner_image_url && (
//               <div className="top-banner-wrapper">
//                 <OfferBanner classes={{ customHoverClass: "banner-contain hover-effect mb-4" }} imgUrl={storageURL + themeOption?.collection?.collection_banner_image_url} />{" "}
//               </div>
//             )}
//             <div className="collection-product-wrapper">
//               <div className="product-top-filter">
//                 {!isOffcanvas && !sidebarPopUp && (
//                   <Btn color="transparent" className="filter-main-btn " onClick={() => setCollectionMobile(true)}>
//                     <RiFilterFill /> {t("filter")}
//                   </Btn>
//                 )}
//                 <Row>
//                   <Col>
//                     <div className={`${sidebarPopUp ? "popup-filter" : "product-filter-content"}`}>
//                        <GridBox grid={grid} setGrid={setGrid} />
//                       <div className="dropdown-box-group">
//                         {isOffcanvas && <FilterBtn />}
//                         {sidebarPopUp && <PopUpSidebar filter={filter} setFilter={setFilter} />}
//                         <FilterSort filter={filter} setFilter={setFilter} />
//                         <FilterPaginate filter={filter} setFilter={setFilter} />
//                       </div>
                     
//                     </div>
//                     {isOffcanvas && <CollectionSidebar sellerClass={"top-filter filter-bottom-content"} filter={filter} setFilter={setFilter} isOffcanvas={true} />}
//                   </Col>
//                 </Row>
//               </div>
//               <CollectionProducts filter={filter} grid={grid} infiniteScroll={infiniteScroll} categorySlug={categorySlug} authorSlug={authorSlug} publicationSlug={publicationSlug} />
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default MainCollection;

import CategoryContext from "@/Context/CategoryContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Btn from "@/Elements/Buttons/Btn";
import { storageURL } from "@/Utils/Constants";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiFilterFill } from "react-icons/ri";
import { Col, Row } from "reactstrap";
import { useSearchParams } from "next/navigation";
import CollectionSidebar from "../CollectionSidebar";
import CollectionProducts from "./CollectionProducts";
import FilterBtn from "./FilterBtn";
import FilterPaginate from "./FilterPaginate";
import FilterSort from "./FilterSort";
import GridBox from "./GridBox";
import OfferBanner from "./OfferBanner";
import PopUpSidebar from "./PopUpSidebar";

const MainCollection = ({authorSlug, publicationSlug, filter, setFilter, isBanner, isOffcanvas, classicStoreCard, initialGrid = 3, noSidebar, sellerClass, sidebarPopUp, infiniteScroll, categorySlug }) => {
  const [grid, setGrid] = useState(initialGrid);
  const [totalProducts, setTotalProducts] = useState(0);
  const { themeOption, setCollectionMobile } = useContext(ThemeOptionContext);
  const { categoryData } = useContext(CategoryContext);
  const { t } = useTranslation("common");
  const [layout] = useCustomSearchParams(["layout"]);
  const searchParams = useSearchParams();

  // Find current category for description
  const currentCategory = useMemo(() => {
    if (!categorySlug) return null;
    
    // Recursive search in category tree
    const findCat = (cats, slug) => {
      for (const cat of cats) {
        if (cat.slug === slug) return cat;
        if (cat.subcategories?.length) {
          const found = findCat(cat.subcategories, slug);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findCat(categoryData || [], categorySlug);
  }, [categoryData, categorySlug]);

  // Sync URL params with filter state
  useEffect(() => {
    const paginate = searchParams.get("paginate");
    const sortBy = searchParams.get("sortBy");
    const field = searchParams.get("field");

    setFilter((prev) => ({
      ...prev,
      paginate: paginate ? parseInt(paginate) : prev.paginate || 30,
      sortBy: sortBy || prev.sortBy || "asc",
      field: field || prev.field || "created_at",
    }));
  }, [searchParams]);

  useEffect(() => {
    if (layout?.layout == "collection_2_grid") {
      setGrid(2);
    } else if (layout?.layout == "collection_3_grid") {
      setGrid(3);
    } else if (layout?.layout == "collection_4_grid") {
      setGrid(4);
    } else if (layout?.layout == "collection_5_grid") {
      setGrid(5);
    } else if (layout?.layout == "collection_list_view") {
      setGrid("list");
    }
  }, [layout]);

  return (
    <div className={`collection-content ${noSidebar ? "col-12" : "col-xl-9 col-lg-8"}`}>
      <div className="page-main-content">
        <Row>
          <Col xs="12">
            {isBanner && themeOption?.collection?.collection_banner_image_url && (
              <div className="top-banner-wrapper">
                <OfferBanner classes={{ customHoverClass: "banner-contain hover-effect mb-4" }} imgUrl={storageURL + themeOption?.collection?.collection_banner_image_url} />{" "}
              </div>
            )}
            <div className="collection-product-wrapper">
              {currentCategory?.description && (
                <div className="category-description mb-4 p-3 bg-light rounded">
                  <p className="mb-0 text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    {currentCategory.description}
                  </p>
                </div>
              )}
              <div className="product-top-filter">
                {!isOffcanvas && !sidebarPopUp && (
                  <Btn color="transparent" className="filter-main-btn " onClick={() => setCollectionMobile(true)}>
                    <RiFilterFill /> {t("filter")}
                  </Btn>
                )}
                <Row>
                  <Col>
                    <div className={`${sidebarPopUp ? "popup-filter" : "product-filter-content"}`}>
                      <div className="product-total-count">
                        <h6>
                          {totalProducts > 0 ? (
                            <>
                              <span className="total-number">{totalProducts}</span> {t("Product Found")}
                            </>
                          ) : (
                            <span>{t("loading")}...</span>
                          )}
                        </h6>
                      </div>
                      <div className="product-sort-grid">
                        
                          <div className="dropdown-box-group">
                           {/* <div className="sortby">
                            <p>Sort By</p>
                            </div>  */}
                           
                        {isOffcanvas && <FilterBtn />}
                        {sidebarPopUp && <PopUpSidebar filter={filter} setFilter={setFilter} />}
                        <FilterSort filter={filter} setFilter={setFilter} />
                        <FilterPaginate filter={filter} setFilter={setFilter} />
                      </div>
                      <GridBox grid={grid} setGrid={setGrid} />
                      
                    
                      </div>
                    </div>
                    {isOffcanvas && <CollectionSidebar sellerClass={"top-filter filter-bottom-content"} filter={filter} setFilter={setFilter} isOffcanvas={true} />}
                  </Col>
                </Row>
              </div>
              <CollectionProducts 
                filter={filter} 
                grid={grid} 
                infiniteScroll={infiniteScroll} 
                categorySlug={categorySlug} 
                authorSlug={authorSlug} 
                publicationSlug={publicationSlug}
                setTotalProducts={setTotalProducts}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MainCollection;