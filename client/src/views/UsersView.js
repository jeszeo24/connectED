// Source from Jim's AuthAuth demo

import React, { useEffect, useState } from 'react';
import Api from '../helpers/Api';
import "./UsersView.css";
import { Link } from "react-router-dom";
import { __esModule } from 'react-modal';


function UsersView(props) {
    const [users, setUsers] = useState([]);
    const [isStaff, setIsStaff] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        let myresponse = await Api.getUsers();
        if (myresponse.ok) {
            setUsers(myresponse.data);
            setErrorMsg('');
        } else {
            setUsers([]);
            setErrorMsg(`Error ${myresponse.status}: ${myresponse.statusText}`);
        }
    }

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!users) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="UsersView">
            <div className='row'>
            <div className='col-sm-6'>
            <h1>Staff</h1>
            <ul>
            {
                users.map(u => (
                <li key={u.id}>
                    <Link to={"/users/"+u.id}>{u.isStaff ? u.username : null}</Link>
                    </li>
                ))
            }
            </ul>
            </div>

            <div className='col-sm-6'>
            <h1>Students</h1>
            <ul>
            {
                users.map(u => (
                <li key={u.id}>
                    <Link to={"/users/"+u.id}>{u.isStaff ? null : u.username}</Link>
                    </li>
                ))
            }
                
            </ul>
            </div>
            </div>
        </div>
    );
}


export default UsersView;