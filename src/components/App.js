import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import AboutPage from "./About";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import ProjectsControl from "./ProjectsControl";
import CreateRoomForm from "./CreateRoomForm";
import Room from "./Room";
import AccountControl from "./AccountControl";
import LoadingScreen from "./LoadingScreen";

function App() {
  //const firebase = useFirebase();
  //const auth = useSelector((state) => state.firebase.auth);

  function AuthIsLoaded({ children }) {
    const auth = useSelector((state) => state.firebase.auth);
    if (!isLoaded(auth)) return <LoadingScreen />;
    return children;
  }
  return (
    <BrowserRouter>
      <Header />
      <AuthIsLoaded>
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
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
            <ProjectsControl />
          </Route>
        </Switch>
      </AuthIsLoaded>
      <Footer />
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
