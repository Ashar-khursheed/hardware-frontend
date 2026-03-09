import SKBlogSidebar from "@/Components/Widgets/SkeletonLoader/BlogSkeleton/SKBlogSidebar";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import request from "@/Utils/AxiosUtils";
import { AttributesAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowLeftSLine, RiArrowDownSLine } from "react-icons/ri";
import { Collapse } from "reactstrap";
// import { Accordion, AccordionHeader, AccordionItem } from "reactstrap"; // Removed Accordion imports
import CollectionAttributes from "./CollectionAttributes";
import CollectionBrand from "./CollectionBrand";
import CollectionCategory from "./CollectionCategory";
import CollectionFilter from "./CollectionFilter";
import CollectionPrice from "./CollectionPrice";
import CollectionRating from "./CollectionRating";
import "./UniqueFilters.scss";

const CollectionSidebar = ({ filter, setFilter, isOffcanvas, basicStoreCard, rightSideClass, sellerClass, isAttributes = true, hideCategory, categorySlug }) => {
  const { collectionMobile, setCollectionMobile, openOffCanvas, setOpenOffCanvas } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]);

  const toggle = (id) => {
    if (open.includes(id)) {
      setOpen(open.filter(item => item !== id));
    } else {
      setOpen([...open, id]);
    }
  };

  const { data: attributeAPIData, isLoading } = useQuery([AttributesAPI], () => request({ url: AttributesAPI, params: { status: 1 } }), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });

  return (
    <>
      {collectionMobile && <div className="bg-overlay collection-overlay show" onClick={() => setCollectionMobile(false)} />}
      <div className={` ${openOffCanvas ? "d-block" : ""} ${sellerClass ? sellerClass : `col-xl-3 col-lg-4`} `}>
        <div className={`collection-filter sticky-top-section ${collectionMobile ? "open" : ""} ag-unique-sidebar`}>
          <div className="collection-filter-block">
            {!isOffcanvas && (
              <div
                className="collection-mobile-back"
                onClick={() => setCollectionMobile((prev) => !prev)}
              >
                <span className="filter-back">
                  <RiArrowLeftSLine />
                  {t("back")}
                </span>
              </div>
            )}

            {basicStoreCard && basicStoreCard}

            {!isOffcanvas && <CollectionFilter filter={filter} setFilter={setFilter} categorySlug={categorySlug} />}

            {isLoading ? (
              <SKBlogSidebar />
            ) : (
              attributeAPIData && (
                <div className={`ag-sidebar-content ${isOffcanvas ? "row" : ""}`}>
                  {!hideCategory && (
                    <div className="ag-filter-container">
                      <div
                        className={`ag-filter-header ${open.includes("1") ? "open" : ""}`}
                        onClick={() => toggle("1")}
                      >
                        <h3>{t("categories")}</h3>
                        <RiArrowDownSLine className="ag-chevron" />
                      </div>
                      <Collapse isOpen={open.includes("1")}>
                        <CollectionCategory filter={filter} setFilter={setFilter} />
                      </Collapse>
                    </div>
                  )}

                  <div className="ag-filter-container">
                    <div
                      className={`ag-filter-header ${open.includes("2") ? "open" : ""}`}
                      onClick={() => toggle("2")}
                    >
                      <h3>{t("brand")}</h3>
                      <RiArrowDownSLine className="ag-chevron" />
                    </div>
                    <Collapse isOpen={open.includes("2")}>
                      <CollectionBrand filter={filter} setFilter={setFilter} categorySlug={categorySlug} />
                    </Collapse>
                  </div>

                  {isAttributes && (
                    <CollectionAttributes
                      isOffCanvas={isOffcanvas}
                      attributeAPIData={attributeAPIData}
                      filter={filter}
                      setFilter={setFilter}
                      open={open}
                      toggle={toggle}
                    />
                  )}

                  <CollectionPrice
                    isOffCanvas={isOffcanvas}
                    filter={filter}
                    setFilter={setFilter}
                    attributeAPIData={attributeAPIData}
                    open={open}
                    toggle={toggle}
                  />

                  {/* Rating filter commented out as per request */}
                  {/* <CollectionRating isOffCanvas={isOffcanvas} filter={filter} setFilter={setFilter} attributeAPIData={attributeAPIData} /> */}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionSidebar;
