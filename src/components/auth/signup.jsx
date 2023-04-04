import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './auth.css';

export default function Signup() {

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
        .then(res => res.json()
        )
        .then(
            data => console.log(data)
        )
        .catch(err => console.log(err))
    };

    return (
        <div className='container1'>
        <div className='container2'>
            <div className='nav'>
                <Link to='/' style={{textDecoration: 'none'}}><h1>Chatty.</h1></Link>
            </div>
            <div className="hero">
                <h5>START FOR FREE</h5>
                <h1>Create new account<span>.</span></h1>
                <h5>Already A Member? <Link to='/login'><span>Log in</span></Link></h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='input-field'>
                    <input 
                        type='text'
                        required
                        value={user.firstname}
                        onChange={e => setUser(prev => ({
                            ...prev, firstname: e.target.value
                        }))}
                    />
                    <label>Firstname</label>              
                </div>

                <div className='input-field'>
                    <input 
                        type='text'
                        required
                        value={user.lastname}
                        onChange={e => setUser(prev => ({
                            ...prev, lastname: e.target.value
                        }))}
                    />
                    <label>Lastname</label>              
                </div>

                <div className='input-field'>
                    <input 
                        type='email'
                        required
                        value={user.email}
                        onChange={e => setUser(prev => ({
                            ...prev, email: e.target.value
                        }))}
                    />
                    <label>Email</label>              
                </div>

                <div className='input-field'>
                    <input 
                        type='text'
                        required
                        value={user.password}
                        onChange={e => setUser(prev => ({
                            ...prev, password: e.target.value
                        }))}
                    />
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
        </div>
    )
}