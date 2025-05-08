import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { PageAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PageCard = ({ params }) => {
  const router = useRouter();
  const { data: Page, isLoading, refetch } = useQuery([params], () => request({ url: `${PageAPI}/slug/${params}` }, router), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    params && refetch();
  }, [params]);
  if (isLoading) return <Loader />;
  return <div dangerouslySetInnerHTML={{ __html: Page?.content }} />;
};

export default PageCard;
