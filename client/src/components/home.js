import React, {useState} from 'react';


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
                        />
                        <input 
                            type = 'text'
                            name = 'room'
                            placeholder='Enter room...'
                        />
                    </form>
                    <button>Join Chat</button>
                </div>
            </div>
        </div>
    )
}