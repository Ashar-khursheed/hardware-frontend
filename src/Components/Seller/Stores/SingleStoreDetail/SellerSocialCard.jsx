import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RiFacebookFill, RiInstagramLine, RiPinterestFill, RiTwitterFill, RiYoutubeFill } from "react-icons/ri";

const SellerSocialCard = ({ StoreData }) => {
  const { t } = useTranslation("common");
  return (
    <div className="vendor-share">
      <h6>{t("follow_us")} :</h6>
      <div className="footer-social">
        <ul>
  {StoreData?.facebook && (
    <li>
      <a href={String(StoreData?.facebook)} target="_blank" rel="noopener noreferrer">
        <RiFacebookFill />
      </a>
    </li>
  )}
  {StoreData?.twitter && (
    <li>
      <a href={String(StoreData?.twitter)} target="_blank" rel="noopener noreferrer">
        <RiTwitterFill />
      </a>
    </li>
  )}
  {StoreData?.instagram && (
    <li>
      <a href={String(StoreData?.instagram)} target="_blank" rel="noopener noreferrer">
        <RiInstagramLine />
      </a>
    </li>
  )}
  {StoreData?.youtube && (
    <li>
      <a href={String(StoreData?.youtube)} target="_blank" rel="noopener noreferrer">
        <RiYoutubeFill />
      </a>
    </li>
  )}
  {StoreData?.pinterest && (
    <li>
      <a href={String(StoreData?.pinterest)} target="_blank" rel="noopener noreferrer">
        <RiPinterestFill />
      </a>
    </li>
  )}
</ul>

      </div>
    </div>
  );
};

export default SellerSocialCard;
