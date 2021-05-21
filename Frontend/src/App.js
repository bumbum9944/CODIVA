import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Navbar from "./components/common/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/codies" exact component={SearchResult} />
        </Switch>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
