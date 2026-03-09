import React from "react";

const Loader = ({ classes }) => {
  return (
    <div className={`loader-wrapper ${classes ? classes : ""}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
