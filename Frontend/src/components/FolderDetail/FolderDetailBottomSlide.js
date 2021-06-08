import { React } from 'react';
import "./FolderDetailBottomSlide.css";
import { FaExchangeAlt, FaTrash } from "react-icons/fa";
import { colors } from '@material-ui/core';


function FolderDetailBottomSlide({selectedItem, deleteItems}) {

  function openFolderListSlide() {
    document.querySelector("body").classList.add("no-scroll2");
    document
      .querySelector(".folder-list-slide-container")
      .classList.add("on");
    let div = document.createElement("div");
    div.id = "dimmed2";
    document.querySelector(".App").append(div);
    document
      .querySelector("#dimmed2")
      .addEventListener("scroll touchmove touchend mousewheel", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
  }

  let bottomButton;
  if(selectedItem.size > 0) {
    bottomButton = <div className="folder-detail-bottom-slide-inner"
      style={{
        borderTop: "solid black 0.5vw",
      }}
    >
      <div 
        className="bottom-slide-item"
        style={{
          borderRight: "solid black 0.5vw"
        }}
        onClick={openFolderListSlide}
      >
        <FaExchangeAlt 
          style={{
            marginRight: "3vw"
          }}
        />
        <div>
          폴더변경
        </div>
      </div>
      <div 
        className="bottom-slide-item"
        onClick={deleteItems}
      >
        <FaTrash 
          style={{
            marginRight: "3vw"
          }}
        />
        <div>
          코디삭제
        </div>
      </div>
    </div>    
  } else {
    bottomButton = <div className="folder-detail-bottom-slide-inner"
      style={{
        borderTop: "solid #999999 0.5vw",
        color: "#999999"
      }}
    >
      <div 
        className="bottom-slide-item"
        style={{
          borderRight: "solid #999999 0.5vw"
        }}
      >
        <FaExchangeAlt 
          style={{
            marginRight: "3vw"
          }}
        />
        <div>
          폴더변경
        </div>
      </div>
      <div className="bottom-slide-item">
        <FaTrash 
          style={{
            marginRight: "3vw"
          }}
        />
        <div>
          코디삭제
        </div>
      </div>
    </div>
  }

  return(
    <div className="folder-detail-bottom-slide-container">
      {bottomButton}
    </div>
  );
}

export default FolderDetailBottomSlide;