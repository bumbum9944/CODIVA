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
  const thisFolderName = location.state.folderName;
  const thisFolderId = location.state.folderId;
  const { state } = useContext(UserContext);
  const { user } = state;
  const [mode, setMode] = useState("");
  const [selectedItem, setSelectedItem] = useState(new Set([]));
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const liked = new Set(
      await requestWithJWT("get", `/like/${user}`).then(
        response => response.data.user_like_codies
      )
    );
    const saved = new Set(
      await requestWithJWT("get", `/saved/${user}`).then(
        response => response.data.data
      )
    );
    requestWithJWT("get", `/saved/${user}/${thisFolderId}`).then(
      response => {
        const res = response.data.data;
        const itemData = res.map(item => {
          return {
            id: item.id,
            imageUrl: item.url,
            likeCnt: item.likes_cnt,
            viewCnt: item.hits,
            isLiked: !user ? false : liked.has(item.id) ? true : false,
            isSaved: !user ? false : saved.has(item.id) ? true : false
          };
        });
        setItems(itemData);
      }
    );
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

  function changeFolder(targetFolderName) {
    const newFolderName = (targetFolderName === "기본 폴더") ? "default" : targetFolderName;
    const nowFolderId = selectedFolder.folderId;
    document
      .querySelector(".folder-detail-bottom-slide-container")
      .classList.remove("on");
    const selectedItemArray = [];
    const remain = [];
    for (let i = 0; i < items.length; i++) {
      if (selectedItem.has(i)) {
        selectedItemArray.push(items[i].id);
      } else {
        remain.push(items[i]);
      }
    }
    requestWithJWT("put", `/saved/${user}/${nowFolderId}`,{targets: selectedItemArray, new_dir_name: newFolderName})
    .then(response => {
      console.log(response.data);
    }).catch(err=>console.log(err.message));
    setMode("");
    setItems(remain);
    setSelectedItem(new Set([]));
  }

  function deleteItems() {
    const nowFolderId = selectedFolder.folderId;
    const selectedItemArray = [];
    const remain = [];
    for (let i = 0; i < items.length; i++) {
      if (selectedItem.has(i)) {
        selectedItemArray.push(items[i].id);
      } else {
        remain.push(items[i]);
      }
    }
    requestWithJWT("delete", `/saved/${user}/${nowFolderId}`, {targets: selectedItemArray})
    .then(response => {
      console.log(response.data);
    }).catch(err=>console.log(err.message));
    setMode("");
    setItems(remain);
    setSelectedItem(new Set([]));
  }

  function toggleLiked(codyId, targetIndex) {
    const copiedItems = JSON.parse(JSON.stringify(items));
    if (copiedItems[targetIndex].isLiked) {
      requestWithJWT("delete", `/like/${user}/${codyId}`).then(response => {
        console.log(response.data);
      });
      copiedItems[targetIndex].likeCnt = copiedItems[targetIndex].likeCnt - 1;
    } else {
      requestWithJWT("post", `/like/${user}/${codyId}`).then(
        response => {
          console.log(response.data);
        }
      );
      copiedItems[targetIndex].likeCnt = copiedItems[targetIndex].likeCnt + 1;
    }
    copiedItems[targetIndex].isLiked = !copiedItems[targetIndex].isLiked;
    setItems(copiedItems);
  }

  return (
    <div className="folder-detail-container">
      <FolderDetailHeader
        folderName={thisFolderName}
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
        onChangeSelectedItem={onChangeSelectedItem}
        toggleLiked={toggleLiked}
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
