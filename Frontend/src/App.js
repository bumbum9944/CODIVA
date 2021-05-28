import { React, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Codies from "./pages/Codies";
import CodyDetailPage from "./pages/CodyDetailPage";
import Navbar from "./components/common/Navbar/Navbar";
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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/codies"
            render={() => (
              <Codies gender={gender} selectedOption={selectedOption} />
            )}
          />
          <Route path="/detail/:itemId" exact component={CodyDetailPage} />
          <Route path="/search1" component={SearchPage1} />
          <Route path="/search/2" exact component={SearchPage2} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
