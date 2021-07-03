import New from "./New";
import Home from "./Home";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [ID, setID] = useState(0);
  function setId(data) {
    setID(data);
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <New clicked={setId} />
          </Route>
          <Route path="/home">
            <Home prop={ID} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
