import { React } from "react";
import Button from "@material-ui/core/Button";
import "./CodyDeleteModal.css";

function CodyDeleteModal({ deleteItems, setSelectedItem, setMode }) {
  function closeModal() {
    document.querySelector("body").classList.remove("no-scroll");
    document.querySelector(".cody-delete-modal").classList.add("hidden");
  }

  return (
    <div className="cody-delete-modal hidden">
      <div className="cody-delete-modal-overlay"></div>
      <div className="cody-delete-modal-content">
        <div className="cody-delete-modal-text">
          선택한 코디를 삭제하시겠어요?
        </div>
        <div className="cody-delete-modal-button">
          <Button
            variant="contained"
            className="delete-button"
            style={{
              width: "15vw",
              fontSize: "5w",
              marginRight: "10%"
            }}
            onClick={() => {
              closeModal();
              deleteItems();
            }}
          >
            OK
          </Button>
          <Button
            variant="contained"
            className="delete-button"
            onClick={() => {
              closeModal();
              setSelectedItem(new Set([]));
              setMode("");
            }}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CodyDeleteModal;
