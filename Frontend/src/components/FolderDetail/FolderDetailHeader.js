import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "./FolderDetailHeader.css";
import { IoChevronBack } from "react-icons/io5";

function FolderDetailHeader({
  folderName,
  onChangeMode,
  mode,
  resetSelectedItem
}) {
  const history = useHistory();

  function openSlideMenu() {
    document
      .querySelector(".folder-detail-bottom-slide-container")
      .classList.add("on");
  }

  function closeSlideMenu() {
    document
      .querySelector(".folder-detail-bottom-slide-container")
      .classList.remove("on");
  }

  function handleClick() {
    if (mode === "edit") {
      onChangeMode("");
      closeSlideMenu();
      resetSelectedItem();
    } else {
      onChangeMode("edit");
      openSlideMenu();
    }
  }

  let editButton;
  if (mode === "edit") {
    editButton = (
      <p className="folder-detail-edit-button" onClick={handleClick}>
        CANCEL
      </p>
    );
  } else {
    editButton = (
      <p className="folder-detail-edit-button" onClick={handleClick}>
        EDIT
      </p>
    );
  }

  return (
    <div className="folder-detail-header">
      <div className="folder-detail-title">
        <IoChevronBack
          className="folder-detail-back-button"
          onClick={() => {
            history.push("/my-picks");
          }}
        />
        <p className="folder-detail-name">{folderName}</p>
      </div>
      {editButton}
    </div>
  );
}

export default FolderDetailHeader;
