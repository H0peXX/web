import React, { useState ,useEffect } from 'react';
import './LoginRegister.css'
import { FaUser } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:3001')
        .then( res => {
            if(res.data.valid){
                navigate('/')
            }else{
                navigate('/login')
            }
        })
        .catch(err => console.log(err))

    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { username, password })
            .then(result => {
                if (result.data === "user") {
                    navigate('/');

                }
                else if (result.data === "admin"){
                    navigate('/admin');
                }else {
                    console.log("Fail");
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
                        <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div>
                        <RiLockPasswordFill className='icon' />
                        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type='submit' className='btn btn-primary'>Login</button>

                </form>
                <p>Don't have an account? </p>
                <Link to='/register'><button className='btn btn-primary'>Register</button></Link>
            </div>
        </div>
    );
};
export default Login;
