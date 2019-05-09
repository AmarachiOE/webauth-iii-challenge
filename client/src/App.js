// Packages
import React from "react";
import { Route, NavLink, withRouter } from "react-router-dom";

// Components
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Users from "./users/Users";
import "./App.css";

function App(props) {
  function logout() {
    localStorage.removeItem('jwt');
    props.history.push("/signin");
  }

  return (
    <div className="App">
      <header>
        <NavLink to="/signup">Sign Up</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/signin">Sign In</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/users">Users</NavLink>
        &nbsp;|&nbsp;
        <button onClick={logout}>Sign Out</button>
      </header>
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/users" component={Users}/>
    </div>
  );
}

export default withRouter(App);
