import { React } from "react";
import CodyCard from "./CodyCard";
import "./CodyList.css"


function CodyList({ codies }) {
  
  const codyCardList = codies.map((item, index)=>{
    return (
      <CodyCard key={index} item={item} />
    );
  })

  return (
    <div className="cody-list-container">
      {codyCardList}
    </div>
  );


}

export default CodyList;