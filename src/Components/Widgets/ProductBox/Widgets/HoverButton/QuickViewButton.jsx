import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import VariationModal from "../VariationModal";

const QuickViewButton = ({ productstate, hideAction, className }) => {
  const [variationModal, setVariationModal] = useState("");
  return (
    <>
      {!hideAction?.includes("view") && (
        <li className={className ? className : ""} title="View" onClick={() => setVariationModal(productstate?.id)}>
          <a>
            <i className="ri-search-line" />
          </a>
        </li>
      )}
      <VariationModal setVariationModal={setVariationModal} variationModal={variationModal} productObj={productstate} />
    </>
  );
};

export default QuickViewButton;
