import { React, useState, useEffect } from "react";
import "./FolderAdd.css";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

function FolderAdd({
  addFolder,
  selectedFolder,
  setSelectedFolder,
  oldName,
  changeFolderName
}) {
  const [folderInputValue, setFolderInputValue] = useState("");
  useEffect(() => {
    if (oldName !== undefined) {
      setFolderInputValue(oldName);
    }
  }, [oldName]);
  function closeSlideMenu() {
    if (selectedFolder && selectedFolder.targetIndex) {
      document
        .querySelector(`#dropbox-inner-${selectedFolder.targetIndex}`)
        .classList.remove("on");
      document
        .querySelector(`#layer-${selectedFolder.targetIndex}`)
        .classList.remove("on");
      setSelectedFolder({});
    }
    document.querySelector("body").classList.remove("no-scroll");
    document.querySelector("#dimmed").remove();
    document.querySelector(".folder-add-container").classList.remove("on");
  }

  function handleClick() {
    if (oldName !== "" && oldName !== undefined) {
      changeFolderName(selectedFolder, folderInputValue);
    } else {
      addFolder(folderInputValue);
    }
    setFolderInputValue("");
    closeSlideMenu();
  }
  let addButton;
  if (folderInputValue.length > 0) {
    addButton = (
      <Button
        variant="contained"
        style={{
          backgroundColor: "#7B68EE",
          color: "white",
          width: "100%",
          marginTop: "15%",
          fontSize: "5vw"
        }}
        onClick={handleClick}
      >
        완료
      </Button>
    );
  } else {
    addButton = (
      <Button
        variant="contained"
        disabled
        style={{
          width: "100%",
          marginTop: "15vh",
          fontSize: "5vw"
        }}
      >
        완료
      </Button>
    );
  }

  let title;
  if (oldName !== undefined && oldName !== "") {
    title = <div className="folder-add-title">폴더 이름 수정</div>;
  } else {
    title = <div className="folder-add-title">폴더추가</div>;
  }

  return (
    <div className="folder-add-container">
      <CloseIcon
        className="folder-add-close-btn"
        style={{
          position: "absolute",
          left: "2%",
          top: "2%",
          fontSize: "10vw"
        }}
        onClick={closeSlideMenu}
      />
      {title}
      <input
        className="folder-add-input"
        type="text"
        maxLength="30"
        value={folderInputValue}
        placeholder="최소 한 글자 이상 입력해주세요."
        onChange={e => {
          const folderText = e.target.value;
          setFolderInputValue(folderText);
        }}
      />
      <div className="folder-add-text-length">{folderInputValue.length}/30</div>
      {addButton}
    </div>
  );
}

export default FolderAdd;
