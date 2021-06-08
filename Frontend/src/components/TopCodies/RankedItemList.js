import { React } from "react";
import "./RankedItemList.css";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

function RankedItemList({
  onChangeSelectedItem,
  rankedItem,
  toggleSaved,
  toggleLiked
}) {
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

  const topCodyList = rankedItem.map((element, index) => {
    let likeButton;
    if (element.isLiked === true) {
      likeButton = (
        <BsHeartFill
          className="top-codies-info-text"
          onClick={() => {
            toggleLiked(index);
          }}
          style={{ fontSize: "6vw", color: "#FF0000" }}
        />
      );
    } else {
      likeButton = (
        <BsHeart
          className="top-codies-info-text"
          onClick={() => {
            toggleLiked(index);
          }}
          style={{ fontSize: "6vw", color: "black" }}
        />
      );
    }

    let saveButton;
    if (element.isSaved === true) {
      saveButton = (
        <BsBookmarkFill
          style={{
            fontSize: "11vw",
            color: "#FFD400"
          }}
        />
      );
    } else {
      saveButton = (
        <BsBookmarkFill
          style={{
            fontSize: "11vw",
            color: "#53565A"
          }}
        />
      );
    }

    return (
      <div key={index} className="top-codies-item">
        <img
          className="top-codies-item-image"
          src={element.imageUrl}
          alt="top-cody-image"
        />
        <div
          className="cody-save-button"
          onClick={() => {
            openFolderListSlide(element, index);
          }}
        >
          {saveButton}
        </div>
        <div
          className="top-codies-info-container"
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div className="top-codies-like-button">
            {likeButton}
            <p
              className="top-codies-info-text"
              style={{
                marginLeft: "2vw"
              }}
            >
              {element.likeCnt}
            </p>
          </div>
          <p className="top-codies-info-text">조회수 : {element.viewCnt}</p>
        </div>
      </div>
    );
  });

  return <div className="top-codies-list">{topCodyList}</div>;
}

export default RankedItemList;
