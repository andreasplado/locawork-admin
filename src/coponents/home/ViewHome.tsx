import React from "react";
import { Component } from "react";
import UserService from "../../services/UserService";
import { number } from "yup";

interface Comment{
  id : number,
  jobId: number,
  userId: number,
  comment: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string
}

type Props = {};

type State = {
  comment: Comment[]
}

export default class ViewHome extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      comment:[]
    };
  }

  componentDidMount() {
    UserService.getAllComments().then(
      response => {
        this.setState({
          comment: response.data
        });
      },
      error => {
        this.setState({
          comment:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const listItems = this.state.comment.map((d) =>
    <><p key={d.id}>{d.comment}</p>
    <p>{d.userId}</p>
    <p>Created at: {d.createdAt}</p></>
    );
    return (
      <div className="container">
        <h1>User comments</h1>
        <header className="jumbotron">
          
          <h6>{listItems}</h6>
        </header>
      </div>
    );
  }
}