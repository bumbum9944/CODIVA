import { React, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { requestWithJWT } from "lib/client";
import UserContext from "contexts/user";
import FolderDetailHeader from "../components/FolderDetail/FolderDetailHeader";
import FolderDetailItemList from "../components/FolderDetail/FolderDetailItemList";
import FolderDetailBottomSlide from "../components/FolderDetail/FolderDetailBottomSlide";
import FolderAdd from "../components/common/Folder/FolderAdd";
import FolderListSlide from "../components/common/Folder/FolderListSlide";
import CodyDeleteModal from "../components/FolderDetail/CodyDeleteModal";

function FolderDetail({
  folderList,
  addFolder,
  selectedFolder,
  setSelectedFolder
}) {
  const location = useLocation();
  const folderName = location.state.folderName;
  const folderId = location.state.folderId;
  const { state } = useContext(UserContext);
  const { user, header } = state;
  const [mode, setMode] = useState("");
  const [selectedItem, setSelectedItem] = useState(new Set([]));
  const [items, setItems] = useState([]);

  useEffect(async ()=>{
    let liked;
    let saved;
    if (user) {
      liked = new Set(
        await requestWithJWT("get", `/like/${user}`).then(
          response => response.data.user_like_codies
        )
      );
      saved = new Set(
        await requestWithJWT("get", `/saved/${user}`).then(
          response => response.data.data
        )
      );
    }
    requestWithJWT("get", `/saved/${user}/${folderName}`, header)
    .then(response=>{
      const res = response.data.data;
      const itemData = res.map(item=>{
        return({
          id: item.id,
          imageUrl: item.url,
          likeCnt: item.likes_cnt,
          viewCnt: item.hits,
          isLiked: !user ? false : liked.has(item.id) ? true : false,
          isSaved: !user ? false : saved.has(item.id) ? true : false
        });
      });
      setItems(itemData);
    })
  }, [user]);


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
        setSelectedFolder={setSelectedFolder}
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
      <FolderDetailBottomSlide selectedItem={selectedItem} />
      <FolderAdd addFolder={addFolder} />
      <FolderListSlide
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        selectedItem={selectedItem}
        folderList={folderList}
        addFolder={addFolder}
        changeFolder={changeFolder}
      />
      <CodyDeleteModal
        deleteItems={deleteItems}
        setSelectedItem={setSelectedItem}
        setMode={setMode}
      />
    </div>
  );
}

export default FolderDetail;
