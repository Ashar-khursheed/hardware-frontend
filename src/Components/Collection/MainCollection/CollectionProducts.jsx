import NoDataFound from "@/Components/Widgets/NoDataFound";
import Pagination from "@/Components/Widgets/Pagination";
import ProductBox from "@/Components/Widgets/ProductBox";
import ProductSkeleton from "@/Components/Widgets/SkeletonLoader/ProductSkeleton";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import request from "@/Utils/AxiosUtils";
import { CategoryFiltersAPI, ProductAPI } from "@/Utils/AxiosUtils/API";
import { serializeCategoryFilters } from "@/Utils/CategoryFilterUtils";
import { ImagePath } from "@/Utils/Constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import ListProductBox from "./ListProductBox";

const normalizeSku = (sku) => String(sku || "").trim().replace(/=+$/, "").toUpperCase();

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
  const localCategoryApi = process.env.NEXT_PUBLIC_CATEGORY_API_URL;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchMatchingSkus = async (serializedFilters) => {
    if (!localCategoryApi || !serializedFilters || !categorySlug) return null;
    try {
      const qs = new URLSearchParams({
        category_slug: categorySlug,
        category_filters: serializedFilters,
      });
      const res = await fetch(`${localCategoryApi}${CategoryFiltersAPI}/skus?${qs.toString()}`, {
        headers: { Accept: "application/json", "accept-lang": "en" },
      });
      if (!res.ok) return null;
      const json = await res.json();
      return (json?.data || []).map(normalizeSku).filter(Boolean);
    } catch {
      return null;
    }
  };

  const fetchData = async () => {
    const serializedFilters = serializeCategoryFilters(filter?.categoryFilters);
    const matchingSkus = await fetchMatchingSkus(serializedFilters);
    const useLocalSkuFilter = !!localCategoryApi && !!serializedFilters && Array.isArray(matchingSkus);

    // No SKUs match this Connector+Length combination in Excel
    if (useLocalSkuFilter && matchingSkus.length === 0) {
      return {
        data: {
          data: [],
          total: 0,
          per_page: filter?.paginate ?? 30,
          current_page: page,
          last_page: 1,
          from: null,
          to: null,
        },
      };
    }

    // When we have exact Part#s, fetch each by search so AND results aren't missed
    // (they may not appear in the parent category product dump).
    if (useLocalSkuFilter && matchingSkus.length > 0 && matchingSkus.length <= 80) {
      const seen = new Set();
      const found = [];

      await Promise.all(
        matchingSkus.map(async (sku) => {
          const res = await request({
            url: ProductAPI,
            params: {
              search: sku,
              status: 1,
              paginate: 10,
            },
          });
          for (const product of res?.data?.data || []) {
            const productSku = normalizeSku(product?.sku);
            const name = normalizeSku(product?.name);
            const match =
              productSku === sku ||
              name === sku ||
              name.startsWith(`${sku} `) ||
              name.startsWith(`${sku}-`);
            if (match && !seen.has(product.id)) {
              seen.add(product.id);
              found.push(product);
            }
          }
        })
      );

      const perPage = filter?.paginate ?? 30;
      const start = (page - 1) * perPage;
      const pageItems = found.slice(start, start + perPage);
      const total = found.length;
      const lastPage = Math.max(1, Math.ceil(total / perPage) || 1);

      return {
        data: {
          data: pageItems,
          total,
          per_page: perPage,
          current_page: page,
          last_page: lastPage,
          from: total === 0 ? null : start + 1,
          to: total === 0 ? null : start + pageItems.length,
        },
      };
    }

    const params = {
      page: useLocalSkuFilter ? 1 : page,
      status: 1,
      paginate: useLocalSkuFilter ? 500 : filter?.paginate ?? 30,
      field: filter?.field ?? "created_at",
      price: filter?.price?.join(",") ?? "",
      category: categorySlug ? categorySlug : filter?.category?.join(",") || tagParam,
      brand: filter.brand?.join(",") ?? "",
      sort: "",
      sortBy: filter?.sortBy ?? "asc",
      rating: filter?.rating?.join(",") ?? "",
      attribute: filter?.attribute?.join(",") ?? "",
      category_filters: useLocalSkuFilter ? "" : serializedFilters,
      store_slug: slug ? slug : null,
      created_at: filter?.created_at ?? "",
      author_slug: authorSlug ? authorSlug : filter?.author_slug,
      publication_slug: publicationSlug ? publicationSlug : filter?.publication_slug,
    };

    const response = await request({ url: ProductAPI, params });

    if (useLocalSkuFilter && response?.data?.data) {
      const skuSet = new Set(matchingSkus);
      const filtered = response.data.data.filter((product) => {
        const productSku = normalizeSku(product?.sku);
        if (productSku && skuSet.has(productSku)) return true;
        const name = normalizeSku(product?.name);
        if (!name) return false;
        for (const sku of skuSet) {
          if (name === sku || name.startsWith(`${sku} `) || name.startsWith(`${sku}-`)) {
            return true;
          }
        }
        return false;
      });
      const perPage = filter?.paginate ?? 30;
      const start = (page - 1) * perPage;
      const pageItems = filtered.slice(start, start + perPage);
      const total = filtered.length;
      const lastPage = Math.max(1, Math.ceil(total / perPage) || 1);

      return {
        ...response,
        data: {
          ...response.data,
          data: pageItems,
          total,
          per_page: perPage,
          current_page: page,
          last_page: lastPage,
          from: total === 0 ? null : start + 1,
          to: total === 0 ? null : start + pageItems.length,
        },
      };
    }

    return response;
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