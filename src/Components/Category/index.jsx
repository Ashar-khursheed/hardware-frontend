"use client";
import CategoryContext from "@/Context/CategoryContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import request from "@/Utils/AxiosUtils";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CollectionLeftSidebar from "../Collection/CollectionLeftSidebar";
import CategoryDescription from "./CategoryDescription";

const CategoryMainPage = ({ slug }) => {
  const router = useRouter();
  const { isLoading } = useContext(ThemeOptionContext);
  const [filter, setFilter] = useState({ category: [slug], brand: [], price: [], attribute: [], rating: [], page: 1, sortBy: "asc", field: "created_at" });
  const [brand, attribute, price, rating, sortBy, field, layout, page] = useCustomSearchParams(["brand", "attribute", "price", "rating", "sortBy", "field", "layout", "page"]);
  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        page: page ? page?.page : 1,
        brand: brand ? brand?.brand?.split(",") : [],
        attribute: attribute ? attribute?.attribute?.split(",") : [],
        price: price ? price?.price?.split(",") : [],
        rating: rating ? rating?.rating?.split(",") : [],
        sortBy: sortBy ? sortBy?.sortBy : "asc",
        field: field ? field?.field : "created_at",
      };
    });
  }, [brand, attribute, price, rating, sortBy, field, page]);

  const { categoryData, categoryIsLoading } = useContext(CategoryContext);

  const localCategoryApi = process.env.NEXT_PUBLIC_CATEGORY_API_URL;

  const { data: categoryDetail, isLoading: categoryDetailLoading } = useQuery(
    ["categorySlug", slug],
    () => request({ url: `/category/slug/${slug}` }, router),
    {
      enabled: !!slug,
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      select: (res) => res?.data,
    }
  );

  // Dev only: fetch description/content from local API without changing site-wide API
  const { data: localCategoryContent, isLoading: localContentLoading, isError: localContentError } = useQuery(
    ["categorySlugLocalContent", slug, "v2"],
    async () => {
      const res = await fetch(`${localCategoryApi}/category/slug/${slug}`, {
        headers: { Accept: "application/json", "accept-lang": "en" },
      });
      if (!res.ok) throw new Error("Local category API unavailable");
      return res.json();
    },
    {
      enabled: !!slug && !!localCategoryApi,
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  // Recursive function to flatten the category tree
  const flattenCategories = (items) => {
    let flat = [];
    items.forEach(item => {
      flat.push(item);
      if (item.subcategories && item.subcategories.length > 0) {
        flat = flat.concat(flattenCategories(item.subcategories));
      }
    });
    return flat;
  };

  const flatCategoryData = categoryData ? flattenCategories(categoryData) : [];

  const getCategoryHierarchy = (slug, flatData) => {
    if (!flatData || flatData.length === 0) return [];

    let hierarchy = [];
    let current = flatData?.find(cat => cat.slug === slug);

    while (current) {
      // First item (deepest) doesn't get a link, others (parents) do
      hierarchy.unshift({
        name: current.name,
        link: hierarchy.length > 0 ? `/category/${current.slug}` : null
      });
      current = flatData?.find(cat => cat.id === current.parent_id);
    }
    return hierarchy;
  };

  const hierarchy = getCategoryHierarchy(slug, flatCategoryData);
  const currentCategory = categoryDetail || flatCategoryData?.find(cat => cat.slug === slug) || (!localContentError ? localCategoryContent : null);

  const displayHeading = (!localContentError && localCategoryContent?.heading) || currentCategory?.heading;
  const displayDescription = (!localContentError && localCategoryContent?.description) || currentCategory?.description;
  const displayContent = (!localContentError && localCategoryContent?.content) || currentCategory?.content;

  // In local dev mode (local category API set), render as soon as local content is ready
  // instead of blocking on the live API, which may be unreachable offline.
  if (localCategoryApi) {
    if (localContentLoading) return <Loader />;
  } else if (categoryIsLoading || categoryDetailLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumbs subNavigation={hierarchy} />

      <CategoryDescription
        heading={displayHeading}
        slug={slug}
        description={displayDescription}
        content={displayContent}
      />

      <CollectionLeftSidebar filter={filter} setFilter={setFilter} hideCategory categorySlug={slug} categoryId={currentCategory?.id} />
    </>
  );
};

export default CategoryMainPage;
