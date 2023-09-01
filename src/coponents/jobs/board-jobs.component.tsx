import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import JobsService from "../../services/JobsService";
import JobEntity from "../../types/jobEntity.type";
import JobList from "./JobsList";
import EmptyPostedJobsView from "./EmptyPostedJobsView";


type Props = {};

type State = {
  content: JobEntity[] | [];
}

export default class BoardJobs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
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

  render() {
    let view = null;
    
    if (this.state.content.length > 0) {
      view = <JobList listItems={this.state.content} />;
    } else {
      view = <EmptyPostedJobsView />;
    }
    
    return (
      <div className="container">
        {view}
      </div>
    );
  }
}