
'use client';


import { Component, useState } from "react";
import React from "react";
import UserEntity from "../../../types/userEntity.type";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserService from "../../../services/UserService";
import * as Yup from "yup";
import JobsView from "../../jobs/ViewJobs";
import ViewJobApplications from "../../job-applications/ViewJobApplications";
import ViewUserSettings from "../../user-settings/ViewUserSettings";

type Props = {
  userEntity: UserEntity,
  userId: number
};

type State = {
  loading: boolean,
  message: string,
  showEditUser: boolean,
  showEditUserSettings: boolean,
  showUserPostedJobs: boolean,
  showUserApplications: boolean
};

export default class UserDetailsView extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      loading: false,
      message: "",
      showEditUser: false,
      showEditUserSettings: false,
      showUserApplications: false,
      showUserPostedJobs: false
    };

  }


  updateUser(formValue: {
    email: string, fullname: string, contact: string
  }) {
    const { email, fullname, contact } = formValue;

    this.setState({
      loading: true,
      message: "",
      showEditUser: true,
      showEditUserSettings: false,
      showUserPostedJobs: false,
      showUserApplications: false
    });


    const modifiedUserEntity = this.props.userEntity

    modifiedUserEntity.email = email;
    modifiedUserEntity.fullname = fullname;
    modifiedUserEntity.contact = contact;

    console.log(JSON.stringify(modifiedUserEntity));

    UserService.updateUserBoard(this.props.userEntity.id, modifiedUserEntity).then(
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
          message: resMessage,
          showEditUser: false
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

  viewMyApplications() {
    this.setState({
      showUserApplications: !this.state.showUserApplications
    });
  }
  viewAddedJobs() {
    this.setState({
      showUserPostedJobs: !this.state.showUserPostedJobs
    });
  }
  viewUserSettings() {
    this.setState({
      showEditUserSettings: !this.state.showEditUserSettings
    });
  }
  viewEditUser() {
    this.setState({
      showEditUser: !this.state.showEditUser
    });
  }


  render() {


    const user = this.props.userEntity;
    const userId = this.props.userId;

    const { loading, message } = this.state;

    const initialValues = {
      email: user.email!,
      fullname: user.fullname!,
      contact: user.contact!,
    };


    let form = <>
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

    let userPostedJobs = <>
      <div id="added-jobs">
        <JobsView userId={this.props.userId} fullName={this.props.userEntity.fullname} />
      </div>
    </>

    let userApplications = <>
      <div id="job-applications">
        <ViewJobApplications userId={this.props.userId} fullName={this.props.userEntity.fullname} />
      </div>
    </>

    let userSettings = <>
      <div id="user-settings">
        <ViewUserSettings userEntity={this.props.userEntity} />
      </div>
    </>

    let viewEditUserText = "Hide edit user";
    let viewEditUserSettingsText = "Hide user settings";
    let viewUserJobsText = "Hide user jobs";
    let viewUserApplicationsText = "Hide user applications";

    if (!this.state.loading) {
      if (this.state.showEditUser) {
        form = <></>
        viewEditUserText = "Show edit user";
      }
      if (!this.state.showEditUserSettings) {
        userSettings = <></>
        viewEditUserSettingsText = "Show user settings";
      }
      if (!this.state.showUserApplications) {
        userApplications = <></>
        viewUserApplicationsText = "Show user job applications"
      }
      if (!this.state.showUserPostedJobs) {
        userPostedJobs = <></>
        viewUserJobsText = "Show user posted jobs"
      }
    }


    return (
      <div className="container">
        <button className="btn btn-primary" onClick={() => this.viewEditUser()}>{viewEditUserText}</button><br /><br />
        {form}
        <button className="btn btn-primary" onClick={() => this.viewUserSettings()}>{viewEditUserSettingsText}</button><br /><br />
        {userSettings}
        <button className="btn btn-primary" onClick={() => this.viewAddedJobs()}>{viewUserJobsText}</button><br /><br />
        {userPostedJobs}
        <button className="btn btn-primary" onClick={() => this.viewMyApplications()}>{viewUserApplicationsText}</button><br /><br />
        {userApplications}

      </div >
    );
  }
}