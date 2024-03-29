
import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import UserEntity from "../../types/userEntity.type";
import JobEntity from "../../types/jobEntity.type";
import ic_no_data from "../../assets/ic_no_data.svg";


type Props = {};

type State = {
  content: UserEntity[] | null;
}

export default class EmptyUsersView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: null
    };
  }
  render(){
    return<>
      <div>
        <img src={ic_no_data} />
        <p>We didnt find any registred user</p>
      </div>
    </>
  }
}