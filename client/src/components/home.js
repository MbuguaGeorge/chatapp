import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className='chat'>
            <div className='chat__border'>
                <div className='chat__header'>
                    <h3>ChatCord</h3>
                </div>
                <div className='chat__body'>
                    <form>
                        <input 
                            type = 'text'
                            name = 'username'
                            placeholder='Enter name'
                            onChange={(event) => setName(event.target.value)}
                        />
                        <input 
                            type = 'text'
                            name = 'room'
                            placeholder='Enter room...'
                            onChange={(event) => setRoom(event.target.value)}
                        />
                    </form>
                    <Link onClick={(event) => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button type="submit">Join Chat</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}