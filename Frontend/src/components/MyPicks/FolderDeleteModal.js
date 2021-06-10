import { React } from "react";
import Button from "@material-ui/core/Button";
import "./FolderDeleteModal.css";

function FolderDeleteModal({
  setSelectedFolder,
  selectedFolder,
  deleteFolder
}) {
  function closeModal() {
    document
      .querySelector(`#dropbox-inner-${selectedFolder.targetIndex}`)
      .classList.remove("on");
    document
      .querySelector(`#layer-${selectedFolder.targetIndex}`)
      .classList.remove("on");
    setSelectedFolder({});
    document.querySelector("body").classList.remove("no-scroll2");
    document.querySelector(".folder-delete-modal").classList.add("hidden");
  }

  return (
    <div className="folder-delete-modal hidden">
      <div className="folder-delete-modal-overlay"></div>
      <div className="folder-delete-modal-content">
        <div className="folder-delete-modal-text">
          선택한 폴더를 삭제하시겠어요?
        </div>
        <div className="folder-delete-modal-text">
          폴더는 복구할 수 없으며, 저장한 코디도 삭제됩니다.
        </div>
        <div className="folder-delete-modal-button">
          <Button
            variant="contained"
            className="delete-button"
            onClick={() => {
              deleteFolder(selectedFolder);
              closeModal();
            }}
          >
            OK
          </Button>
          <Button
            variant="contained"
            className="delete-button"
            onClick={closeModal}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FolderDeleteModal;
