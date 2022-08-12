import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './infoBar';
import ScrollToBottom from 'react-scroll-to-bottom';

let socket;

export default function Chat() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [curMessage, setCurMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(window.location.search);

        socket = io.connect(ENDPOINT, {transports: ['websocket']});

        setName(name);
        setRoom(room);
       
        socket.emit('join', {name, room});

        return() => {
            socket.disconnect();
            socket.off()
        }
        
    },[ENDPOINT]);

    const sendMessage = async (event) => {
        event.preventDefault()

        if (curMessage !== ''){

            const messageData = {
                room: room,
                author: name,
                message: curMessage,
                time: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };

            await socket.emit('send-message', messageData);
            setMessages((msgs) => [...msgs, messageData]);
            setCurMessage("")
        }

    };

    useEffect(() => {
        socket.on('received_message', (data) => {
            setMessages((msgs) => [...msgs, data]);
        }) 
    }, [messages]);

    return (
        <div className='chat-window'>
            <InfoBar room={room}/>
            <div className='chat-body'>
                <ScrollToBottom className='msg-container'>
                {messages.map((content, i) => {
                    return (
                            <div className='msg' key={i} id={name === content.author ? "other" : "me"}>
                                <div>
                                    <div className='msg-cont'>
                                        <p>{content.message}</p>
                                    </div>
                                    <div className='msg--cont'>
                                        <p>{content.time}</p>
                                        <p>{content.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                })}
                </ScrollToBottom>
            </div>
            <div className='footer'>
                <form className='form'>
                    <input 
                        className = 'input'
                        type = 'text'
                        placeholder='Type a message...'
                        value = {curMessage}
                        onChange = {(event) => setCurMessage(event.target.value)}
                        onKeyPress = {event => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                    <button className='sendButton' onClick={(event) => sendMessage(event)}>Send</button>
                </form>
            </div>
        </div>
    )
}