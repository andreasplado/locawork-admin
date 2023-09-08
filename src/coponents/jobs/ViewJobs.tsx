import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import JobsService from "../../services/JobsService";
import JobEntity from "../../types/jobEntity.type";
import JobList from "./JobsList";
import EmptyPostedJobsView from "./EmptyPostedJobsView";
import { stat } from "fs";


type Props = {
  userId?: number,
  fullName?: string | null
};

type State = {
  jobEntity: JobEntity[] | [];
}

export default class JobsView extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      jobEntity: []
    };
  }

  componentDidMount() {
    this.setState({
      jobEntity: []
    });
    if (this.props.userId != null && this.props.userId > 0 && this.state.jobEntity == null) {
      JobsService.getUserJob(this.props.userId).then(
        response => {
          this.setState({
            jobEntity: response.data
          });
        },
        error => {
          this.setState({
            jobEntity:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        });
    } else {
      JobsService.getJobsBoard().then(
        response => {
          this.setState({
            jobEntity: response.data
          });
        },
        error => {
          this.setState({
            jobEntity:
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
    

    if (this.state.jobEntity.length > 0) {
      view = <JobList key={this.props.userId} listItems={this.state.jobEntity} />;
    } else {
      view = <EmptyPostedJobsView key={this.props.userId} fullName={this.props.fullName}/>;
    }

    return (
      <div className="container">
        {view}
      </div>
      
    );
  }
}