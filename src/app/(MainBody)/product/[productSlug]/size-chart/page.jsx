import SizeChartContent from "@/Components/Pages/SizeChart";

export async function generateMetadata({ params }) {
  return {
    title: `Size Chart - ${params.productSlug}`,
  };
}

const SizeChartPage = ({ params }) => {
  return <SizeChartContent params={params?.productSlug} />;
};

export default SizeChartPage;
