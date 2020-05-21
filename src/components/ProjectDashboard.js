import React from "react";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import ProjectDetails from "./ProjectDetails";

function ProjectDashboard(props) {
  const { project, onBackToGalleryClick } = props;
  return (
    <Container fluid>
      {/* <h1 className="display-4">{project.title}</h1> */}
      <ProjectDetails
        project={project}
        onBackToRoomClick={onBackToGalleryClick}
      />
    </Container>
  );
}

ProjectDashboard.propTypes = {
  project: PropTypes.object,
  onBackToGalleryClick: PropTypes.func,
};

export default ProjectDashboard;
