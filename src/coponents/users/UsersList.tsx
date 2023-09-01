
import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import UserEntity from "../../types/userEntity.type";
import JobEntity from "../../types/jobEntity.type";


type Props = {
  listItems: UserEntity[] | [];
};

export default class UsersList extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: null
    };
  }
  render() {
    const listItems = this.props.listItems?.map((d) =>
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