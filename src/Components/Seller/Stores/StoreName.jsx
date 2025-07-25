import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RiArrowRightLine } from "react-icons/ri";
import SellerRatingBox from "./SellerRatingBox";
import StoreImage from "./StoreImage";

const StoreName = ({ elem, classicImage }) => {
  const { t } = useTranslation("common");
  return (
    <div className="contain-name">
      <div>
        <div className="since-number">
          <div className="rating">
            <SellerRatingBox ratingCount={elem?.rating_count} />
            <h6>{`(${elem?.reviews_count} Review)`}</h6>
          </div>
        </div>
      </div>
      <h3>{elem?.store_name}</h3>
      {classicImage && (
        <Link
          href={`/seller/stores/${elem?.slug}`}
          legacyBehavior
        >
          <a className="btn btn-sm theme-bg-color text-white fw-bold d-inline-flex">
            {t("visit_store")}
            <RiArrowRightLine className="ms-2" />
          </a>
        </Link>

      )}
      {!classicImage && (
        <Link href={`/seller/store/${elem?.slug}`} legacyBehavior>
          <a className="product-label">
            {elem?.products_count} {t("products")}
          </a>
        </Link>

      )}
      {classicImage && <StoreImage customClass={"grid-image"} elem={elem} />}
    </div>
  );
};

export default StoreName;
