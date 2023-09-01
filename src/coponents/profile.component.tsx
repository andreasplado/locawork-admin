import { Component } from "react";
import React from "react";
import AuthService from "../services/AuthService";
import IUser from "../types/user.type";
import { redirect } from "react-router-dom";
import UserEntity from "../types/userEntity.type";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  token: string | null,
  userEntity: UserEntity | null
}
export default class Profile extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      token: null,
      userEntity: null
    };
  }

  componentDidMount() {
    this.changeStateFunction();
  }

  changeStateFunction = () => {
    const currentUser = AuthService.getCurrentUser();
    const token = AuthService.getToken();
    this.setState({ userReady: true,  token : token, userEntity: currentUser.userEntity}, function () {
  });
}

  render() {
    if (this.state.redirect) {
      console.log("Redirectis");
      redirect(this.state.redirect);
    }else{
      console.log("Ei redirectingud");
    }

    const currentUser = AuthService.getCurrentUser();
    const token = AuthService.getToken();
    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{this.state.userEntity?.email}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong>{" "}
              {token}
            </p>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser?.id}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser?.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.role}
            </ul>
          </div> : <></>}
      </div>
    );
  }
}