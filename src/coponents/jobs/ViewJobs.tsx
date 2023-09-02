import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import JobsService from "../../services/JobsService";
import JobEntity from "../../types/jobEntity.type";
import JobList from "./JobsList";
import EmptyPostedJobsView from "./EmptyPostedJobsView";


type Props = {
  userId?: number,
  fullName?: string | null
};

type State = {
  content: JobEntity[] | [];
}

export default class JobsView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    if (this.props.userId != null && this.props.userId > 0) {
      JobsService.getUserJob(this.props.userId).then(
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
        });
    } else {
      JobsService.getJobsBoard().then(
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
      view = <JobList listItems={this.state.content} />;
    } else {
      view = <EmptyPostedJobsView fullName={this.props.fullName}/>;
    }

    return (
      <div className="container">
        {view}
      </div>
    );
  }
}