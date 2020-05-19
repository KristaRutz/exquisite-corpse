import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import AboutPage from "./About";
import Header from "./Header";
import Loading from "./Loading";
import {
  BrowserRouter,
  Switch,
  Route,
  matchPath,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import ProjectControl from "./ProjectControl";
import CreateRoomForm from "./CreateRoomForm";
import SignInForm from "./LogInForm";
import Room from "./Room";
import AccountControl from "./AccountControl";

function App() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/room/:id">
          <RoomRouting />
        </Route>
        <Route path="/room">
          <Room />
        </Route>
        <Route path="/loading">
          <div className="App">
            <Loading />
          </div>
        </Route>
        <Route path="/new">
          <CreateRoomForm />
        </Route>
        <Route path="/account">
          <AccountControl />
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

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { auth, profile } }) => ({
    auth,
    profile,
  })
);
enhance(App);

export default App;

function RoomRouting() {
  let { id } = useParams();
  return <Room roomId={id} />;
}
