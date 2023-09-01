import { Formik, Field, Form, ErrorMessage } from "formik";
import React from "react";
import { Component } from "react";
import * as Yup from "yup";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg'; 



type Props = {
  slogan: string
};

type State = {
  slogan: string
};


export default class LogoComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      slogan: ""
    };

  }


  render() {

    return (
      <>
      <div className="d-flex justify-content-center">
        <img src={logo} /><br />
        <p>{this.props.slogan}</p>
      </div>
      </>
    );
  }
}