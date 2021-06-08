import { React, useState } from "react";
import FolderList from "../components/MyPicks/FolderList";
import Header from "../components/common/Header/Header";
import { FiFolderPlus } from "react-icons/fi";
import FolderAdd from "../components/common/Folder/FolderAdd";

function MyPicks({ folderList, addFolder }) {
  function openSlideMenu() {
    document.querySelector("body").classList.add("no-scroll");
    document.querySelector(".folder-add-container").classList.add("on");
    let div = document.createElement("div");
    div.id = "dimmed";
    document.querySelector(".App").append(div);
    document
      .querySelector("#dimmed")
      .addEventListener("scroll touchmove touchend mousewheel", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
  }

  return (
    <div className="my-picks">
      <Header headerText="MY PICKS" />
      <FiFolderPlus
        style={{
          position: "absolute",
          top: "6.5vh",
          right: "6vw",
          fontSize: "7vw"
        }}
        onClick={openSlideMenu}
      />
      <FolderAdd 
        addFolder={addFolder}
      />
      <FolderList
        folderList={folderList}
        // onChangeSaved={(folderId, itemId) => {
        //   const copiedMyPicks = JSON.parse(JSON.stringify(myPicks));
        //   copiedMyPicks[folderId].items.splice(itemId, 1);
        //   setMyPicks(copiedMyPicks);
        // }}
        // onChangeLiked={(folderId, itemId) => {
        //   const copiedMyPicks = JSON.parse(JSON.stringify(myPicks));
        //   if (copiedMyPicks[folderId].items[itemId].isLiked) {
        //     copiedMyPicks[folderId].items[itemId].likeCnt -= 1;
        //   } else {
        //     copiedMyPicks[folderId].items[itemId].likeCnt += 1;
        //   }
        //   copiedMyPicks[folderId].items[itemId].isLiked =
        //     !copiedMyPicks[folderId].items[itemId].isLiked;
        //   setMyPicks(copiedMyPicks);
        // }}
        // deleteFolder={folderId => {
        //   const copiedMyPicks = JSON.parse(JSON.stringify(myPicks));
        //   copiedMyPicks.splice(folderId, 1);
        //   setMyPicks(copiedMyPicks);
        // }}
        // onChangeFolderName={(folderId, newFolderName) => {
        //   const copiedMyPicks = JSON.parse(JSON.stringify(myPicks));
        //   copiedMyPicks[folderId].folderName = newFolderName;
        //   setMyPicks(copiedMyPicks);
        // }}
        // addFolder={newFolderName => {
        //   const copiedMyPicks = JSON.parse(JSON.stringify(myPicks));
        //   copiedMyPicks.push({
        //     id: copiedMyPicks.length,
        //     folderName: newFolderName,
        //     itemCnt: 0,
        //     imageUrl: ""
        //   });
        //   setMyPicks(copiedMyPicks);
        // }}
      />
    </div>
  );
}

export default MyPicks;
