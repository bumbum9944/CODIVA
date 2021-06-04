import { React, useState } from "react";
import Header from "../components/common/Header/Header";
import CodyList from "../components/Codies/CodyList";
import CodyHeader from "../components/Codies/CodyHeader";

function Codies({ gender, selectedOption }) {
  const [codies, setCodies] = useState([
    {
      id: 1,
      imageUrl: "/carouselImage/item6.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item7.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item8.jpg",
      likeCnt: 25,
      viewCnt: 23,
      isLiked: false,
      isSaved: true
    },
    {
      id: 4,
      imageUrl: "/carouselImage/item9.jpg",
      likeCnt: 11,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 5,
      imageUrl: "/carouselImage/item10.jpg",
      likeCnt: 57,
      viewCnt: 23,
      isLiked: false,
      isSaved: true
    },
    {
      id: 2,
      imageUrl: "/carouselImage/item11.jpg",
      likeCnt: 3,
      viewCnt: 23,
      isLiked: true,
      isSaved: true
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item1.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item2.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item3.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item4.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: true
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item5.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: true
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item6.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item7.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item8.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item9.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item10.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      imageUrl: "/carouselImage/item11.jpg",
      likeCnt: 17,
      viewCnt: 23,
      isLiked: false,
      isSaved: false
    }
  ]);

  return (
    <div>
      <Header headerText="CODIES" />
      <CodyHeader gender={gender} selectedOption={selectedOption} />
      <CodyList
        codies={codies}
        toggleSaved={targetIndex => {
          const copiedCodies = JSON.parse(JSON.stringify(codies));
          copiedCodies[targetIndex].isSaved =
            !copiedCodies[targetIndex].isSaved;

          setCodies(copiedCodies);
        }}
        toggleLiked={targetIndex => {
          const copiedCodies = JSON.parse(JSON.stringify(codies));
          if (copiedCodies[targetIndex].isLiked) {
            copiedCodies[targetIndex].likeCnt =
              copiedCodies[targetIndex].likeCnt - 1;
          } else {
            copiedCodies[targetIndex].likeCnt =
              copiedCodies[targetIndex].likeCnt + 1;
          }
          copiedCodies[targetIndex].isLiked =
            !copiedCodies[targetIndex].isLiked;
          setCodies(copiedCodies);
        }}
        viewCntIncrease={targetIndex => {
          const copiedCodies = JSON.parse(JSON.stringify(codies));
          copiedCodies[targetIndex].viewCnt =
            copiedCodies[targetIndex].viewCnt + 1;
          setCodies(copiedCodies);
        }}
      />
    </div>
  );
}

export default Codies;