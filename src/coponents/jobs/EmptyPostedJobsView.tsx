
import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import UserEntity from "../../types/userEntity.type";
import JobEntity from "../../types/jobEntity.type";
import ic_no_data from "../../assets/ic_no_data.svg";


type Props = {
  fullName?: string | null
};

type State = {
  jobEntity: JobEntity[] | null;
}

export default class EmptyPostedJobsView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      jobEntity: null
    };
  }
  render() {
    var content;
    if (this.props.fullName != null) {
      content = <p>We didnt find any posted job for {this.props.fullName}</p>
    } else {
      content = <>
        <img src={ic_no_data} />
        <p>We didnt find any posted job</p>
      </>
    }
    return <>
      <div>
        {content}
      </div>
    </>
  }
}