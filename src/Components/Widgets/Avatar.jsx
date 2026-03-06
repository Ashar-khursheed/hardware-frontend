import { getImageUrl } from "@/Utils/CustomFunctions/GetImageUrl";

const Avatar = ({ data, placeHolder, name, customeClass, customImageClass, height, width }) => {
  const imageUrl = getImageUrl(data);
  return (
    <>
      {data ? (
        <div>
          <img
            loading="lazy"
            className={customeClass ? customeClass : ""}
            src={imageUrl}
            height={height || 50}
            width={width || 50}
            alt={name?.name || name || ""}
          />
        </div>
      ) : placeHolder ? (
        <div className={`${customeClass ? customeClass : ""}`}>
          <img
            loading="lazy"
            className={customImageClass ? customImageClass : ""}
            src={placeHolder}
            height={height || 50}
            width={width || 50}
            alt={name?.name || name || ""}
          />
        </div>
      ) : (
        <h4 className="user-name">
          {name?.name?.charAt(0).toString().toUpperCase() ||
            name?.charAt(0).toString().toUpperCase()}
        </h4>
      )}
    </>
  );
};

export default Avatar;
