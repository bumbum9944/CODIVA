import { React } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";

function CodyModalInfo({ item, itemId, toggleLiked }) {
  function handleToggleSaved() {
    toggleLiked(itemId);
  }

  let likeButton;
  if (item.isLiked === true) {
    likeButton = (
      <BsHeartFill
        onClick={handleToggleSaved}
        style={{ fontSize: "4vh", color: "#FF0000" }}
      />
    );
  } else {
    likeButton = (
      <BsHeart
        onClick={handleToggleSaved}
        style={{ fontSize: "4vh", color: "#FFFFFF" }}
      />
    );
  }

  return (
    <div
      className="cody-modal-info-container"
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        {likeButton}
        <p style={{ color: "white", marginLeft: "2vw" }}>{item.likeCnt}</p>
      </div>
      <p style={{ color: "white" }}>조회수 : {item.viewCnt}</p>
    </div>
  );
}

export default CodyModalInfo;
