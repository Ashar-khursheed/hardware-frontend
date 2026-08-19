import SingleBlog from "@/Components/Blogs/SingleBlog";

async function getBlogDetails(slug) {
  try {
    const res = await fetch(`${process.env.API_PROD_URL}/blog/slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Error fetching blog details:", err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const blogData = await getBlogDetails(params?.blogSlug);
  return {
    title: blogData?.meta_title,
    description: blogData?.meta_description,
    images: [blogData?.blog_meta_image?.original_url, []],
    openGraph: {},
  };
}

const BlogDetailContent = async ({ params }) => {
  const blogData = await getBlogDetails(params?.blogSlug);

  return (
    <>
      {blogData?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: blogData.schema,
          }}
        />
      )}

      {params && <SingleBlog params={params?.blogSlug} />}
    </>
  );
};

export default BlogDetailContent;
