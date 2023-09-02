import { Component } from "react";
import React from "react";
import UserService from "../../../services/UserService";
import UserEntity from "../../../types/userEntity.type";
import EmptyUsersView from "../EmptyUsersView";
import UsersList from "../UsersList";
import { useParams } from "react-router-dom";
import UserDetailsView from "./UserDetailView";


type Props = {};

type State = {
  content: UserEntity | null,
  user?: UserEntity,
  id: number
}

export default class BoardUserDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    

    this.state = {
      content: new Object(),
      user: new Object(),
      id: 0
    };
  }

  componentDidMount() {
    UserService.getUserBoard(this.state.id).then(
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
    let view = null;
    let myEmail = this.state.user?.email;
    let viewableUser = this.state.content;
    if(viewableUser != null){
      view = <UserDetailsView userId= {viewableUser.id} content={viewableUser}/>;
    } else {
      view = <EmptyUsersView />;
    }
    
    return (
      <div className="container">
        {view}
      </div>
    );
  }
}