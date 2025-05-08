import Btn from "@/Elements/Buttons/Btn";
import { useTranslation } from "react-i18next";
import { RiQuestionLine } from "react-icons/ri";
import CustomModal from "./CustomModal";

const ConfirmationModal = ({ modal, setModal, isLoading, confirmFunction }) => {
  const { t } = useTranslation("common");
  return (
    <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: "theme-modal-2 delete-modal", modalHeaderClass: "p-0" }}>
      <div className="icon-box">
        <RiQuestionLine />
      </div>
      <h5 className="modal-title">{t("confirmation")}</h5>
      <p>{t("are_you_sure_you_want_to_proceed")} </p>
      <div className="button-box">
        <Btn className="btn-md btn-outline fw-bold" onClick={() => setModal("")}>
          {t("no")}
        </Btn>
        <Btn className="btn-solid" loading={Number(isLoading)} onClick={confirmFunction}>
          {t("yes")}
        </Btn>
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;
