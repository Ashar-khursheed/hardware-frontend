import AccountContext from "@/Context/AccountContext";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import EmailPasswordModal from "./EmailPasswordModal";

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
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none"
            onClick={(e) => { e.preventDefault(); setModal("email"); }}
          >
            {t("edit")}
          </button>
        </div>
        <div className="col-sm-6">
          <h6>
            {t("password")} : {"●".repeat(6)}
          </h6>
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none"
            onClick={(e) => { e.preventDefault(); setModal("password"); }}
          >
            {t("edit")}
          </button>
        </div>
      </div>
      <EmailPasswordModal modal={modal} setModal={setModal} />
    </>
  );
};

export default EmailPassword;
