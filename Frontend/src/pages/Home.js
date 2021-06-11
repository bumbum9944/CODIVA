import { React } from "react";
import Main from "components/Home/Main";

function Home({ setGender, setApparels, setSelectedCategory }) {
  return (
    <div className="Home">
      <Main
        setGender={setGender}
        setApparels={setApparels}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default Home;
