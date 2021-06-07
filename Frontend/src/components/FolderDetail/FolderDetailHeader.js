import { React } from "react";
import { useHistory } from "react-router-dom";
import "./FolderDetailHeader.css";
import { IoChevronBack } from "react-icons/io5";

function FolderDetailHeader({ folderName }) {
  const history = useHistory();
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
      <p className="folder-detail-edit-button">Edit</p>
    </div>
  );
}

export default FolderDetailHeader;
