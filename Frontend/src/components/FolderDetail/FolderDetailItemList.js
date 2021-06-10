import "./FolderDetailItemList.css";
import { React } from "react";
import CodyModal from "../common/Cody/CodyModal";
import { FaCheckCircle } from "react-icons/fa";

function FolderDetailItemList({
  items,
  toggleLiked,
  mode,
  selectedItem,
  onChangeSelectedItem
}) {
  function openModal(targetId) {
    document.querySelector("body").classList.add("no-scroll");
    document.querySelector(`#modal-${targetId}`).classList.remove("hidden");
  }

  const itemList = items.map((element, index) => {
    const imageUrl = element.imageUrl;
    let innerItem;
    if (mode === "edit") {
      let checkButton;
      if (selectedItem.has(index)) {
        checkButton = (
          <FaCheckCircle
            style={{
              position: "absolute",
              top: "1vw",
              right: "1vw",
              color: "#87CEEB",
              fontSize: "6vw"
            }}
          />
        );
      } else {
        checkButton = (
          <FaCheckCircle
            style={{
              position: "absolute",
              top: "1vw",
              right: "1vw",
              color: "#808080",
              fontSize: "6vw"
            }}
          />
        );
      }

      innerItem = (
        <div
          key={index}
          className="folder-detail-item"
          style={{
            position: "relative"
          }}
          onClick={() => {
            onChangeSelectedItem(index);
          }}
        >
          <img
            className="folder-detail-image"
            src={imageUrl}
            alt="folder-detail"
          />
          {checkButton}
        </div>
      );
    } else {
      innerItem = (
        <div key={index} className="folder-detail-item">
          <img
            className="folder-detail-image"
            src={imageUrl}
            alt="folder-detail"
            onClick={() => {
              openModal(index);
            }}
          />
          <CodyModal
            item={element}
            targetIndex={index}
            toggleLiked={toggleLiked}
          />
        </div>
      );
    }
    return innerItem;
  });

  return <div className="folder-detail-list-container">{itemList}</div>;
}

export default FolderDetailItemList;
