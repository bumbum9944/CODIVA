import { React, useState, useEffect } from "react";
import FolderList from "../components/MyPicks/FolderList";
import Header from "../components/common/Header/Header";
import { FiFolderPlus } from "react-icons/fi";
import FolderAdd from "../components/common/Folder/FolderAdd";
import FolderDeleteModal from "../components/MyPicks/FolderDeleteModal";


function MyPicks({ folderList, addFolder, deleteFolder, changeFolderName }) {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [oldName, setOldName] = useState("");

  useEffect(()=>{
    if(selectedFolder !== "") {
      setOldName(folderList[selectedFolder].folderName);
    } else {
      setOldName("");
    }
  }, [selectedFolder])

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
        selectedFolder={selectedFolder}
        oldName={oldName}
        setSelectedFolder={setSelectedFolder}
        changeFolderName={changeFolderName}
      />
      <FolderList folderList={folderList} setSelectedFolder={setSelectedFolder} selectedFolder={selectedFolder} setOldName={setOldName} />
      <FolderDeleteModal selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} deleteFolder={deleteFolder} />
    </div>
  );
}

export default MyPicks;
