
import { Component } from "react";
import React from "react";
import JobApplicationEntity from "../../types/jobApplicationEntity.type";


type Props = {
    listItems : JobApplicationEntity[] | null;
};

export default class JobApplicationsList extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }
  render(){
    const listItems = this.props.listItems?.map((d) =>
    <>
    <td key={d.id}>{d.id}</td>
    <td>{d.job_id}</td>
    <td>{d.user_id}</td>
    <td>{d.is_approved}</td>
    <td>{d.createdAt}</td>
    <td>{d.updatedAt}</td>
    </>
    
  );
    return<>
      <table>
        <tr>
        <th>Job application ID</th>
        <th>Job ID</th>
        <th>Job poster ID</th>
        <th>Approved application</th>
        <th>Created</th>
        <th>Updated</th>
        </tr>
        <tr>{listItems}</tr>
        </table>
    </>
  }
}