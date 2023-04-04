import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './auth.css';

export default function Login(){

    const [details, setDetails] = useState({
        email: '',
        password: ''
    });
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(details)
        })
        .then(
            res => res.json()
        )
        .then(
            data => console.log(data)
        )
        .catch(err => console.log(err))
    };

    let navigate = useNavigate();

    if(redirect){
        return navigate("/chatty", {replace: true})
    }

    return (
        <div className='container1'>
        <div className='container2'>
            <div className='nav'>
                <Link to='/' style={{textDecoration: 'none'}}><h1>Chatty.</h1></Link>
            </div>
            <div className="hero">
                <h1>Log in<span>.</span></h1>
                <h5>Don't have an account? <Link to='/signup'><span>Register</span></Link></h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='input-field'>
                    <input 
                        type='email'
                        required
                        value={details.email}
                        onChange={(e) => setDetails(prevState => ({
                            ...prevState, email: e.target.value
                        }))}
                    />
                    <label>Email</label>              
                </div>

                <div className='input-field'>
                    <input 
                        type='password'
                        required
                        value={details.password}
                        onChange={(e) => setDetails(prevState => ({
                            ...prevState, password: e.target.value
                        }))}
                    />
                    <label>Password</label>
                </div>

                <div className='empty'>
                    <div>
                        <input 
                        type='submit'
                        value='Sign in'
                        />
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}