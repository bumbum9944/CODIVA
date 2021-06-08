import React from "react";
import "./CodyCard.css";
import CodyModal from "../common/Cody/CodyModal";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

function CodyCard({ item, itemId, toggleSaved, toggleLiked, viewCntIncrease, onChangeSelectedItem }) {

  function openFolderListSlide(item, index) {
    if (item.isSaved) {
      toggleSaved(index);
    } else {
      onChangeSelectedItem(index);
      document.querySelector("body").classList.add("no-scroll2");
      document
        .querySelector(".folder-list-slide-container")
        .classList.add("on");
      let div = document.createElement("div");
      div.id = "dimmed2";
      document.querySelector(".App").append(div);
      document
        .querySelector("#dimmed2")
        .addEventListener("scroll touchmove touchend mousewheel", function (e) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        });
    }
  }

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
        onClick={()=>{
          openFolderListSlide(item, itemId);
        }}
      >
        {saveButton}
      </div>
      <CodyModal itemId={itemId} item={item} toggleLiked={toggleLiked} />
    </div>
  );
}

export default CodyCard;
