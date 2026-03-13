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

  const getCategoryHierarchy = (slug, data) => {
    let hierarchy = [];
    let current = data?.find(cat => cat.slug === slug);
    while (current) {
      hierarchy.unshift({ name: current.name, link: hierarchy.length > 0 ? `/category/${current.slug}` : null });
      current = data?.find(cat => cat.id === current.parent_id);
    }
    return hierarchy;
  };

  const hierarchy = getCategoryHierarchy(slug, categoryData);
  const currentCategory = categoryData?.find(cat => cat.slug === slug);

  if (categoryIsLoading) return <Loader />;

  return (
    <>
      <Breadcrumbs subNavigation={hierarchy} />

      {/* Category Header Section */}
      <div className="category-header-section py-4 bg-white border-bottom">
        <div className="container">
          <h1 className="fw-bold mb-2 text-dark h2">{currentCategory?.name || slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
          {currentCategory?.description && (
            <p className="text-muted mb-0 lead" style={{ fontSize: '1.1rem' }}>{currentCategory.description}</p>
          )}
        </div>
      </div>

      <CollectionLeftSidebar filter={filter} setFilter={setFilter} hideCategory categorySlug={slug} />
    </>
  );
};

export default CategoryMainPage;
