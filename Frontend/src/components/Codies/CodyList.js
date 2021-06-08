import { React } from "react";
import CodyCard from "./CodyCard";
import "./CodyList.css";

function CodyList({ codies, toggleSaved, toggleLiked, viewCntIncrease, onChangeSelectedItem }) {
  const codyCardList = codies.map((item, index) => {
    return (
      <CodyCard
        key={index}
        item={item}
        itemId={index}
        toggleSaved={toggleSaved}
        toggleLiked={toggleLiked}
        viewCntIncrease={viewCntIncrease}
        onChangeSelectedItem={onChangeSelectedItem}
      />
    );
  });

  return <div className="cody-list-container">{codyCardList}</div>;
}

export default CodyList;
