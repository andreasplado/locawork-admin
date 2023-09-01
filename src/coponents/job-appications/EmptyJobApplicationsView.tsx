
import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import UserEntity from "../../types/userEntity.type";
import JobEntity from "../../types/jobEntity.type";


type Props = {};

type State = {
  content: JobEntity[] | null;
}

export default class EmptyJobApplicationsView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: null
    };
  }
  render(){
    return<>
      <div>
        <h3>Sorry admin!</h3>
        <p>We didnt find any applications for job</p>
      </div>
    </>
  }
}