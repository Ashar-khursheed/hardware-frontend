import CategoryContext from "@/Context/CategoryContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useContext, useEffect, useState } from "react";
import CollectionLeftSidebar from "../Collection/CollectionLeftSidebar";

const CategoryMainPage = ({ slug }) => {
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
  const currentCategory = flatCategoryData?.find(cat => cat.slug === slug);

  if (categoryIsLoading) return <Loader />;

  return (
    <>
      <Breadcrumbs subNavigation={hierarchy} />

      {/* Category Header Section */}
      <div className="category-header-section py-4 bg-white border-bottom">
        <div className="container">
          <h1 className="fw-bold mb-2 text-dark h2">{currentCategory?.name || slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
          {currentCategory?.description && (
            <p className="text-muted mb-0 lead" style={{ fontSize: '1.1rem' }} dangerouslySetInnerHTML={{ __html: currentCategory.description }} />
          )}
        </div>
      </div>

      <CollectionLeftSidebar filter={filter} setFilter={setFilter} hideCategory categorySlug={slug} categoryId={currentCategory?.id} />
    </>
  );
};

export default CategoryMainPage;
