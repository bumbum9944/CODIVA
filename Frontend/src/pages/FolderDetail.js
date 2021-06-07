import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import FolderDetailHeader from "../components/FolderDetail/FolderDetailHeader";
import FolderDetailItemList from "../components/FolderDetail/FolderDetailItemList";

function FolderDetail() {
  const location = useLocation();
  const folderName = location.state.folderName;
  const folderId = location.state.folderId;
  const [items, setItems] = useState([
    {
      id: 1,
      imageUrl: "/carouselImage/item6.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item7.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item8.jpg",
      likeCnt: 25,
      viewCnt: 23,
      isLiked: false,
      isSaved: true
    },
    {
      id: 4,
      imageUrl: "/carouselImage/item9.jpg",
      likeCnt: 11,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 5,
      imageUrl: "/carouselImage/item10.jpg",
      likeCnt: 57,
      viewCnt: 23,
      isLiked: false,
      isSaved: true
    }
  ]);

  return (
    <div className="folder-detail-container">
      <FolderDetailHeader folderName={folderName} />
      <FolderDetailItemList
        items={items}
        folderId={folderId}
        toggleLiked={targetId => {
          const copiedItems = JSON.parse(JSON.stringify(items));
          if (copiedItems[targetId].isLiked) {
            copiedItems[targetId].likeCnt -= 1;
          } else {
            copiedItems[targetId].likeCnt += 1;
          }
          copiedItems[targetId].isLiked = !copiedItems[targetId].isLiked;
          setItems(copiedItems);
        }}
      />
    </div>
  );
}

export default FolderDetail;
