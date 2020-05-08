import React from "react";
import CreateProjectForm from "./CreateProjectForm";
import ProjectGallery from "./ProjectGallery";
import ProjectDashboard from "./ProjectDashboard";
import ProjectControlMenu from "./ProjectControlMenu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import sampleProject from "./SampleProject";
// const sampleProject = {
//   title: "The Sample Story",
//   isPublished: true,
//   content: [
//     {
//       partId: 1,
//       content: "Once upon a time...This is an example part one contribution.",
//       authorId: "abc123",
//     },
//     {
//       partId: 2,
//       precedingPartId: 1,
//       content: "This is an example middle contribution.",
//       authorId: "def123",
//     },
//     {
//       partId: 3,
//       precedingPartId: 2,
//       content:
//         "This is an example final contribution. And they lived happily ever after.",
//       authorId: "xyz123",
//     },
//   ],
//   id: "randomUID",
// };

class ProjectControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingProject: false,
      selectedProject: null,
    };
  }

  handleCancelClick = () => {
    this.setState({ creatingProject: false, selectedProject: null });
  };

  handleSelectProjectClick = () => {
    alert("Clicked!");
    const project = sampleProject; // eventually search by ID and rebuild relevant info
    this.setState({ selectedProject: project });
  };

  handleCreateProjectClick = () => {
    this.setState({ creatingProject: true });
  };
  handleCreateProjectFormSubmission = (project) => {
    this.setState({ creatingProject: false });
    alert("project was successfully created!");
  };

  render() {
    if (this.state.creatingProject) {
      return (
        <CreateProjectForm
          onCreateProjectFormSubmission={this.handleCreateProjectFormSubmission}
        />
      );
    } else if (this.state.selectedProject != null) {
      return <ProjectDashboard project={this.state.selectedProject} />;
    } else {
      return (
        <>
          <Row>
            <Col md="auto">
              <ProjectControlMenu
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
