import React from "react";
//import logo from "../logo.svg";
//import "./App.css";
import Loading from "./Loading";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* Header */}
      <Switch>
        <Route path="/loading">
          <div className="App">
            <Loading />
          </div>
        </Route>
        <Route path="/">
          <div className="App">
            <Loading />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
