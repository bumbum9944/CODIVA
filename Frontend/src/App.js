import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SearchPage1 from "./pages/SearchPage1";
import Navbar from "./components/common/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search1" exact component={SearchPage1} />
        </Switch>
      </BrowserRouter>
      <Navbar />
    </div>
  );
}

export default App;
