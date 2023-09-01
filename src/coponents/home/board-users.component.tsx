import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import UserEntity from "../../types/userEntity.type";


type Props = {};

type State = {
  content: UserEntity[] | null;
}

export default class BoardUsers extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: null
    };
  }

  componentDidMount() {
    UserService.getUsersBoard().then(
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
    const listItems = this.state.content?.map((d) =>
      <>
      <td key={d.id}>{d.email}</td>
      <td>{d.fullname}</td>
      <td>{d.contact}</td>
      <td>{d.enabled}</td>
      <td>{d.createdAt}</td></>
    );
    return (
      <div className="container">
        <table>
            <tr>
              <th>Email</th>
              <th>Fullname</th>
              <th>Contact</th>
              <th>Enabled</th>
              <th>Created</th>
            </tr>
            <tr>{listItems}</tr>
          </table>
      </div>
    );
  }
}