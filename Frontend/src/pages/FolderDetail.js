import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import FolderDetailHeader from "../components/FolderDetail/FolderDetailHeader";
import FolderDetailItemList from "../components/FolderDetail/FolderDetailItemList";
import FolderDetailBottomSlide from "../components/FolderDetail/FolderDetailBottomSlide";
import FolderAdd from "../components/common/Folder/FolderAdd";
import FolderListSlide from "../components/common/Folder/FolderListSlide";

function FolderDetail({ folderList, addFolder }) {
  const location = useLocation();
  const folderName = location.state.folderName;
  const folderId = location.state.folderId;
  const [mode, setMode] = useState("");
  const [selectedItem, setSelectedItem] = useState(new Set([]));
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

  // function onChangeSelectedItem(targetIndex) {
  //   const copiedSelectedItem = selectedItem.slice();
  //   if(copiedSelectedItem.includes(targetIndex)) {
  //     copiedSelectedItem.splice(targetIndex, 1);
  //   } else {
  //     copiedSelectedItem.push(targetIndex);
  //   }
  //   setSelectedItem(copiedSelectedItem);
  // }
  function onChangeSelectedItem(targetIndex) {
    const copiedSelectedItem = new Set(selectedItem);
    if (copiedSelectedItem.has(targetIndex)) {
      copiedSelectedItem.delete(targetIndex, 1);
    } else {
      copiedSelectedItem.add(targetIndex);
    }
    setSelectedItem(copiedSelectedItem);
  }

  function changeFolder() {
    document
      .querySelector(".folder-detail-bottom-slide-container")
      .classList.remove("on");
    const temp = [];
    for (let i = 0; i < items.length; i++) {
      if (!selectedItem.has(i)) {
        temp.push(items[i]);
      }
    }
    setMode("");
    setItems(temp);
    setSelectedItem(new Set([]));
  }

  function deleteItems() {
    document
      .querySelector(".folder-detail-bottom-slide-container")
      .classList.remove("on");
    const temp = [];
    for (let i = 0; i < items.length; i++) {
      if (!selectedItem.has(i)) {
        temp.push(items[i]);
      }
    }
    setMode("");
    setItems(temp);
    setSelectedItem(new Set([]));
  }

  return (
    <div className="folder-detail-container">
      <FolderDetailHeader
        folderName={folderName}
        mode={mode}
        resetSelectedItem={() => {
          setSelectedItem(new Set([]));
        }}
        onChangeMode={newMode => {
          setMode(newMode);
        }}
      />
      <FolderDetailItemList
        selectedItem={selectedItem}
        mode={mode}
        items={items}
        folderId={folderId}
        onChangeSelectedItem={onChangeSelectedItem}
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
      <FolderDetailBottomSlide
        selectedItem={selectedItem}
        deleteItems={deleteItems}
      />
      <FolderAdd addFolder={addFolder} />
      <FolderListSlide
        selectedItem={selectedItem}
        folderList={folderList}
        addFolder={addFolder}
        changeFolder={changeFolder}
      />
    </div>
  );
}

export default FolderDetail;
