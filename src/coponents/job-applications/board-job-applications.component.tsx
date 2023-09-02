import { Component } from "react";
import React from "react";
import JobList from "./JobApplicationsList";
import JobApplicationEntity from "../../types/jobApplicationEntity.type";
import EmptyJobApplicationsView from "./EmptyJobApplicationsView";
import JobApplicationsService from "../../services/JobApplicationsService";
import JobApplicationsList from "./JobApplicationsList";


type Props = {
  userId?: number;
};

type State = {
  content: JobApplicationEntity[] | [];
}

export default class JobApplications extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    if (this.props.userId != null && this.props.userId > 0) {
      JobApplicationsService.getUserJobApplications(this.props.userId).then(
        response => {
          this.setState({
            content: response.data
          });
        },
        error => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      );
    } else {
      JobApplicationsService.getJobApplicationsBoard().then(
        response => {
          this.setState({
            content: response.data
          });
        },
        error => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      );
    }
  }

  render() {
    let view = null;

    if (this.state.content.length > 0) {
      view = <JobApplicationsList listItems={this.state.content} />;
    } else {
      view = <EmptyJobApplicationsView />;
    }

    return (
      <div className="container">
        {view}
      </div>
    );
  }
}