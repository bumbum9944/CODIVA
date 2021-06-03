import { React } from "react";
import CodyCard from "./CodyCard";
import "./CodyList.css";

function CodyList({ codies, toggleSaved, toggleLiked, viewCntIncrease }) {
  const codyCardList = codies.map((item, index) => {
    return (
      <CodyCard
        key={index}
        item={item}
        itemId={index}
        toggleSaved={toggleSaved}
        toggleLiked={toggleLiked}
        viewCntIncrease={viewCntIncrease}
      />
    );
  });

  return <div className="cody-list-container">{codyCardList}</div>;
}

export default CodyList;
