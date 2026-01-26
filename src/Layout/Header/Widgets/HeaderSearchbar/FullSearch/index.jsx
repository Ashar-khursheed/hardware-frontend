import React, { useContext, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Input } from "reactstrap";
import { RiSearchLine } from "react-icons/ri";
import { useTypewriter } from "react-simple-typewriter";

import Btn from "@/Elements/Buttons/Btn";
import request from "@/Utils/AxiosUtils";
import { ProductAPI, CategoryAPI } from "@/Utils/AxiosUtils/API";
import useOutsideDropdown from "@/Utils/Hooks/useOutsideDropdown";
import SearchDropDown from "./SearchDropdown";

const FullSearch = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  
  // Custom hook for dropdown visibility
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // Sync state with URL search param
  useEffect(() => {
    const querySearch = searchParams.get("search");
    if(querySearch) {
        setSearchValue(querySearch);
        setDebouncedSearchValue(querySearch);
    }
  }, [searchParams]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [searchValue]);

  // Fetch Products based on debounced search
  const { data: searchData, isLoading: searchLoading, refetch: searchRefetch } = useQuery(
    ["productSearch", debouncedSearchValue],
    () => request({ 
        url: ProductAPI, 
        params: { search: debouncedSearchValue, paginate: 12, status: 1 } 
    }),
    {
      enabled: !!debouncedSearchValue && isComponentVisible,
      refetchOnWindowFocus: false,
      select: (res) => res?.data?.data,
    }
  );

  // Fetch Categories based on debounced search (Optional, if we still want category suggestions)
  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    ["categorySearch", debouncedSearchValue],
    () => request({ 
        url: CategoryAPI, 
        params: { search: debouncedSearchValue, status: 1, paginate: 4 } 
    }),
    {
       enabled: !!debouncedSearchValue && isComponentVisible,
       refetchOnWindowFocus: false,
       select: (res) => res?.data?.data,
    }
  );

  const onChangeHandle = (e) => {
    // Sanitize input: replace non-breaking hyphen (\u2011) with standard hyphen (-)
    const sanitizedText = e.target.value.replace(/\u2011/g, "-");
    setSearchValue(sanitizedText);
    setIsComponentVisible(true);
    setSelectedItemIndex(null);
  };

  const onHandleSearch = (e) => {
      e?.preventDefault();
      if (searchValue) {
          router.push(`/search?search=${searchValue}`);
          setIsComponentVisible(false);
      }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (selectedItemIndex !== null && searchData && searchData[selectedItemIndex]) {
            const selectedItem = searchData[selectedItemIndex];
            router.push(`/product/${selectedItem.slug}`);
            setIsComponentVisible(false);
        } else {
            onHandleSearch();
        }
    }
  };

    const handleArrowKey = (direction) => {
        if (searchData?.length > 0) {
            let newIndex = selectedItemIndex === null ? 0 : selectedItemIndex + direction;
            if (newIndex < 0) {
                newIndex = searchData.length - 1;
            } else if (newIndex >= searchData.length) {
                newIndex = 0;
            }
            // Auto-scroll logic if needed
            const selectedItemElement = document.getElementById(`searchItem_${newIndex}`);
            if (selectedItemElement) {
                selectedItemElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            // Optional: Update input value on selection? Usually better to just highlight.
            // setSearchValue(searchData[newIndex]?.name); 
            setSelectedItemIndex(newIndex);
        }
    };


  const [text] = useTypewriter({
    words: ["Search for products, brands and more..."],
    loop: 0,
    deleteSpeed: 50,
    typeSpeed: 100
  });

  return (
    <form className="form_search" onSubmit={onHandleSearch} ref={ref}>
      <Input
        className="nav-search nav-search-field"
        onClick={() => setIsComponentVisible(true)}
        type="search"
        placeholder={text}
        value={searchValue}
        onChange={onChangeHandle}
         onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                handleArrowKey(1);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                handleArrowKey(-1);
            } else if (e.key === "Enter") {
                handleEnterKey(e);
            }
        }}
      />
      <Btn 
        color="transparent" 
        type="submit" 
        name="nav-submit-button" 
        className="btn-search"
      >
        <RiSearchLine />
      </Btn>

      {isComponentVisible && searchValue && (
         <SearchDropDown 
            searchValue={searchValue}
            searchArr={searchData || []} 
            categoryData={categoryData || []}
            categoryLoading={categoryLoading || searchLoading}
            selectedItemIndex={selectedItemIndex}
            closeSearch={() => setIsComponentVisible(false)}
         />
      )}
    </form>
  );
};

export default FullSearch;
