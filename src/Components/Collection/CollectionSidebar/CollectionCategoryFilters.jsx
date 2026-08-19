import request from "@/Utils/AxiosUtils";
import { CategoryFiltersAPI } from "@/Utils/AxiosUtils/API";
import { serializeCategoryFilters } from "@/Utils/CategoryFilterUtils";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { RiArrowDownSLine } from "react-icons/ri";
import { Collapse } from "reactstrap";

/**
 * Dynamic category-scoped filters (Connector, Length, Voltage, etc.).
 * Renders only when the current category has imported filter groups.
 * UI matches Brand/Price accordion + checkbox list exactly.
 */
const CollectionCategoryFilters = ({
  filter,
  setFilter,
  categorySlug,
  categoryId,
  isOffCanvas,
  open,
  toggle,
  attributeAPIData,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const localCategoryApi = process.env.NEXT_PUBLIC_CATEGORY_API_URL;
  const [category, brand, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams([
    "category",
    "brand",
    "attribute",
    "price",
    "rating",
    "sortBy",
    "field",
    "layout",
  ]);

  const { data: filterGroups } = useQuery(
    ["category-filters", categoryId || categorySlug, localCategoryApi || "live"],
    async () => {
      const params = new URLSearchParams();
      if (categorySlug) params.set("category_slug", categorySlug);
      if (categoryId) params.set("category_id", String(categoryId));

      // Dev: use local API when NEXT_PUBLIC_CATEGORY_API_URL is set (filters live in local DB)
      if (localCategoryApi) {
        const res = await fetch(`${localCategoryApi}${CategoryFiltersAPI}?${params.toString()}`, {
          headers: { Accept: "application/json", "accept-lang": "en" },
        });
        if (!res.ok) throw new Error("Local category filters unavailable");
        return res.json();
      }

      const res = await request({
        url: CategoryFiltersAPI,
        params: {
          category_slug: categorySlug,
          category_id: categoryId,
        },
      });
      return res?.data;
    },
    {
      enabled: !!(categorySlug || categoryId),
      refetchOnWindowFocus: false,
      retry: false,
      select: (res) => res?.data || [],
    }
  );

  if (!filterGroups?.length) return null;

  const selected = filter?.categoryFilters || {};

  const applyValue = (groupSlug, valueSlug) => {
    const current = selected[groupSlug] ? [...selected[groupSlug]] : [];
    let nextValues;
    if (current.includes(valueSlug)) {
      nextValues = current.filter((v) => v !== valueSlug);
    } else {
      nextValues = [...current, valueSlug];
    }

    const nextFilters = { ...selected };
    if (nextValues.length) {
      nextFilters[groupSlug] = nextValues;
    } else {
      delete nextFilters[groupSlug];
    }

    setFilter((prev) => ({
      ...prev,
      categoryFilters: nextFilters,
    }));

    const params = {
      ...category,
      ...brand,
      ...attribute,
      ...price,
      ...rating,
      ...sortBy,
      ...field,
      ...layout,
    };
    const serialized = serializeCategoryFilters(nextFilters);
    if (serialized) {
      params.category_filters = serialized;
    }
    const queryParams = new URLSearchParams(params).toString();
    router.push(queryParams ? `${pathname}?${queryParams}` : pathname);
  };

  const baseId = (attributeAPIData?.length || 0) + 20;

  return (
    <>
      {filterGroups.map((group, i) => {
        const targetId = (baseId + i).toString();
        const groupSelected = selected[group.slug] || [];
        return (
          <div className={`ag-filter-container ${isOffCanvas ? "col-lg-3" : ""}`} key={group.id || group.slug}>
            <div
              className={`ag-filter-header ${open.includes(targetId) ? "open" : ""}`}
              onClick={() => toggle(targetId)}
            >
              <h3>{group.name}</h3>
              <RiArrowDownSLine className="ag-chevron" />
            </div>
            <Collapse isOpen={open.includes(targetId)}>
              <div className="ag-filter-content open">
                <div className="ag-filter-inner-padding">
                  <div className="custom-sidebar-height">
                    <ul className="ag-filter-list">
                      {group.attribute_values?.map((value, index) => (
                        <li key={value.id || index}>
                          <div
                            className={`ag-checkbox-wrapper ${groupSelected.includes(value.slug) ? "active" : ""}`}
                            onClick={() => applyValue(group.slug, value.slug)}
                          >
                            <div className="ag-checkbox-box"></div>
                            <span className="ag-label-text">{value.value}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        );
      })}
    </>
  );
};

export default CollectionCategoryFilters;
