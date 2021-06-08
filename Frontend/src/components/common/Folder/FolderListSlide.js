import { React, useState } from "react";
import "./FolderListSlide.css";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { BsPlus } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";

function FolderListSlide({ selectedItem, onChangeSelectedItem, folderList, toggleSaved, changeFolder }) {
  function closeSlideMenu() {
    document.querySelector("body").classList.remove("no-scroll2");
    document.querySelector("#dimmed2").remove();
    document
      .querySelector(".folder-list-slide-container")
      .classList.remove("on");
  }

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

  function saveItem() {
    if(selectedItem.size === undefined) {
      toggleSaved(selectedItem);
      onChangeSelectedItem("");
    } else {
      changeFolder();
    }
  }

  const folderListInner = folderList.map((element, index) => {
    const itemCnt = element.itemCnt;
    const imageUrl = element.imageUrl;
    const folderName = element.folderName;

    let innerIamge;
    if (imageUrl === "") {
      innerIamge = (
        <div className="folder-list-slide-image basic">
          <BsBookmarkFill />
        </div>
      );
    } else {
      innerIamge = <img className="folder-list-slide-image" src={imageUrl} />;
    }

    return (
      <div 
        key={index} 
        className="folder-list-slide-item slide-inner"
        onClick={()=>{
          saveItem();
          closeSlideMenu();
        }}
      
      >
        {innerIamge}
        <div>{folderName}</div>
        <div>({itemCnt})</div>
      </div>
    );
  });

  return (
    <div className="folder-list-slide-container">
      <div className="folder-list-slide-close-btn">
        <CloseIcon
          style={{
            marginLeft: "2%",
            fontSize: "10vw"
          }}
          onClick={closeSlideMenu}
        />
      </div>
      <div className="folder-add-button slide-inner" onClick={openSlideMenu}>
        <div className="folder-add-icon">
          <BsPlus
            style={{
              color: "#87CEEB",
              fontSize: "7vw",
              fontWeight: "bold"
            }}
          />
        </div>
        <div className="folder-add-text">새 폴더 만들기</div>
      </div>
      <div className="folder-list-slide-inner">{folderListInner}</div>
    </div>
  );
}

export default FolderListSlide;
