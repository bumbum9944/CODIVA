import "./FolderDetailItemList.css";
import { React } from "react";
import CodyModal from "../common/Cody/CodyModal";

function FolderDetailItemList({ items, folderId, toggleLiked }) {
  function openModal(targetId) {
    document.querySelector("body").classList.add("no-scroll");
    document.querySelector(`#modal-${targetId}`).classList.remove("hidden");
  }

  const itemList = items.map((element, index) => {
    const imageUrl = element.imageUrl;
    return (
      <div key={index} className="folder-detail-item">
        <img
          className="folder-detail-image"
          src={imageUrl}
          alt="folder-detail-image"
          onClick={() => {
            openModal(index);
          }}
        />
        {/* <div className="folder-detail-info">
          <p className="folder-detail-text" >{folderName}</p>
          <p className="folder-detail-text">{itemCnt} items</p>
        </div> */}
        <CodyModal item={element} itemId={index} toggleLiked={toggleLiked} />
      </div>
    );
  });

  return <div className="folder-detail-list-container">{itemList}</div>;
}

export default FolderDetailItemList;
