"use client";

import AuthorMainPage from "@/Components/author";


const AuthorSlugPage = ({ params }) => {
  return <AuthorMainPage slug={params?.authorSlug} />;
};

export default AuthorSlugPage;
