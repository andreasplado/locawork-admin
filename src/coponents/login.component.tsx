import { Formik, Field, Form, ErrorMessage } from "formik";
import React from "react";
import { Component } from "react";
import * as Yup from "yup";
import AuthService from "../services/AuthService";
import LogoComponent from "./logo.component";

 
  
  type Props = {};
  
  type State = {
    username: string,
    password: string,
    loading: boolean,
    message: string
  };

  
  export default class Login extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);

      this.state = {
        username: "",
        password: "",
        loading: false,
        message: ""
      };
    }

  
    validationSchema() {
      return Yup.object().shape({
        username: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
      });
    }
  
    handleLogin(formValue: { username: string; password: string }) {
      const { username, password } = formValue;
  
      this.setState({
        message: "",
        loading: true
      });
  
      
      AuthService.login(username, password).then(
        () => {
          window.location.replace("profile");
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    }
  
    render() {
      const { loading, message } = this.state;
      
      const initialValues = {
        username: "",
        password: "",
      };
  
      return (
        <div className="col-md-12">
          <div className="card card-container">
            <LogoComponent slogan="Click locate and appy"/>
  
            <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
              onSubmit={this.handleLogin}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
  
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button>
                </div>
  
                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
      );
    }
  }