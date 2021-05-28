import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Codies from "./pages/Codies";
import CodyDetailPage from "./pages/CodyDetailPage";
import SearchPage1 from "./pages/SearchPage1";
import SearchPage2 from "./pages/SearchPage2";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/codies" exact component={Codies} />
          <Route path="/detail/:itemId" exact component={CodyDetailPage} />
          <Route path="/search/1" exact component={SearchPage1} />
          <Route path="/search/2" exact component={SearchPage2} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
