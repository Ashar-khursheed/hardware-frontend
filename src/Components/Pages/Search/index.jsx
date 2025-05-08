"use client";
import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import Btn from "@/Elements/Buttons/Btn";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiSearchLine } from "react-icons/ri";
import { Container, Input, InputGroup } from "reactstrap";
import SearchedData from "./SearchedData";

const SearchModule = () => {
  const { t } = useTranslation("common");
  const [search] = useCustomSearchParams(["search"]);
  const [searchState, setSearchState] = useState("");
  const router = useRouter();
  const { data, refetch, isLoading } = useQuery([ProductAPI, "search"], () => request({ url: ProductAPI, params: { search: search?.search ?? searchState, paginate: 12, status: 1 } }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  useEffect(() => {
    refetch();
    setSearchState(search?.search);
  }, [search]);
  useEffect(() => {
    searchState && refetch();
  }, []);
  const onHandleSearch = (e) => {
    router.push(`/search?search=${e.target.value}`);
    setSearchState(e.target.value);
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumbs title={"Search"} subNavigation={[{ name: "Search" }]} />
      <section className="authentication-page">
        <Container>
          <div className="row">
            <WrapperComponent classes={{ sectionClass: "search-block", fluidClass: "container", col: "offset-lg-3" }} colProps={{ lg: "6" }}>
              <form className="form-header form-box">
                <InputGroup>
                  <Input type="text" className="form-control" placeholder={t("search_product")} value={searchState} onChange={(e) => onHandleSearch(e)} />
                  <Btn className="btn-solid" onClick={onHandleSearch}>
                    <RiSearchLine />
                    {"  "} {t("search")}
                  </Btn>
                </InputGroup>
              </form>
            </WrapperComponent>
          </div>
        </Container>
      </section>

      <SearchedData data={data} />
    </>
  );
};

export default SearchModule;
