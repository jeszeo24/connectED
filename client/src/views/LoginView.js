// Source from Jim's AuthAuth demo

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./LoginView.css";


function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(event) {
        let { name, value } = event.target;
        switch (name) {
            case 'usernameInput':
                setUsername(value);
                break;
            case 'passwordInput':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.loginCb(username, password);
    }

    return (
        <div className="LoginView row">
            <div className="col-4 offset-4">
                <h1>Login</h1>
                
                {
                    props.loginError && (
                        <div className="alert alert-danger">{props.loginError}</div>
                    )
                }

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username
                            <input
                                type="text"
                                name="usernameInput"
                                required
                                className="form-control"
                                value={username}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Password
                            <input
                                type="password"
                                name="passwordInput"
                                required
                                className="form-control"
                                value={password}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
            <nav className="LoginViewRegisterNav">
        <Link className="LoginViewRegister" to="/register">
          Don't have an account yet? Register here
        </Link>
      </nav>
        </div>
    );

}

export default LoginView;