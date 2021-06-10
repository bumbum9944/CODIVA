import { React } from "react";
import "./CodyModal.css";
import CodyModalInfo from "./CodyModalInfo";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

function CodyModal({ targetIndex, item, toggleLiked }) {
  function closeModal() {
    document.querySelector("body").classList.remove("no-scroll");
    document.querySelector(`#modal-${targetIndex}`).classList.add("hidden");
  }

  return (
    <div id={`modal-${targetIndex}`} className="modal hidden">
      <div className="modal-overlay" onClick={closeModal}></div>
      <Button
        className="modal-close-button"
        style={{ position: "absolute", right: "5vw", top: "10vh" }}
        onClick={closeModal}
      >
        <CloseIcon style={{ fontSize: "9vw", color: "white" }} />
      </Button>
      <div className="modal-content">
        <img
          className="modal-card-image"
          src={item.imageUrl}
          alt="cody-image"
        />
        <CodyModalInfo
          item={item}
          targetIndex={targetIndex}
          toggleLiked={toggleLiked}
        />
      </div>
    </div>
  );
}

export default CodyModal;
