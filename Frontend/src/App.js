import { React, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./components/common/Menu/Menu";
import Home from "./pages/Home";
import Codies from "./pages/Codies";
import CodyDetailPage from "./pages/CodyDetailPage";
import SearchPage1 from "./pages/SearchPage1";
import SearchPage2 from "./pages/SearchPage2";

function App() {
  const [gender, setGender] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    top: {
      detail: "반팔티",
      color: "#FFFFFF",
      selected: false
    },
    bottom: {
      detail: "청바지",
      color: "#0000FF",
      selected: false
    }
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/codies"
            render={() => (
              <Codies gender={gender} selectedOption={selectedOption} />
            )}
          />
          <Route path="/detail/:itemId" component={CodyDetailPage} />
          <Route
            path="/search/1"
            render={() => (
              <SearchPage1
                gender={gender}
                selectedOption={selectedOption}
                changeGender={newGender => {
                  console.log(newGender);
                  setGender(newGender);
                }}
              />
            )}
          />
          <Route
            path="/search/2"
            render={() => (
              <SearchPage2
                gender={gender}
                changeGender={newGender => {
                  setGender(newGender);
                }}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
