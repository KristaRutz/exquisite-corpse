import React from "react";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

function ProjectDashboard(props) {
  const { project } = props;
  return (
    <Container fluid>
      <h1 className="display-4">{project.title}</h1>
    </Container>
  );
}

ProjectDashboard.propTypes = {
  project: PropTypes.object,
};

export default ProjectDashboard;
