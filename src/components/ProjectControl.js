import React from "react";
import CreateProject from "./CreateProject";
import ProjectGallery from "./ProjectGallery";

class ProjectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingProject: false,
    };
  }

  render() {
    if (this.state.creatingProject) {
      return <CreateProject />;
    } else {
      return (
        <>
          <h1>Test</h1>
          {/* <Button onClick={this.handleNewProjectClick}></Button>
          <ProjectGallery /> */}
        </>
      );
    }
  }
}

export default ProjectControl;
