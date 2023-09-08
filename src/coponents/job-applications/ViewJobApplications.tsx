import { Component } from "react";
import React from "react";
import JobList from "./JobApplicationsList";
import JobApplicationEntity from "../../types/jobApplicationEntity.type";
import EmptyJobApplicationsView from "./EmptyJobApplicationsView";
import JobApplicationsService from "../../services/JobApplicationsService";
import JobApplicationsList from "./JobApplicationsList";


type Props = {
  userId?: number;
  fullName?: string | null;
};

type State = {
  jobAppliccationsEntity: JobApplicationEntity[] | [];
}

export default class ViewJobApplications extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      jobAppliccationsEntity: []
    };
  }

  componentDidMount() {
    this.state = {
      jobAppliccationsEntity: []
    };
    if (this.props.userId != null && this.props.userId > 0 && this.state.jobAppliccationsEntity == null) {
      JobApplicationsService.getUserJobApplications(this.props.userId).then(
        response => {
          this.setState({
            jobAppliccationsEntity: response.data
          });
        },
        error => {
          this.setState({
            jobAppliccationsEntity:
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
            jobAppliccationsEntity: response.data
          });
        },
        error => {
          this.setState({
            jobAppliccationsEntity:
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

    if (this.state.jobAppliccationsEntity.length > 0) {
      view = <JobApplicationsList listItems={this.state.jobAppliccationsEntity} />;
    } else {
      view = <EmptyJobApplicationsView fullName={this.props.fullName} />;
    }

    return (
      <div className="container">
        {view}
      </div>
    );
  }
}