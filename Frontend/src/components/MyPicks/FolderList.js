import "./FolderList.css";
import { React } from "react";
import { useHistory } from "react-router-dom";
import { BsBookmarkFill, BsThreeDotsVertical } from "react-icons/bs";

function FolderList({
  folderList,
  addFolder,
  setSelectedFolder,
  selectedFolder
}) {
  const history = useHistory();
  function pushToFolderDetail(folderName, folderId) {
    history.push({
      pathname: "/my-picks/detail",
      state: {
        folderName: folderName,
        folderId: folderId
      }
    });
  }

  function onClickSelect(targetIndex, folderId, folderName) {
    setSelectedFolder({
      targetIndex: targetIndex,
      folderId: folderId,
      folderName: folderName
    });
    document.querySelector(`#dropbox-inner-${targetIndex}`).classList.add("on");
    document.querySelector("body").classList.add("no-scroll");
    document.querySelector(`#layer-${targetIndex}`).classList.add("on");
  }

  function closeMenu(targetIndex) {
    setSelectedFolder("");
    document
      .querySelector(`#dropbox-inner-${targetIndex}`)
      .classList.remove("on");
    document.querySelector("body").classList.remove("no-scroll");
    document.querySelector(`#layer-${targetIndex}`).classList.remove("on");
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

  function openDeleteModal() {
    document.querySelector("body").classList.add("no-scroll2");
    document.querySelector(".folder-delete-modal").classList.remove("hidden");
  }

  const folderListInner = folderList.map((element, index) => {
    let folderCover;
    if (element.itemCnt > 0) {
      const imageUrl = element.imageUrl;
      folderCover = (
        <img className="folder-image" src={imageUrl} alt="folder" />
      );
    } else {
      folderCover = (
        <div className="folder-basic-image">
          <BsBookmarkFill
            style={{
              color: "#D3D3D3",
              fontSize: "5vh"
            }}
          />
        </div>
      );
    }
    const folderName = element.folderName;
    const itemCnt = element.itemCnt;

    let threeDotsButton;
    if (folderName === "?????? ??????") {
      threeDotsButton = "";
    } else {
      threeDotsButton = (
        <div
          className="folder-dropbox"
          onClick={() => {
            onClickSelect(index, element.id, folderName);
          }}
        >
          <BsThreeDotsVertical
            style={{
              fontSize: "7vw"
            }}
          />
          <ul className="folder-dropbox-inner" id={`dropbox-inner-${index}`}>
            <li
              className="folder-dropbox-inner-text"
              onClick={() => {
                openSlideMenu(index);
              }}
            >
              ?????? ?????? ??????
            </li>
            <li
              className="folder-dropbox-inner-text"
              style={{ borderTop: "solid black 1px" }}
              onClick={openDeleteModal}
            >
              ?????? ??????
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div key={index} className="folder-item">
        <div
          className="folder-image-container"
          onClick={() => {
            setSelectedFolder({
              targetIndex: index,
              folderId: element.id,
              folderName: folderName
            });
            pushToFolderDetail(folderName, element.id);
          }}
        >
          {folderCover}
        </div>
        <div className="folder-menu">
          <div className="folder-info">
            <p className="folder-text">{folderName}</p>
            <div
              className="folder-text"
              style={{ display: "flex", fontSize: "3.5vw", color: "#808080" }}
            >
              <p style={{ marginRight: "1vw" }}>{itemCnt}</p>
              <p>items</p>
            </div>
          </div>
          {threeDotsButton}
          <div
            className="folder-layer"
            id={`layer-${index}`}
            onClick={() => {
              setSelectedFolder({});
              document
                .querySelector(`#dropbox-inner-${index}`)
                .classList.remove("on");
              document.querySelector("body").classList.remove("no-scroll");
              document.querySelector(`#layer-${index}`).classList.remove("on");
            }}
          ></div>
        </div>
      </div>
    );
  });

  return <div className="folder-list-container">{folderListInner}</div>;
}

export default FolderList;
