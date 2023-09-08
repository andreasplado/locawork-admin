import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import IUser from './types/user.type';


import EventBus from "./common/EventBus";
import React from "react";
import JobsView from "./coponents/jobs/ViewJobs";
import ViewHome from "./coponents/home/ViewHome";
import Login from "./coponents/login.component";
import Profile from "./coponents/profile.component";
import AuthService from "./services/AuthService";
import UsersView from "./coponents/users/UsersView";
import ViewJobApplications from "./coponents/job-applications/ViewJobApplications";
import logo from './assets/logo.svg'; 
import BoardUserDetails from "./coponents/users/user/BoardUserDetails";

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.role.includes("ROLE_MODERATOR"),
        showAdminBoard: user.role.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
          <img src={logo} />&nbsp; &nbsp; &nbsp; 
          <small>Locawork admin panel</small>
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <>
                <li className="nav-item">
                  <Link to={"/users"} className="nav-link">
                    Locawork users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/jobs"} className="nav-link">
                    Jobs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/job-applications"} className="nav-link">
                    Job applications
                  </Link>
                </li>
              </>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.email}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ViewHome />} />
            <Route path="/home" element={<ViewHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<JobsView userId={0}/>} />
            <Route path="/users" element={<UsersView />} />
            <Route path="/job-applications" element={<ViewJobApplications />} />
            <Route path='/user/:id' element={<BoardUserDetails />} />
          </Routes>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;