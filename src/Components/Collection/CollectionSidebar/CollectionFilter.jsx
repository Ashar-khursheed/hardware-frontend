import { serializeCategoryFilters } from "@/Utils/CategoryFilterUtils";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseLine } from "react-icons/ri";

const CollectionFilter = ({ filter, setFilter, categorySlug }) => {
  const router = useRouter();
  const [layout] = useCustomSearchParams(["layout"]);
  const { t } = useTranslation("common");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const pathname = usePathname();

  const splitFilter = (filterKey) => {
    return filter && filter[filterKey] ? filter[filterKey] : [];
  };

  const flattenCategoryFilters = () => {
    const cf = filter?.categoryFilters || {};
    return Object.values(cf).flat();
  };

  const filterObj = {
    category: splitFilter("category"),
    attribute: splitFilter("attribute"),
    price: splitFilter("price"),
    rating: splitFilter("rating"),
    brand: splitFilter("brand"),
  };

  const mergeFilter = () => {
    setSelectedFilters([
      ...filterObj["category"],
      ...filterObj["brand"],
      ...filterObj["attribute"],
      ...filterObj["price"],
      ...flattenCategoryFilters(),
      ...filterObj["rating"].map((val) => (val.startsWith("rating ") ? val : `rating ${val}`)),
    ]);
  };

  useEffect(() => {
    mergeFilter();
  }, [filter]);

  const removeParams = (slugValue) => {
    Object.keys(filterObj).forEach((key) => {
      filterObj[key] = filterObj[key].filter((val) => {
        if (key === "rating") {
          return val !== slugValue.replace(/^rating /, "");
        }
        return val !== slugValue;
      });
    });

    const nextCategoryFilters = { ...(filter?.categoryFilters || {}) };
    Object.keys(nextCategoryFilters).forEach((groupSlug) => {
      nextCategoryFilters[groupSlug] = nextCategoryFilters[groupSlug].filter((v) => v !== slugValue);
      if (!nextCategoryFilters[groupSlug].length) {
        delete nextCategoryFilters[groupSlug];
      }
    });

    mergeFilter();
    setFilter({ ...filterObj, categoryFilters: nextCategoryFilters });

    const params = {};
    Object.keys(filterObj).forEach((key) => {
      if (filterObj[key].length > 0) {
        params[key] = filterObj[key].join(",");
      }
    });
    const serialized = serializeCategoryFilters(nextCategoryFilters);
    if (serialized) {
      params.category_filters = serialized;
    }
    const queryParams = new URLSearchParams({ ...params, ...layout }).toString();
    router.push(`${pathname}?${queryParams}`);
  };

  const clearParams = () => {
    router.push(pathname);
  };

  const ModifyWord = (value) => {
    return value
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (selectedFilters.length <= 0) return null;
  return (
    <div className="ag-selected-filters">
      <div className="ag-filter-title">
        <h2>{t("filters")}</h2>
        <a onClick={clearParams}>{t("clear_all")}</a>
      </div>
      <ul className="ag-tag-list">
        {selectedFilters?.map((elem, i) => (
          <li key={i}>
            <span>{ModifyWord(elem)}</span>
            <div className="ag-close-tag" onClick={() => removeParams(elem)}>
              <RiCloseLine />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionFilter;
