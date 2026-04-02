import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from "react-icons/ri";

const AccountHeading = ({ title, classes }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <div className={`hbx-sub-heading-wrap ${classes ? classes : ""}`}>
      <div className="hbx-back-btn d-md-none" onClick={() => router.back()}>
        <RiArrowLeftLine />
      </div>
      <h3>{t(title)}</h3>
    </div>
  );
};

export default AccountHeading;
