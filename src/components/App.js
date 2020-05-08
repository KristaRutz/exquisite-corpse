import React from "react";
//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import AboutPage from "./About";
import Header from "./Header";
import Loading from "./Loading";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProjectControl from "./ProjectControl";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/loading">
          <div className="App">
            <Loading />
          </div>
        </Route>
        <Route path="/new">
          <ProjectControl />
        </Route>
        <Route path="/">
          <Container fluid>
            <AboutPage />
          </Container>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
