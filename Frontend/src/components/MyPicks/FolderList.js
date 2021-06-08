import "./FolderList.css";
import { React } from "react";
import { useHistory } from "react-router-dom";
import { BsBookmarkFill, BsPencil, BsThreeDotsVertical } from "react-icons/bs";
import { ImBin } from "react-icons/im";

function FolderList({ folderList, addFolder }) {
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

  function onClickSelect() {
    if (document.querySelector(".menu").classList.contains("active")) {
      document.querySelector(".menu").classList.remove("active");
    } else {
      document.querySelector(".menu").classList.add("active");
    }
  }

  const folderListInner = folderList.map((element, index) => {
    let folderCover;
    if (element.itemCnt > 0) {
      const imageUrl = element.imageUrl;
      folderCover = (
        <img className="folder-image" src={imageUrl} alt="folder-image" />
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
    const folderId = element.id;
    const itemCnt = element.itemCnt;
    return (
      <div key={index} className="folder-item">
        <div
          className="folder-image-container"
          onClick={() => {
            pushToFolderDetail(folderName, folderId);
          }}
        >
          {folderCover}
        </div>
        <div className="folder-menu">
          <div className="folder-info">
            <p className="folder-text">{folderName}</p>
            <p className="folder-text">{itemCnt} items</p>
          </div>
        </div>
      </div>
    );
  });

  return <div className="folder-list-container">{folderListInner}</div>;
}

export default FolderList;
