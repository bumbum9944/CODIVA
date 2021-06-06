import React from "react";
import "./CodyCard.css";
import CodyModal from "../common/Cody/CodyModal";
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
      <CodyModal itemId={itemId} item={item} toggleLiked={toggleLiked} />
    </div>
  );
}

export default CodyCard;
