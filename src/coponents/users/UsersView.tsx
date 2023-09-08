import { Component } from "react";
import UserService from "../../services/UserService";
import React from "react";
import UserEntity from "../../types/userEntity.type";
import EmptyUsersView from "./EmptyUsersView";
import UsersList from "./UsersList";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";


type Props = {};

type State = {
  users: UserEntity[] | [];
  user?: UserEntity;
  loading?: boolean,
  message?: string,
  searchLoading?: boolean,
  searchMessage?: string
}

export default class UsersView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.searchUser = this.searchUser.bind(this);

    this.state = {
      users: [],
      user: new Object()
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }


  getAllUsers() {
    UserService.getUsersBoard().then(
      response => {
        this.setState({
          users: response.data
        });
      },
      error => {
        this.setState({
          users:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  searchUser(searchValue: any) {

    if (searchValue.target.value.length != 0) {
      UserService.searchUser(searchValue.target.value).then(
        response => {
          console.log(response);
          this.setState({
            users: response.data
          });
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
    } else {
      this.getAllUsers();
    }


  }


  validationSchema() {
    return Yup.object().shape({
      serchValue: Yup.string().required("This field is required!"),
    });
  }

  render() {
    const initialValues = { searchValue: "" }
    const { searchLoading, searchMessage } = this.state;
    const searchForm = <>
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        enableReinitialize={true}
        onSubmit={this.searchUser}
      >
        <Form>
          <div className="form-group">
            <Field name="searchvalue" type="text" className="form-control" onChange={(evt: any) => this.searchUser(evt)} />
            <ErrorMessage
              name="searchvalue"
              component="div"
              className="alert alert-danger"
            />
          </div>
          {searchLoading && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {searchMessage}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </>
    let view = null;
    let email = this.state.user?.email;
    var filtered = [...this.state.users].filter(function (el) { return el.email != email; });

    if (filtered.length > 0) {
      view = <UsersList listItems={filtered} />;
    } else {
      view = <EmptyUsersView />;
    }



    return (

      <div className="container">
        {searchForm}
        {view}
      </div>
    );
  }
}