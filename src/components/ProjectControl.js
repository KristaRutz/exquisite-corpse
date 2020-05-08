import React from "react";
import CreateProject from "./CreateProject";
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

  render() {
    if (this.state.creatingProject) {
      return <CreateProject />;
    } else {
      return (
        <>
          <Row>
            <Col md="auto">
              <ProjectMenu />
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
