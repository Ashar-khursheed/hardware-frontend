import request from "@/Utils/AxiosUtils";
import { OrderAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import DetailStatus from "./DetailStatus";
import DetailTitle from "./DetailTitle";
import DetailsTable from "./DetailsTable";
import DetailsConsumer from "./DetailsConsumer";
import SubOrdersTable from "./SubOrdersTable";
import Loader from "@/Layout/Loader";

const Details = ({ params }) => {
  const { data, isLoading, refetch, error } = useQuery(["order", params], async () => {
    const res = await request({ url: `${OrderAPI}/${params}` });
    if (res?.response?.status >= 400 || res?.status >= 400) {
      throw new Error(res?.response?.data?.message || res?.message || 'Failed to fetch order details');
    }
    return res;
  }, {
    enabled: !!(params),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
    select: (res) => res?.data,
  });


  if (isLoading)
    return (
      <div className="box-loader">
        <Loader classes={"blur-bg"} />
      </div>
    );
  return (
    <>
      <DetailTitle params={params} data={data} />
      <DetailStatus data={data} />
      <DetailsTable data={data} />
      <DetailsConsumer data={data} />
      {data?.sub_orders?.length ? <SubOrdersTable data={data?.sub_orders} /> : null}
    </>
  );
};

export default Details;
