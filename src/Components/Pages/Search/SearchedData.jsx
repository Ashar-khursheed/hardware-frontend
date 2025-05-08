import NoDataFound from "@/Components/Widgets/NoDataFound";
import ProductBox from "@/Components/Widgets/ProductBox";
import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import { ImagePath } from "@/Utils/Constants";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

const SearchedData = ({ data }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const {
    data: productData,
    refetch,
    isLoading,
  } = useQuery([ProductAPI, "search"], () => request({ url: ProductAPI }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  const [mainProducts, setMainProducts] = useState([]);
  const param = useSearchParams();
  const searchParam = param.get("search");
  useEffect(() => {
    if (searchParam) {
      setMainProducts(data);
    } else {
      setMainProducts(productData?.slice(0, 12));
    }
  }, [searchParam, data]);

  return (
    <WrapperComponent classes={{ sectionClass: "section-b-space", fluidClass: "container" }} noRowCol={true}>
      {data?.length > 0 ? (
        <Row className="search-product">
          {mainProducts?.map((product, i) => (
            <Col xl="3" md="2" xs="6" key={i}>
              <ProductBox product={product} style="vertical" />
            </Col>
          ))}
        </Row>
      ) : (
        <NoDataFound imageUrl={`/assets/svg/empty-items.svg`} customClass="collection-no-data no-data-added" title="no_product" description="no_product_desc" height="300" width="300" u />
      )}
    </WrapperComponent>
  );
};

export default SearchedData;
