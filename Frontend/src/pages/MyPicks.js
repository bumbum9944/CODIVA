import { React, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import FolderList from "../components/MyPicks/FolderList";
import Header from "../components/common/Header/Header";
import { FiFolderPlus } from "react-icons/fi";
import FolderAdd from "../components/common/Folder/FolderAdd";
import FolderDeleteModal from "../components/MyPicks/FolderDeleteModal";
import UserContext from "contexts/user";
import { requestWithJWT } from "lib/client";

function MyPicks({
  folderList,
  setFolderList,
  addFolder,
  deleteFolder,
  changeFolderName,
  selectedFolder,
  setSelectedFolder
}) {
  const history = useHistory();
  const [oldName, setOldName] = useState("");
  const { state } = useContext(UserContext);
  const { user } = state;

  useEffect(() => {
    if (!selectedFolder.folderName) {
      setOldName("");
    } else {
      setOldName(selectedFolder.folderName);
    }
  }, [selectedFolder]);

  useEffect(async () => {
    if (user) {
      await requestWithJWT("get", `/directory/${user}`).then(response => {
        const res = response.data.data;
        const folderData = res.map(item => {
          return {
            id: item.id,
            folderName: item.name === "default" ? "기본 폴더" : item.name,
            itemCnt: item.cnt,
            imageUrl: item.url
          };
        });
        setFolderList(folderData);
      });
    } else if (!localStorage.getItem("user_id")) {
      history.push("/");
    }
  }, [user]);

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
      <FolderList
        folderList={folderList}
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
        setOldName={setOldName}
      />
      <FolderDeleteModal
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        deleteFolder={deleteFolder}
      />
    </div>
  );
}

export default MyPicks;
