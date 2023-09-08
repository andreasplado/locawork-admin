
'use client';


import { Component, useState } from "react";
import React from "react";
import UserEntity from "../../types/userEntity.type";

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

    console.log(this.props.listItems);

    const listItems = Array.from(this.props.listItems).map((d) =>
      <>
        <tr>
          <td key={d.id}>{d.email}</td>
          <td>{d.fullname}</td>
          <td>{d.contact}</td>
          <td>{d.role}</td>
          <td>{d.enabled ? (
            <>Yes</>
          ) : (
            <>No</>
          )}</td>
          <td>{d.addsRemoved ? (
            <>Yes</>
          ) : (
            <>No</>
          )}</td>
          <td>{d.expired ? (
            <>No</>
          ) : (
            <>Yes</>
          )}</td>
          <td>{d.createdAt}</td>

          <td>
            <button onClick={() => window.location.replace("user/" + d.id)} className="btn btn-primary btn-block">Edit</button>
            <br />
            <button onClick={() => window.location.replace("user/" + d.id)} className="btn btn-primary btn-block">Delete</button>
          </td>
        </tr>
      </>
    );
    return (
      <div className="container">
        <table>
          <tr>
            <th>Email</th>
            <th>Fullname</th>
            <th>Contact</th>
            <th>Role</th>
            <th>Enabled</th>
            <th>Adds</th>
            <th>Expired</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
          {listItems}
        </table>
      </div >
    );
  }
}