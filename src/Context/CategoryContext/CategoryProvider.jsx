import React from 'react';
import { CategoryAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';
import CategoryContext from '.';
import { useRouter } from 'next/navigation';

const CategoryProvider = (props) => {
  const router = useRouter();
  const { data: categoryData, isLoading: categoryIsLoading } = useQuery(
    [CategoryAPI],
    () => request({ url: CategoryAPI, params: { status: 1 } }, router),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      staleTime: 0,
      cacheTime: 5 * 60 * 1000,
      refetchOnMount: true,
      select: (data) => data.data.data,
    }
  );

  const filterCategory = (value) => {
    return categoryData?.filter((elem) => elem.type === value) || [];
  };

  return (
    <CategoryContext.Provider
      value={{
        ...props,
        categoryAPIData: { data: categoryData || [] },
        filterCategory,
        categoryIsLoading,
        categoryData,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
