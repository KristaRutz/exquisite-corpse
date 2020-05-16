import React from "react";
import Spinner from "react-bootstrap/Spinner";

function LoadingScreen() {
  return (
    <div style={styles.centeredOnScreen}>
      <Spinner animation="grow" variant="warning" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

const styles = {
  centeredOnScreen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
};

export default LoadingScreen;
