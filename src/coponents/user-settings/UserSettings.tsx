
import { Component } from "react";
import React from "react";
import JobApplicationEntity from "../../types/jobApplicationEntity.type";
import UserSettingsEntity from "../../types/userSettingsEntity.type";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import UserService from "../../services/UserService";
import UserEntity from "../../types/userEntity.type";

type Props = {
  userEntity: UserEntity;
};

type State = {
  userSettingsEntity: UserSettingsEntity,
  content?: string,
  loading?: boolean,
  message?: string
}

export default class UserSettings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userSettingsEntity: new Object(),
      loading: false
    };
  }

  componentDidMount() {
    if (this.props.userEntity.id != null && this.props.userEntity.id > 0) {
      UserService.getUsersSettingsBoard(this.props.userEntity.id).then(
        response => {
          this.setState({
            userSettingsEntity: response.data
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
  }

  updateUserSettings(formValue: {
    ask_permissions_before_deleting_a_job: boolean,
    currency: string,
    contact: string,
    customer_id: string,
    is_biometric: boolean,
    member_role: string,
    member_start_time: string,
    radius: number,
    show_information_on_startup: boolean,
    status: string,
    view_by_default: string

  }) {
    const { ask_permissions_before_deleting_a_job,
      currency, contact, customer_id, is_biometric,
      member_role, member_start_time, radius,
      show_information_on_startup, status,
      view_by_default
    } = formValue;

    this.setState({
      loading: true,
      message: ""
    });

    const userSettingsEntity = this.state.userSettingsEntity;

    userSettingsEntity.ask_permissions_before_deleting_a_job
      = ask_permissions_before_deleting_a_job;
    userSettingsEntity.currency = currency;
    userSettingsEntity.contact = contact;
    userSettingsEntity.customerId = customer_id;
    userSettingsEntity.isBiometric = is_biometric;
    userSettingsEntity.memberRole = member_role;
    userSettingsEntity.memberStartTime = member_start_time;
    userSettingsEntity.radius = radius;
    userSettingsEntity.showInformationOnStartup = show_information_on_startup;
    userSettingsEntity.status = status;
    userSettingsEntity.viewByDefault = view_by_default

    console.log(JSON.stringify(userSettingsEntity));

    UserService.updateUserSettings(this.props.userEntity.id, userSettingsEntity).then(
      () => {
        window.location.replace("user/");
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

    const userSettings = this.state.userSettingsEntity;
    const initialValues = {
      ask_permissions_before_deleting_a_job: userSettings.ask_permissions_before_deleting_a_job!,
      currency: userSettings.currency!,
      contact: userSettings.contact!,
      customer_id: userSettings.customerId!,
      is_biometric: userSettings.isBiometric!,
      member_role: userSettings.memberRole!,
      member_start_time: userSettings.memberStartTime!,
      radius: userSettings.radius!,
      show_information_on_startup: userSettings.showInformationOnStartup!,
      status: userSettings.status!,
      view_by_default: userSettings.viewByDefault!
    };
    
    console.log(JSON.stringify(initialValues));
    const { loading, message } = this.state;
    const form = <>
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.updateUserSettings}
        enableReinitialize={true}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="ask_permission_before_deleting_a_job">Ask permission before deleting a job</label>
            <Field name="ask_permission_before_deleting_a_job" type="checkbox" className="form-control" checked={this.state.userSettingsEntity.ask_permissions_before_deleting_a_job} />
            <ErrorMessage
              name="ask_permission_before_deleting_a_job"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullname">Currency</label>
            <select
              name="currency"
              value={this.state.userSettingsEntity.currency}
              className="form-control"
            >
              <option value="" label="Select a currency">
                Select a currency{" "}
              </option>
              <option value="euro" label="Euro">
                {" "}
                Euro
              </option>
              <option value="usd" label="Dollar">
                Dollar
              </option>
            </select>
            <ErrorMessage
              name="fullname"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="customer_id">Customer id</label>
            <Field name="customer_id" type="checkbox" className="form-control" disabled />
            <ErrorMessage
              name="customer_id"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="is_biometric">Biometric</label>
            <Field name="is_biometric" type="checkbox" className="form-control" checked={this.state.userSettingsEntity.isBiometric} />
            <ErrorMessage
              name="is_biometric"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="customer_id">Customer id</label>
            <Field name="customer_id" type="text" className="form-control" disabled />
            <ErrorMessage
              name="customer_id"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="member_role">Member role</label>
            <Field name="member_role" type="text" className="form-control" />
            <ErrorMessage
              name="member_role"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="member_start_time">Member start time</label>
            <Field name="member_start_time" type="text" className="form-control" />
            <ErrorMessage
              name="member_start_time"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="radius">Radius</label>
            <Field name="radius" type="text" className="form-control" />
            <ErrorMessage
              name="radius"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="show_information_on_startup">Show information on startup</label>
            <Field name="show_information_on_startup" type="checkbox" className="form-control" />
            <ErrorMessage
              name="show_information_on_startup"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <Field name="status" type="text" className="form-control" />
            <ErrorMessage
              name="status"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="updated_at">Updated</label>
            <Field name="updated_at" type="text" className="form-control" />
            <ErrorMessage
              name="updated_at"
              component="div"
              className="alert alert-danger"
            />
          </div>
          <div className="form-group">
            <label htmlFor="view_by_default">View by default</label>
            <Field name="view_by_default" type="text" className="form-control" />
            <ErrorMessage
              name="view_by_default"
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
    return <>
    {form}
    </>
  }
}