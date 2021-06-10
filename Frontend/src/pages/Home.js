import { React } from "react";
import HomeCarousel from "../components/Home/HomeCarousel";
import HomeSearchButton from "../components/Home/HomeSearchButton";
import Main from "components/Home/Main";

function Home({ setGender, setApparels, setSelectedCategory }) {
  return (
    <div className="Home">
      <HomeSearchButton
        setGender={setGender}
        setApparels={setApparels}
        setSelectedCategory={setSelectedCategory}
      />
      <Main />
    </div>
  );
}

export default Home;
