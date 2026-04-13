import AskQuestionContent from "@/Components/Pages/AskQuestion";

export async function generateMetadata({ params }) {
  return {
    title: `Ask a Question - ${params.productSlug}`,
  };
}

const AskQuestionPage = ({ params }) => {
  return <AskQuestionContent params={params?.productSlug} />;
};

export default AskQuestionPage;
