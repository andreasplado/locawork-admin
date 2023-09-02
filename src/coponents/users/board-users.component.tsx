import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import UserEntity from "../../types/userEntity.type";
import EmptyUsersView from "./EmptyUsersView";
import UsersList from "./UsersList";


type Props = {};

type State = {
  content: UserEntity[] | [];
  user?: UserEntity;
}

export default class BoardUsers extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: [],
      user: new Object()
    };
  }

  componentDidMount() {
    UserService.getUsersBoard().then(
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
    let email = this.state.user?.email;
    var filtered = [...this.state.content].filter(function(el) { return el.email != email; });
    
    if (filtered.length > 0) {
      view = <UsersList listItems={filtered} />;
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