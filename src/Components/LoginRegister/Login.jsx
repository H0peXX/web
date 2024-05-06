import React, { useState, useEffect } from 'react';
import './LoginRegister.css';
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    axios.defaults.withCredentials = true;  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { username, password })
            .then(result => {
                if (result.data === "user") {
                    navigate('/');
                } else if (result.data === "admin") {
                    navigate('/admin');
                } else {
                    alert(result.data.message);
                    console.log("Login failed");
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container">
            <div className='form-register'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div>
                        <FaUser className='icon' />
                        <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div>
                        <RiLockPasswordFill className='icon' />
                        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type='submit' className='btn btn-primary'>Login</button>

                </form>
                <p>Don't have an account? </p>
                <Link to='/register'><button className='btn btn-primary'>Register</button></Link>
            </div>
        </div>
    );
}

export default Login;
