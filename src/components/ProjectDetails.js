import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

function ProjectDetails(props) {
  const { project, onBackToRoomClick } = props;
  if (project.isPublished) {
    return (
      <Container>
        <h1 className="display-4" style={styles.headerMargin}>
          <em>{project.title}</em>
        </h1>
        {/* {project.fragments.length > 0 ? (
        <>
          <h2 style={styles.headerMargin}>The story so far...</h2>
          <p>Here's what others have contributed!</p>
        </>
      ) : (
        <></>
      )} */}
        <Accordion defaultActiveKey="0">
          {project.fragments.map((fragment, index) => {
            // if (index === project.fragments.length - 1) {
            return (
              <Card key={index}>
                {/* <Accordion.Toggle as={Card.Header} eventKey="0">
                <h5>
                  Part {index + 1}, by {fragment.authorId}
                </h5>
              </Accordion.Toggle> */}
                <Accordion.Collapse eventKey="0">
                  <Card.Body>{fragment.content}</Card.Body>
                </Accordion.Collapse>
              </Card>
            );
            // } else {
            //   return (
            //     <Card key={index} bg="light" text="muted">
            //       <Card.Header>
            //         <h5>
            //           Part {index + 1}, by {fragment.authorId}
            //         </h5>
            //       </Card.Header>
            //     </Card>
            //   );
            // }
          })}
        </Accordion>
      </Container>
    );
  } else {
    return (
      <>
        <h1>This project hasn't been published yet!</h1>
      </>
    );
  }
}

const styles = {
  headerMargin: {
    marginTop: "1em",
  },
};
ProjectDetails.propTypes = {
  project: PropTypes.object,
  onBackToRoomClick: PropTypes.func,
};

export default ProjectDetails;
