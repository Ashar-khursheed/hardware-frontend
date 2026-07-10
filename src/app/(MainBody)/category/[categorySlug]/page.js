import CategoryMainPage from "@/Components/Category";
import { getCategorySeoFromOverrides } from "@/Data/CategorySeoOverrides";

export async function generateMetadata({ params }) {
  const categorySlug = params?.categorySlug;
  const override = getCategorySeoFromOverrides(categorySlug);

  try {
    const res = await fetch(`${process.env.API_PROD_URL}/category/slug/${categorySlug}`, {
      next: { revalidate: 60 },
    });

    const categoryData = res.ok ? await res.json() : null;
    const title = override?.title || categoryData?.meta_title || categoryData?.name || "Category";
    const description =
      override?.description ||
      categoryData?.meta_description ||
      categoryData?.description?.replace?.(/<[^>]*>/g, "") ||
      "";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: categoryData?.category_meta_image?.original_url
          ? [{ url: categoryData.category_meta_image.original_url }]
          : [],
      },
    };
  } catch (err) {
    console.error("Category metadata fetch error:", err);
    if (override) {
      return { title: override.title, description: override.description };
    }
    return { title: "Category", description: "" };
  }
}

const CategorySlugPage = ({ params }) => {
  return <CategoryMainPage slug={params?.categorySlug} />;
};

export default CategorySlugPage;
