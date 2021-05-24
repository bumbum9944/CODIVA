import { React } from "react";
import Header from "../components/common/Header/Header";
import CodyDetailCard from "../components/CodyDetailPage/CodyDetailCard";

function CodyDetailPage(props) {
  const item = props.location.state.item;

  return (
    <div className="cody-detail-page">
      <Header headerText="DETAIL" />
      <CodyDetailCard item={item} />
    </div>
  );
}

export default CodyDetailPage;