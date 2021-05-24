import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Codies from "./pages/Codies";
import CodyDetailPage from "./pages/CodyDetailPage";
import Navbar from "./components/common/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/codies" exact component={Codies} />
          <Route path="/detail/:itemId" exact component={CodyDetailPage} />
        </Switch>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
