import { React, useState } from "react";
import Header from "../components/common/Header/Header";
import RankedItemList from "../components/TopCodies/RankedItemList";

function TopCodies() {
  const [rankedItem, setRankedItem] = useState([
    {
      id: 1,
      imageUrl: "/carouselImage/item6.jpg",
      likeCnt: 1732,
      viewCnt: 23211,
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item1.jpg",
      likeCnt: 1211,
      viewCnt: 20112,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item7.jpg",
      likeCnt: 1105,
      viewCnt: 19725,
      isLiked: false,
      isSaved: false
    },
    {
      id: 4,
      imageUrl: "/carouselImage/item2.jpg",
      likeCnt: 997,
      viewCnt: 20012,
      isLiked: false,
      isSaved: false
    },
    {
      id: 5,
      imageUrl: "/carouselImage/item4.jpg",
      likeCnt: 860,
      viewCnt: 15002,
      isLiked: false,
      isSaved: false
    },
    {
      id: 6,
      imageUrl: "/carouselImage/item8.jpg",
      likeCnt: 821,
      viewCnt: 15620,
      isLiked: false,
      isSaved: false
    },
    {
      id: 7,
      imageUrl: "/carouselImage/item3.jpg",
      likeCnt: 758,
      viewCnt: 16230,
      isLiked: false,
      isSaved: false
    },
    {
      id: 8,
      imageUrl: "/carouselImage/item9.jpg",
      likeCnt: 739,
      viewCnt: 12330,
      isLiked: false,
      isSaved: false
    },
    {
      id: 9,
      imageUrl: "/carouselImage/item10.jpg",
      likeCnt: 632,
      viewCnt: 13992,
      isLiked: false,
      isSaved: false
    },
    {
      id: 10,
      imageUrl: "/carouselImage/item5.jpg",
      likeCnt: 573,
      viewCnt: 13229,
      isLiked: false,
      isSaved: false
    }
  ]);

  return (
    <div className="topCodies">
      <Header headerText="TOP CODIES" />
      <RankedItemList
        rankedItem={rankedItem}
        toggleSaved={targetIndex => {
          const copiedTopCodies = JSON.parse(JSON.stringify(rankedItem));
          copiedTopCodies[targetIndex].isSaved =
            !copiedTopCodies[targetIndex].isSaved;

          setRankedItem(copiedTopCodies);
        }}
        toggleLiked={targetIndex => {
          const copiedTopCodies = JSON.parse(JSON.stringify(rankedItem));
          if (copiedTopCodies[targetIndex].isLiked) {
            copiedTopCodies[targetIndex].likeCnt =
              copiedTopCodies[targetIndex].likeCnt - 1;
          } else {
            copiedTopCodies[targetIndex].likeCnt =
              copiedTopCodies[targetIndex].likeCnt + 1;
          }
          copiedTopCodies[targetIndex].isLiked =
            !copiedTopCodies[targetIndex].isLiked;
          setRankedItem(copiedTopCodies);
        }}
      />
    </div>
  );
}

export default TopCodies;
