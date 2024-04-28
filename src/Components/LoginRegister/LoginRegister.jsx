import React, { useState } from 'react'
import './LoginRegister.css'
import { FaUser } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa6";
const LoginRegister = () => {
        
    const [action, setAction] = useState('');

    const registerLink = () => {
            setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

  return (
    <div className={`wrapper ${action}`}>
        <div className='form-login'>
            <form action="">
                <h1>Login</h1>
                <div className='input-box'>
                <FaUser className='icon' />
                <input type='text' placeholder='Username' required/>
                
                </div>
                <div className='input-box'>
                <RiLockPasswordFill className='icon'/>
                <input type='password' placeholder='Password' required/>
                
                </div>

                <div className='remember-forget'>
                    <label><input type="checkbox"/>Remember me</label><br/>
                    <a href="#">Frogot password</a>
                </div>

                <button type='submit'>Login</button>
                <div className='register-link'>
                <p>Don't have account? <a href='#' onClick={registerLink}> Register here</a></p>
                    
                </div>
            </form>
        </div>


        <div className='form-register'>
            <form action="">
                <h1>Register</h1>

                {/* First name*/}
                <div className='input-box'>
                <FaUser className='icon' />
                <input type='text' placeholder='First name' required/>
                </div>

                {/* Last name*/}
                <div className='input-box'>
                <FaUser className='icon' />
                <input type='text' placeholder='Last name' required/>
                </div>
                
                {/* Email*/}
                <div className='input-box'>
                <MdEmail className='icon'/>
                <input type='email' placeholder='Email' required/>
                </div>

                {/* Address*/}
                <div className='input-box'>
                <FaWallet className='icon' />
                <input type='text' placeholder='Wallet Address' required/>
                </div>

                {/* Phone*/}
                <div className='input-box'>
                <FaPhone className='icon' />
                <input type='text' placeholder='Phone number' required/>
                </div>

                {/* username*/}
                <div className='input-box'>
                <FaUser className='icon' />
                <input type='text' placeholder='Username' required/>
                </div>

                {/* Password*/}
                <div className='input-box'>
                <RiLockPasswordFill className='icon'/>
                <input type='password' placeholder='Password' required/>
                </div>

                <div className='remember-forget'>
                    <label><input type="checkbox"/>I agree to the privacy policy</label><br/>
                    
                </div>

                <button type='submit'>Register</button>
                <div className='register-link'>
                <p>Don't have account? <a href='#' onClick={loginLink}> Login</a></p>
                </div>

            </form>
        </div>

    </div>
  );
};

export default LoginRegister;