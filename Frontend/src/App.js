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
        </Switch>
      </BrowserRouter>
      <Navbar />
      <SearchPage1 />
    </div>
  );
}

export default App;
