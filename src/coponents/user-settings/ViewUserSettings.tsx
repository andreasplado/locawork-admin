import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import JobsService from "../../services/JobsService";
import JobEntity from "../../types/jobEntity.type";
import EmptyPostedJobsView from "./EmptyUserSettingsView";
import UserSettings from "./UserSettings";
import UserEntity from "../../types/userEntity.type";
import UserSettingsEntity from "../../types/userSettingsEntity.type";
import EmptyUserSettingsView from "./EmptyUserSettingsView";


type Props = {
  userEntity?: UserEntity;
};

type State = {
  userSettingsEntity: UserSettingsEntity | null;
  message?: string
}

export default class ViewUserSettings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      userSettingsEntity: new Object(),
    };
  }

  componentDidMount() {
    if (this.props.userEntity!.id != undefined) {
      UserService.getUsersSettingsBoard(this.props.userEntity!.id).then(
        response => {
          this.setState({
            userSettingsEntity: response.data
          });
        },
        error => {
          this.setState({
            userSettingsEntity:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      );
    }
  }

  render() {
    let view = null;

    if (this.props.userEntity?.id != null) {
      view = <UserSettings userEntity={this.props.userEntity} />;
    } else {
      view = <EmptyUserSettingsView />;
    }

    return (
      <div className="container">
        {view}
      </div>
    );
  }
}