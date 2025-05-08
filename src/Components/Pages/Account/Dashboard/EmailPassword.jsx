import AccountContext from "@/Context/AccountContext";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import EmailPasswordModal from "./EmailPasswordModal";
import { Href } from "@/Utils/Constants";

const EmailPassword = () => {
  const { accountData } = useContext(AccountContext);
  const [modal, setModal] = useState("");
  const { t } = useTranslation("common");
  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <h6>
            {t("email")} : {accountData?.email}
          </h6>
          <a href={Href} onClick={() => setModal("email")}>
            {t("edit")}
          </a>
        </div>
        <div className="col-sm-6">
          <h6>
            {t("password")} : {"●".repeat(6)}
          </h6>
          <a href={Href} onClick={() => setModal("password")}>
            {t("edit")}
          </a>
        </div>
      </div>
      <EmailPasswordModal modal={modal} setModal={setModal} />
    </>
  );
};

export default EmailPassword;
