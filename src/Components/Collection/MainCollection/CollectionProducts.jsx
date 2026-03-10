import NoDataFound from "@/Components/Widgets/NoDataFound";
import Pagination from "@/Components/Widgets/Pagination";
import ProductBox from "@/Components/Widgets/ProductBox";
import ProductSkeleton from "@/Components/Widgets/SkeletonLoader/ProductSkeleton";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import { ImagePath } from "@/Utils/Constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import ListProductBox from "./ListProductBox";

const CollectionProducts = ({ filter, grid, infiniteScroll, categorySlug, authorSlug, publicationSlug, setTotalProducts }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [adjustGrid, setAdjustGrid] = useState("col-6 col-lg-4");
  const { t } = useTranslation("common");
  const [infiniteScrollData, setInfiniteScrollData] = useState([]);
  const param = useSearchParams();
  const tagParam = param.get("tag");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchData = async () => {
    const params = {
      page,
      status: 1,
      paginate: filter?.paginate ?? 30,
      field: filter?.field ?? "created_at",
      price: filter?.price?.join(",") ?? "",
      category: categorySlug ? categorySlug : filter?.category?.join(",") || tagParam,
      brand: filter.brand?.join(",") ?? "",
      sort: "",
      sortBy: filter?.sortBy ?? "asc",
      rating: filter?.rating?.join(",") ?? "",
      attribute: filter?.attribute?.join(",") ?? "",
      store_slug: slug ? slug : null,
      created_at: filter?.created_at ?? "",
      author_slug: authorSlug ? authorSlug : filter?.author_slug,
      publication_slug: publicationSlug ? publicationSlug : filter?.publication_slug,
    };
    return request({ url: ProductAPI, params });
  };

  const { data, fetchNextPage, isRefetching, isLoading, fetchStatus, refetch } = useInfiniteQuery({
    queryKey: ["infiniteScroll", filter, page, categorySlug],
    queryFn: fetchData,
    retryOnMount: false,
    enabled: false,
    getNextPageParam: ({ page, last_page }) => last_page > page && { page: page + 1 },
  });

  useEffect(() => {
    if (data?.pages?.length > 0 && setTotalProducts) {
      const total = data.pages[data.pages.length - 1]?.data?.total || 0;
      setTotalProducts(total);
    }
  }, [data, setTotalProducts]);

  const onLoad = () => {
    if (!isLoading && data?.pages?.[data?.pages?.length - 1]?.data?.last_page !== infiniteScrollData.length) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data?.pages?.length > 0) {
      const lastPageData = data?.pages[data?.pages?.length - 1]?.data?.data;
      if (lastPageData?.length) {
        setInfiniteScrollData((prev) => [...prev, lastPageData]);
      }
    }
  }, [data]);

  useEffect(() => {
    fetchNextPage();
    if (!infiniteScroll) {
      window.scroll(0, 0);
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    setInfiniteScrollData([]);
    refetch();
  }, [filter, categorySlug]);

  useEffect(() => {
    if (grid == 2) {
      setAdjustGrid("col-6");
    } else if (grid == 3) {
      setAdjustGrid("col-xl-4 col-lg-6 col-md-4 col-6");
    } else if (grid == 4) {
      setAdjustGrid("col-xxl-3 col-xl-4 col-lg-6 col-md-4 col-6");
    } else if (grid == "list") {
      setAdjustGrid("col-6 col-sm-12");
    }
  }, [grid]);

  useEffect(() => {
    if (isLoading) {
      refetch();
    }
  }, [isLoading]);

  if (!isMounted) return <Row className="g-sm-4 g-3"><Col className={adjustGrid}><ProductSkeleton /></Col></Row>;

  return (
    <>
      {(fetchStatus !== "idle" && !infiniteScrollData.length) || isLoading ? (
        <Row className="g-xl-4 g-lg-3 g-sm-4 g-3">
          {new Array(12).fill(null).map((_, i) => (
            <Col className={adjustGrid} key={i}>
              <ProductSkeleton />
            </Col>
          ))}
        </Row>
      ) : infiniteScrollData?.length > 0 || (data?.pages?.[0]?.data?.data?.length > 0) ? (
        <div className={`product-wrapper-grid ${infiniteScroll ? "product-load-more" : ""} ${grid == "list" ? "list-view" : ""} ${themeOption?.product?.full_border ? "full_border" : ""} ${themeOption?.product?.image_bg ? "product_img_bg" : ""} ${themeOption?.product?.product_box_bg ? "full_bg" : ""} ${themeOption?.product?.product_box_border ? "product_border" : ""}`}>
          {!infiniteScroll ? (
            <Row className="g-xl-4 g-lg-3 g-sm-4 g-3">
              {data?.pages[data.pages.length - 1]?.data?.data?.map((product, i) => (
                <Col className={adjustGrid} key={i}>
                  {grid == "list" ? <ListProductBox product={product} /> : <ProductBox product={product} style="vertical" />}
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="g-xl-4 g-lg-3 g-sm-4 g-3">
              {infiniteScrollData?.map((productPage, i) => (
                <React.Fragment key={i}>
                  {productPage.map((item, index) => (
                    <Col className={adjustGrid} key={index}>
                      <ProductBox product={item} style="vertical" />
                    </Col>
                  ))}
                </React.Fragment>
              ))}
            </Row>
          )}
        </div>
      ) : (
        <NoDataFound customClass="no-data-added " title="no_product" description="no_product_desc" height="345" width="345" imageUrl={`/assets/svg/empty-items.svg`} />
      )}

      {!infiniteScroll ? (
        data?.pages[data.pages.length - 1]?.data?.data?.length > 0 && (
          <div className="product-pagination">
            <div className="theme-pagination-block">
              <nav>
                <Pagination current_page={data?.pages[data.pages.length - 1]?.data.current_page} total={data?.pages[data.pages.length - 1]?.data?.total} per_page={data?.pages[data.pages.length - 1]?.data?.per_page} setPage={setPage} />
              </nav>
            </div>
          </div>
        )
      ) : (
        <div className="load-more-sec">
          {fetchStatus !== "idle" ? <img src={`${ImagePath}/loader.gif`} /> : <a onClick={onLoad}>{t("load_more")}</a>}
        </div>
      )}
    </>
  );
};

export default CollectionProducts;