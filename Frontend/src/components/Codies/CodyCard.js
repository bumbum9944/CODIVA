import { React, useContext } from "react";
import "./CodyCard.css";
import CodyModal from "../common/Cody/CodyModal";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import UserContext from "contexts/user";

function CodyCard({
  item,
  targetIndex,
  toggleSaved,
  toggleLiked,
  viewCntIncrease,
  setSelectedItem
}) {
  const { state } = useContext(UserContext);
  const { user } = state;

  function openDeleteToast() {
    document.querySelector("#delete").classList.add("reveal");
    setTimeout(() => {
      document.querySelector("#delete").classList.remove("reveal");
    }, 2000);
  }

  function openFolderListSlide(item, index) {
    if (item.isSaved) {
      toggleSaved({ index: index, id: item.id });
      openDeleteToast();
    } else {
      setSelectedItem({ index: index, id: item.id });
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
          color: "black"
        }}
      />
    );
  }

  function openModal() {
    document.querySelector("body").classList.add("no-scroll");
    document.querySelector(`#modal-${targetIndex}`).classList.remove("hidden");
  }

  return (
    <div className="cody-card-container">
      <img
        className="cody-card-image"
        src={item.imageUrl}
        onClick={() => {
          viewCntIncrease({ index: targetIndex, id: item.id });
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
        onClick={() => {
          if (!user) {
            // modal창
            document.querySelector("#login-modal").click();
          } else {
            openFolderListSlide(item, targetIndex);
          }
        }}
      >
        {saveButton}
      </div>
      <CodyModal
        targetIndex={targetIndex}
        item={item}
        toggleLiked={toggleLiked}
      />
    </div>
  );
}

export default CodyCard;
