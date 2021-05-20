import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
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
    </div>
  );
}

export default App;
