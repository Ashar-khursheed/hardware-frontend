import NoDataFound from "@/Components/Widgets/NoDataFound";
import ProductBox from "@/Components/Widgets/ProductBox";
import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import { Col, Row } from "reactstrap";

const SearchedData = ({ data, searchParam }) => {
  return (
    <WrapperComponent classes={{ sectionClass: "section-b-space pt-0", fluidClass: "container" }} noRowCol={true}>
      {data?.length > 0 ? (
        <Row className="search-product g-sm-4 g-3">
          {data.map((product, i) => (
            <Col xl="3" md="4" xs="6" key={i}>
              <ProductBox product={product} style="vertical" />
            </Col>
          ))}
        </Row>
      ) : (
        <NoDataFound
          imageUrl={`/assets/svg/empty-items.svg`}
          customClass="collection-no-data no-data-added"
          title={searchParam ? "no_product" : "search_to_explore"}
          description={searchParam ? "no_product_desc" : "search_to_explore_desc"}
          height="300"
          width="300"
        />
      )}
    </WrapperComponent>
  );
};

export default SearchedData;
