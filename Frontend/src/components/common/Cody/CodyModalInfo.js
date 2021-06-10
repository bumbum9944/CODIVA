import { React, useContext } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import UserContext from "contexts/user";

function CodyModalInfo({ item, targetIndex, toggleLiked }) {
  const { state } = useContext(UserContext);
  const { user } = state;

  function handleToggleliked() {
    toggleLiked(item.id, targetIndex);
  }

  let likeButton;
  if (item.isLiked === true) {
    likeButton = <BsHeartFill style={{ fontSize: "4vh", color: "#FF0000" }} />;
  } else {
    likeButton = <BsHeart style={{ fontSize: "4vh", color: "#FFFFFF" }} />;
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
        <div
          onClick={() => {
            if (!user) {
              // modal창
              document.querySelector("#login-modal").click();
            } else {
              handleToggleliked();
            }
          }}
        >
          {likeButton}
        </div>
        <p style={{ color: "white", marginLeft: "2vw", fontSize: "5vw" }}>
          {item.likeCnt}
        </p>
      </div>
      <p style={{ color: "white", fontSize: "5vw" }}>조회수 : {item.viewCnt}</p>
    </div>
  );
}

export default CodyModalInfo;
