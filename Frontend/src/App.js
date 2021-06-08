import { React, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./components/common/Menu/Menu";
import SlideMenu from "./components/common/Menu/SlideMenu";
import Home from "./pages/Home";
import Codies from "./pages/Codies";
import SearchPage1 from "./pages/SearchPage1";
import SearchPage2 from "./pages/SearchPage2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopCodies from "./pages/TopCodies";
import MyPicks from "./pages/MyPicks";
import FolderDetail from "./pages/FolderDetail";

function App() {
  const [gender, setGender] = useState("");
  const [detail, setDetail] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    category: "",
    color: "all"
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <SlideMenu />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/codies"
            render={() => (
              <Codies gender={gender} selectedOption={selectedOption} />
            )}
          />
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
                detail={detail}
                setDetail={setDetail}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                changeGender={newGender => {
                  setGender(newGender);
                }}
                changeDetail={newDetail => {
                  console.log(newDetail);
                  setDetail(newDetail);
                }}
              />
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/top-codies" component={TopCodies} />
          <Route path="/my-picks" exact component={MyPicks} />
          <Route path="/my-picks/detail" component={FolderDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
