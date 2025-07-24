import RatingBox from "@/Components/Collection/CollectionSidebar/RatingBox";
import NoDataFound from "@/Components/Widgets/NoDataFound";
import CompareContext from "@/Context/CompareContext";
import SettingContext from "@/Context/SettingContext";
import { CompareSlider, compareSlider } from "@/Data/SliderSetting";
import Btn from "@/Elements/Buttons/Btn";
import { CompareAPI } from "@/Utils/AxiosUtils/API";
import { ModifyString } from "@/Utils/CustomFunctions/ModifyString";
import useDelete from "@/Utils/Hooks/useDelete";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import Slider from "react-slick";
import EmptyImage from "../../../../public/assets/images/svg/empty-items.svg";
import CompareAction from "./CompareAction";
import CompareWrapper from "./CompareWrapper";
import { RiCloseLine } from "react-icons/ri";

const CompareData = () => {
  const { setCompareState, compareState, refetch } = useContext(CompareContext);
  const { convertCurrency } = useContext(SettingContext);
  const { data, mutate: compareMutate, isLoading: compareLoading } = useDelete(CompareAPI, `/compare`);
  useEffect(() => {
    if (data?.status == 200 || data?.status == 201) {
      refetch();
    }
  }, [compareLoading]);
  const removeFromCompare = (productObj) => {
    compareMutate(productObj.id);
    setCompareState((prevState) => prevState.filter((elem) => elem.id !== productObj?.id));
  };
  let settings = compareSlider(compareState.length)

  return (
    <>
      {compareState?.length > 0 ? (
        <div className="slide-4 no-arrow compare-box">
          <Slider {...settings}>
            {compareState?.map((product, i) => (
              <div className="compare-part" key={i}>
                <Btn color="primary" onClick={() => removeFromCompare(product)} className="close-btn ">
                  <RiCloseLine />
                </Btn>
                <div className="img-section">
                  <div>{product.product_thumbnail.original_url && <Image src={product.product_thumbnail ? product.product_thumbnail.original_url : placeHolderImage} className="img-fluid" alt={product.name} height={156} width={156} />}</div>
                  <Link href={`/product/${product?.slug}`} legacyBehavior>
                    <h5 className="text-title">{product?.name}</h5>
                  </Link>
                </div>
                <CompareWrapper data={{ title: "discount", value: product?.discount ? product?.discount : "-" }} />
                <CompareWrapper data={{ title: "price", value: convertCurrency(product?.sale_price) }} />
                <CompareWrapper data={{ title: "availability", value: ModifyString(product?.stock_status) }} />
                <CompareWrapper data={{ title: "rating" }}>
                  <div className="compare-rating">
                    <RatingBox totalRating={product?.rating_count || 0} />
                    <span className="text-content rating-text">{`(${product?.rating_count?.toFixed(2) || 0} Rating)`}</span>
                  </div>
                </CompareWrapper>
                <CompareWrapper data={{ title: "Weight", value: product?.weight ? product?.weight : "-" }} />
                <CompareAction product={product} compareMutate={compareMutate} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <NoDataFound customClass="no-data-added" imageUrl={EmptyImage} title="no_item" description="no_compare_item_desc" height="230" width="270" />
      )}
    </>
  );
};

export default CompareData;
