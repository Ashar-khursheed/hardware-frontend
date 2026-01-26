import ListProductBox from "@/Components/Collection/MainCollection/ListProductBox";
import NoDataFound from "@/Components/Widgets/NoDataFound";
import ProductSkeleton from "@/Components/Widgets/SkeletonLoader/ProductSkeleton";
import Btn from "@/Elements/Buttons/Btn";
import request from "@/Utils/AxiosUtils";
import { CategoryAPI, ProductAPI } from "@/Utils/AxiosUtils/API";
import { ImagePath } from "@/Utils/Constants";
import useOutsideDropdown from "@/Utils/Hooks/useOutsideDropdown";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";
import { useTypewriter } from "react-simple-typewriter";
import { Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const IconSearchModal = ({ setIsOpen, isOpen }) => {
  const { t } = useTranslation("common");
  const [searchValue, setSearchValue] = useState("");
  const [searchArr, setSearchArray] = useState([]);
  const [paginate, setPaginate] = useState(4);
  const pathName = usePathname();
  const [categorySearch, setCategorySearch] = useState(false);
  const [categoryCustomSearch, setCategoryCustomSearch] = useState("");
  const [categoryTc, setCategoryTc] = useState(null);
  const [productCustomSearch, setProductCustomSearch] = useState("");
  const [productTc, setProductTc] = useState(null);
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
  const router = useRouter();
  const { data, isLoading: productLoading, fetchStatus } = useQuery(
    [ProductAPI, "Search", productCustomSearch], 
    () => request({ 
        url: ProductAPI, 
        params: { 
            status: 1, 
            search: productCustomSearch ? productCustomSearch : null, 
            paginate: 12 
        } 
    }), 
    { 
        enabled: true, 
        refetchOnWindowFocus: false, 
        keepPreviousData: true, 
        select: (data) => data.data.data 
    }
  );

  const { data: categoryData, isLoading: categoryIsLoading, fetchStatus: categoryFetchStatus } = useQuery(
    ["CategoryAPIMinimalSearch", categoryCustomSearch], 
    () => request({ 
        url: CategoryAPI, 
        params: { 
            status: 1, 
            paginate: 12, 
            search: categoryCustomSearch ? categoryCustomSearch : null 
        } 
    }), 
    { 
        enabled: isOpen, 
        refetchOnWindowFocus: false, 
        keepPreviousData: true, 
        select: (data) => data.data.data 
    }
  );

  const [text] = useTypewriter({
    words: ["Search with brand and category..."],
    deleteSpeed: 120,
    loop: 0,
  });

  useEffect(() => {
    // Ensure we handle data properly, even if empty
    if (data) {
      setSearchArray(data);
    }
  }, [data]);

  // Added debouncing
  useEffect(() => {
    if (categoryTc) clearTimeout(categoryTc);
    setCategoryTc(setTimeout(() => setCategoryCustomSearch(searchValue), 500));

    if (productTc) clearTimeout(productTc);
    setProductTc(setTimeout(() => setProductCustomSearch(searchValue), 500));
  }, [searchValue]);

  // Manual refetching effect removed as it's now handled by the query key key change

  const onChangeHandle = (text) => {
    // Sanitize input: replace non-breaking hyphen (\u2011) with standard hyphen (-)
    const sanitizedText = text.replace(/\u2011/g, "-");
    setSearchValue(sanitizedText);
    setIsComponentVisible(true);
  };

  return (
    <Modal centered className="search-modal theme-modal-2" size="xl" isOpen={isOpen} toggle={() => setIsOpen(false)}>
      <ModalHeader tag={"div"}>
        <h3>{t("search_in_store")}</h3>
        <Btn className="btn-close" onClick={() => setIsOpen(false)}>
          <RiCloseLine />
        </Btn>
      </ModalHeader>
      <ModalBody>
        <div className="search-box">
          <Input type="text" autoFocus placeholder={text + "|"} onChange={(e) => onChangeHandle(e.target.value)} value={searchValue} />
          <RiSearchLine />
        </div>
        <div className="search-category-box">
          <ul className="search-category-skeleton">
            {categoryData?.length > 0 || categoryFetchStatus == "fetching" ? <li className="text-secondary">{t("top_search")}</li> : null}
            {!categoryData && categoryFetchStatus == "fetching" ? new Array(4).fill(null).map((_, i) => <li className="skeleton-loader" key={i} />) : categoryData?.slice(0, 4)?.map((item, i) => <li key={i}>{item?.name}</li>)}
          </ul>
        </div>
        <div className="mt-sm-4 mt-3">
          <h3 className="search-title">{t("most_searched")}</h3>
          {!searchArr && fetchStatus == "fetching" ? (
            <Row className="row row-cols-xl-4 row-cols-md-3 row-cols-2 g-sm-4 g-3 row-empty-cls">
              {new Array(3).fill(null).map((_, i) => (
                <Col key={i}>
                  <ProductSkeleton />
                </Col>
              ))}
              <ProductSkeleton />
            </Row>
          ) : searchArr?.length > 0 ? (
            <Row className="row row-cols-xl-4 row-cols-md-3 row-cols-2 g-sm-4 g-3 row-empty-cls">
              {searchArr?.slice(0, 12)?.map((item, i) => (
                <Col key={i}>
                  <ListProductBox product={item} productBox={2} isOpen={isOpen} closeSearch={() => setIsOpen(false)} />
                  {/* <ProductBox style="vertical" product={item} /> */}
                </Col>
              ))}
            </Row>
          ) : (
            <NoDataFound height={345} width={345} imageUrl={`/assets/svg/empty-items.svg`} customClass={"collection-no-data no-data-added"} description={"no_product_desc"} title={"no_product"} />
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default IconSearchModal;
