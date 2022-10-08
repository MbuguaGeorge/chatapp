import React from 'react';
import './auth.css';

export default function Signup() {
    return (
        <div className='container1'>
            <div className='nav'>
                <h1>Chatty.</h1>
            </div>
            <div className="hero">
                <h5>START FOR FREE</h5>
                <h1>Create new account<span>.</span></h1>
                <h5>Already A Member? Login</h5>
            </div>
            <form>
                <div className='input-field'>
                    <input 
                        type='text'
                        required
                    />
                    <span></span>
                    <label>Username</label>              
                </div>

                <div className='input-field'>
                    <input 
                        type='text'
                        required
                    />
                    <span></span>
                    <label>Email</label>              
                </div>

                <div className='input-field'>
                    <input 
                        type='text'
                        required
                    />
                    <span></span>
                    <label>Password</label>              
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
    )
}