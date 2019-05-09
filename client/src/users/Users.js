import React from 'react';
import axios from 'axios';

import requiresAuth from "../auth/requiresAuth";

class Users extends React.Component {
    state = {
        users: [],
    }

    componentDidMount() {
        const endpoint = "http://localhost:5000/api/users";

        axios.get(endpoint).then().catch();

    }

    render() {
        return (
            <div>
                <h2>Users</h2>
            </div>
        )
    }
}

export default requiresAuth(Users);