import { React } from "react";
import HomeCarousel from "../components/Home/HomeCarousel";
import HomeSearchButton from "../components/Home/HomeSearchButton";

function Home({ setGender, setApparels, setSelectedCategory }) {
  return (
    <div className="Home">
      <HomeSearchButton
        setGender={setGender}
        setApparels={setApparels}
        setSelectedCategory={setSelectedCategory}
      />
      <HomeCarousel />
    </div>
  );
}

export default Home;
