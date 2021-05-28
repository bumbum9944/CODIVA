import { React } from "react";
import HomeCarousel from "../components/Home/HomeCarousel";
import HomeSearchButton from "../components/Home/HomeSearchButton";

function Home() {
  return (
    <div className="Home">
      <HomeSearchButton />
      <HomeCarousel />
    </div>
  );
}

export default Home;
