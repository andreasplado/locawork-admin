
import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import UserEntity from "../../types/userEntity.type";
import JobEntity from "../../types/jobEntity.type";


type Props = {
    listItems : JobEntity[] | [];
};

export default class JobList extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      listItems: null
    };
  }
  render(){
    const listItems = Array.from(this.props.listItems).map((d) =>
    <>
        <tr>
            <td key={d.id}>{d.title}</td>
            <td>{d.description}</td>
            <td>{d.user_id}</td>
            <td>{d.applyer_id}</td>
            <td>LONG: {d.longitude}, LAT: {d.latitude}</td>
            <td>{d.is_done}</td>
            <td>{d.createdAt}</td>
            <td>{d.updatedAt}</td>
        </tr>
    </>
    
  );
    return<>
      <table>
        <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Adder ID</th>
        <th>Applyer ID</th>
        <th>Coordinates</th>
        <th>Is done?</th>
        <th>Created</th>
        <th>Updated</th>
        </tr>
        {listItems}
        </table>
    </>
  }
}
