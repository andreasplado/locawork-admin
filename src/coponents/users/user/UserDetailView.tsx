
'use client';


import { Component, useState } from "react";
import React from "react";
import { Button } from 'flowbite-react';
import UserEntity from "../../../types/userEntity.type";
import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-router-dom";
import UserService from "../../../services/UserService";
import * as Yup from "yup";

type Props = {
  content: UserEntity,
  userId: number
};

type State = {
  loading: boolean,
  message: string
};

export default class UserDetailsView extends Component<Props, State> {


  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
      message: ""
    };
  }


  updateUser(formValue: {
    userId: number, content: UserEntity
  }) {
    const { userId, content } = formValue;

    this.setState({
      loading: true,
      message: ""
    });

    
    UserService.updateUserBoard(userId, content).then(
      () => {
        window.location.replace("users");
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

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }


  render() {


    const user = this.props.content;
    const userId = this.props.userId;

    const { loading, message } = this.state;

    const initialValues = {
      userId: userId,
      content: user,
      loading : false,
      message: ""
    };

    const data = <>
     <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
              onSubmit={this.updateUser}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="text" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="fullname">Fullname</label>
                  <Field name="fullname" type="text" className="form-control" />
                  <ErrorMessage
                    name="fullname"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="contact">Contact</label>
                  <Field name="contact" type="text" className="form-control" />
                  <ErrorMessage
                    name="contact"
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
      </>
  
    return (
      <div className="container">
        <table>
          <tr>
            <th>Email</th>
            <th>Fullname</th>
            <th>Contact</th>
            <th>Enabled</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
          {data}
        </table>
      </div >
    );
  }
}