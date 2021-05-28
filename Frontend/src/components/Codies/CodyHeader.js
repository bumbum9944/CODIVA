import { React } from "react";
import Chip from '@material-ui/core/Chip';
import { GiTrousers } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";
import { fontSize } from "@material-ui/system";
// import { color } from "@material-ui/system";

function CodyHeader({gender, selectedOption}) {

  const iconTagObject = {
    top: FaTshirt,
    bottom: GiTrousers
  }
  
  const codyHeaderInner = Object.entries(selectedOption).map((element, index)=>{
    const category = element[0];
    const optionDetail = element[1].detail;
    const color = element[1].color;
    const OptionIcon = iconTagObject[category];
    return (
      <div className="option-container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#CCCCCC",  height: "13vh", marginInline: "2vw", borderRadius: "3vw"}} key={index}>
        <OptionIcon style={{color: color, width: "20vw", fontSize: "10vw", marginBottom: "1.5vh"}} />
        <Chip label={optionDetail} style={{backgroundColor: "#1E9E9E", fontSize: "1.7vh", color: "white"}} />
        {/* <div className="option-detail-tag" style={{width: "15vw", backgroundColor: "#1E9E9E", textAlign: "center", borderRadius: "2vw", padding: "1vw"}} >{optionDetail}</div> */}
      </div>
    );
  });

  return (
    <>
    <div>Selected Options</div>
    <br></br>
    <div className="selected-option-header-container" style={{ display: "flex", marginBottom: "5vh"}}>
      {codyHeaderInner}
    </div>
    </>
  );
}

export default CodyHeader;
