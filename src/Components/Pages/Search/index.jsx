"use client";
import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import Btn from "@/Elements/Buttons/Btn";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiSearchLine } from "react-icons/ri";
import { Container, Input, InputGroup } from "reactstrap";
import SearchedData from "./SearchedData";

const SearchModule = () => {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const [searchState, setSearchState] = useState(searchParam);
  const router = useRouter();

  // Sync state with URL when URL changes
  useEffect(() => {
    setSearchState(searchParam);
  }, [searchParam]);

  const { data, isLoading, refetch } = useQuery(
    [ProductAPI, "search", searchParam],
    () => request({ url: ProductAPI, params: { search: searchParam, paginate: 12, status: 1 } }),
    {
      enabled: true, // Auto-fetch when component mounts or param changes
      refetchOnWindowFocus: false,
      select: (data) => data?.data?.data,
    }
  );

  const onChangeHandler = (e) => {
    setSearchState(e.target.value);
  };

  const onSearchBtnClick = (e) => {
    if (e) e.preventDefault();
    const sanitizedSearch = searchState.trim().replace(/\u2011/g, "-");
    router.push(`/search?search=${sanitizedSearch}`);
  };

  return (
    <>
      <Breadcrumbs title={"Search"} subNavigation={[{ name: "Search" }]} />
      <section className="authentication-page">
        <Container>
          <div className="row">
            <WrapperComponent classes={{ sectionClass: "search-block", fluidClass: "container", col: "offset-lg-3" }} colProps={{ lg: "6" }}>
              <form className="form-header form-box" onSubmit={onSearchBtnClick}>
                <InputGroup>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder={t("search_product")}
                    value={searchState}
                    onChange={onChangeHandler}
                  />
                  <Btn className="btn-solid" type="submit">
                    <RiSearchLine />
                    {"  "} {t("search")}
                  </Btn>
                </InputGroup>
              </form>
            </WrapperComponent>
          </div>
        </Container>
      </section>

      {isLoading ? (
        <div className="section-b-space">
          <Loader />
        </div>
      ) : (
        <SearchedData data={data} searchParam={searchParam} />
      )}
    </>
  );
};

export default SearchModule;
