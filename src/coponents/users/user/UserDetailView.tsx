
'use client';


import { Component, useState } from "react";
import React from "react";
import UserEntity from "../../../types/userEntity.type";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserService from "../../../services/UserService";
import * as Yup from "yup";
import BoardJobs from "../../jobs/board-jobs.component";
import JobApplications from "../../job-applications/board-job-applications.component";

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
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      loading: false,
      message: ""
    };

  }


  updateUser(formValue: {
    email: string, fullname: string, contact: string
  }) {
    const { email, fullname, contact } = formValue;

    this.setState({
      loading: true,
      message: ""
    });

    const modifiedUserEntity = this.props.content

    modifiedUserEntity.email = email;
    modifiedUserEntity.fullname = fullname;
    modifiedUserEntity.contact = contact;

    console.log(JSON.stringify(modifiedUserEntity));

    UserService.updateUserBoard(this.props.userId, modifiedUserEntity).then(
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
      email: Yup.string().required("This field is required!"),
      fullname: Yup.string().required("This field is required!"),
    });
  }


  render() {


    const user = this.props.content;
    const userId = this.props.userId;

    const { loading, message } = this.state;

    const initialValues = {
      email: user.email!,
      fullname: user.fullname!,
      contact: user.contact!,
    };


    const form = <>
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.updateUser}
        enableReinitialize={true}
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
              <span>Edit</span>
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

    const addedJobs = <>
      <div>
        {this.props.content.fullname} added jobs:
        <BoardJobs userId={this.props.userId} />
      </div>
    </>

    const myApplications = <>
    <div>
      {this.props.content.fullname} job applications:
      <JobApplications userId={this.props.userId} />
    </div>
    </>

    return (
      <div className="container">
        {form}
        {addedJobs}
        {myApplications}
      </div >
    );
  }
}