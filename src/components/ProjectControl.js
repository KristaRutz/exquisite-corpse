import React from "react";
import CreateProjectForm from "./CreateProjectForm";
import ProjectGallery from "./ProjectGallery";
import ProjectMenu from "./ProjectMenu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ProjectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingProject: false,
    };
  }

  handleSelectProjectClick = () => {
    alert("Clicked!");
  };

  handleCreateProjectClick = () => {
    this.setState({ creatingProject: true });
  };

  render() {
    if (this.state.creatingProject) {
      return <CreateProjectForm />;
    } else {
      return (
        <>
          <Row>
            <Col md="auto">
              <ProjectMenu
                onCreateProjectClick={this.handleCreateProjectClick}
              />
            </Col>
            <Col>
              <ProjectGallery
                onSelectProjectClick={this.handleSelectProjectClick}
              />
            </Col>
          </Row>
        </>
      );
    }
  }
}

export default ProjectControl;
