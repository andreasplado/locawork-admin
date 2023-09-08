
import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import UserEntity from "../../types/userEntity.type";
import JobEntity from "../../types/jobEntity.type";
import ic_no_data from "../../assets/ic_no_data.svg";


type Props = {
};


export default class EmptyUserSettingsView extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    var content = <p>We didnt find this user settings</p>

    return <>
      <div>
        {content}
      </div>
    </>
  }
}