import React from "react";
import "./CodyCard.css";
import CodyModalInfo from "./CodyModalInfo";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

function CodyCard({ item, itemId, toggleSaved, toggleLiked, viewCntIncrease }) {
  let saveButton;
  if (item.isSaved === true) {
    saveButton = (
      <BsBookmarkFill
        style={{
          fontSize: "4vh",
          color: "#FFD400"
        }}
      />
    );
  } else {
    saveButton = (
      <BsBookmark
        style={{
          fontSize: "4vh",
          color: "#FFFFFF"
        }}
      />
    );
  }

  function handleToggleSaved() {
    toggleSaved(itemId);
  }

  function openModal() {
    document.querySelector("body").classList.add("no-scroll");
    document.querySelector(`#modal-${itemId}`).classList.remove("hidden");
  }

  function closeModal() {
    document.querySelector("body").classList.remove("no-scroll");
    document.querySelector(`#modal-${itemId}`).classList.add("hidden");
  }

  return (
    <div className="cody-card-container">
      <img
        className="cody-card-image"
        src={item.imageUrl}
        onClick={() => {
          viewCntIncrease(itemId);
          openModal();
        }}
        alt="cody-image"
      />
      <div
        className="cody-save-button"
        style={{
          position: "absolute",
          right: "1vw",
          top: "0"
        }}
        onClick={handleToggleSaved}
      >
        {saveButton}
      </div>
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
          <img
            className="modal-card-image"
            src={item.imageUrl}
            alt="cody-image"
          />
          <CodyModalInfo
            item={item}
            itemId={itemId}
            toggleLiked={toggleLiked}
          />
        </div>
      </div>
    </div>
  );
}

export default CodyCard;
