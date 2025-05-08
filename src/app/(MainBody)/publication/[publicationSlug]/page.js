"use client";

import PublicationMainPage from "@/Components/publication";


const PublicationSlugPage = ({ params }) => {
  return <PublicationMainPage slug={params?.publicationSlug} />;
};

export default PublicationSlugPage;