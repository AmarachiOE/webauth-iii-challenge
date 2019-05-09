import React from "react";
import axios from "axios";
import requiresAuth from "../auth/requiresAuth";

class Users extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    const endpoint = "http://localhost:5000/api/users";

    axios
      .get(endpoint)
      .then(res => {
        console.log("RES.DATA:", res.data); // where is the array data actually located on res.data??!?! on res.data.users? CHECK!!!
        this.setState({ users: res.data.users });
        console.log("ON STATE:", this.state.users);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <div>
          {this.state.users.map(user => (
            <p key={user.id}>
              {user.username}, {user.department}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default requiresAuth(Users);
