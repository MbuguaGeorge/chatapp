import React, {} from 'react';
import {Link} from 'react-router-dom';
import chatty from './img/chatty.png';

export default function Home() {
    return (
        <div className='home'>
            <div className="nav">
                <h1>Chatty.</h1>
                <Link to='/signup'><button>Create Account</button></Link>
            </div>

            <div className="home-hero">
                <h2>Connect <span>with your team.</span></h2>
                <p>Chatty is a messaging tool that will help your team
                 connect with everyone in an easy and comfortable way.
                </p>
                <img src={chatty} alt='chat' />
            </div>
        </div>
    )
}