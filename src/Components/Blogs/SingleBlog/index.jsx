"use client";
import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { BlogAPI } from "@/Utils/AxiosUtils/API";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import BlogCardDetails from "../BlogCardDetails";
import Sidebar from "../Sidebar/Sidebar";
import { Col } from "reactstrap";

const SingleBlog = ({ params }) => {
  const { data: Blog, isLoading, refetch } = useQuery([params], () => request({ url: `${BlogAPI}/slug/${params}` }), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs title={Blog?.title} subNavigation={[{ name: "Blog", link: "/blog" }, { name: Blog?.title }]} />
          <WrapperComponent classes={{ sectionClass: "blog-section blog-page ratio2_3 section-b-space", fluidClass: "container" }} customCol={true}>
            <Sidebar isLoading={isLoading} />
            <Col xxl={9} lg={8}>
              <BlogCardDetails Blog={Blog} key={params} />
            </Col>
          </WrapperComponent>
        </>
      )}
    </>
  );
};

export default SingleBlog;
