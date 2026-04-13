import DeliveryReturnContent from "@/Components/Pages/DeliveryReturn";

export async function generateMetadata({ params }) {
  return {
    title: `Delivery & Return - ${params.productSlug}`,
  };
}

const DeliveryReturnPage = ({ params }) => {
  return <DeliveryReturnContent params={params?.productSlug} />;
};

export default DeliveryReturnPage;
