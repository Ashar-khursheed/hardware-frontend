import axios from "axios";
import https from "https";

import ProductDetailContent from "@/Components/ProductDetails";
export async function generateMetadata({ params }) {
  const productData = await axios
    .get(`${process.env.API_PROD_URL}/product/slug/${params?.productSlug}`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    })
    .then((res) => res?.data)
    .catch((err) => {
      return err;
    });

  return {
    title: productData?.meta_title,
    description: productData?.meta_description,
    images: [productData?.product_meta_image?.original_url, []],
    openGraph: {},
  };
}

const ProductDetails = async ({ params }) => {
  let productData = null;
  try {
    const response = await axios.get(`${process.env.API_PROD_URL}/product/slug/${params?.productSlug}`, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    productData = response?.data;
  } catch (err) {
    console.error("Error fetching product details for schema:", err);
  }

  return (
    <>
      {productData?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productData.schema
          }}
        />
      )}
      <ProductDetailContent params={params?.productSlug} />
    </>
  );
};

export default ProductDetails;
