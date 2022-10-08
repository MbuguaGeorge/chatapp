import React from 'react';
import './auth.css';
import EmailIcon from '@mui/icons-material/Email';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Signup() {
    return (
        <div className='container1'>
        <div className='container2'>
            <div className='nav'>
                <h1>Chatty.</h1>
            </div>
            <div className="hero">
                <h5>START FOR FREE</h5>
                <h1>Create new account<span>.</span></h1>
                <h5>Already A Member? <span>Log in</span></h5>
            </div>
            <form>
                <div className='input-field'>
                    <input 
                        type='text'
                        required
                    />
                    <label>Username</label>              
                    <span><AccountBoxIcon /></span>
                </div>

                <div className='input-field'>
                    <input 
                        type='text'
                        required
                    />
                    <label>Email</label>              
                    <span><EmailIcon /></span>
                </div>

                <div className='input-field'>
                    <input 
                        type='text'
                        required
                    />
                    <label>Password</label>
                    <span><VisibilityIcon /></span>
                </div>

                <div className='empty'>
                    <div>
                        <input 
                        type='submit'
                        value='Create account'
                        />
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}