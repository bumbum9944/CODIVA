import { React } from "react";
import "./CodyModal.css";
import CodyModalInfo from "./CodyModalInfo";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

function CodyModal({ itemId, item, toggleLiked }) {
  function closeModal() {
    document.querySelector("body").classList.remove("no-scroll");
    document.querySelector(`#modal-${itemId}`).classList.add("hidden");
  }

  return (
    <div id={`modal-${itemId}`} className="modal hidden">
      <div className="modal-overlay" onClick={closeModal}></div>
      <Button
        className="modal-close-button"
        style={{ position: "absolute", right: "5vw", top: "10vh" }}
        onClick={closeModal}
      >
        <CloseIcon style={{ fontSize: "4vh", color: "white" }} />
      </Button>
      <div className="modal-content">
        <img className="modal-card-image" src={item.imageUrl} alt="cody" />
        <CodyModalInfo item={item} itemId={itemId} toggleLiked={toggleLiked} />
      </div>
    </div>
  );
}

export default CodyModal;
