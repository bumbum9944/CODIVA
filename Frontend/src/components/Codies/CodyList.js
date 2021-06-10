import { React } from "react";
import CodyCard from "./CodyCard";
import "./CodyList.css";

function CodyList({
  codies,
  selectedItem,
  toggleSaved,
  toggleLiked,
  viewCntIncrease,
  setSelectedItem
}) {
  const codyCardList = codies.map((item, index) => {
    return (
      <CodyCard
        key={index}
        item={item}
        targetIndex={index}
        toggleSaved={toggleSaved}
        toggleLiked={toggleLiked}
        viewCntIncrease={viewCntIncrease}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
      />
    );
  });

  return <div className="cody-list-container">{codyCardList}</div>;
}

export default CodyList;
