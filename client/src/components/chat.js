import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io, { Socket } from 'socket.io-client';
import InfoBar from './infoBar';
import Input from './input';
import Messages from './messages'

let socket;

export default function Chat() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
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

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = async (event) => {
        event.preventDefault()

        if (message !== ''){

            const messageData = {
                room: room,
                author: name,
                message: message,
                time: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };

            await socket.emit('send-message', messageData);
        }

    };

    useEffect(() => {
        socket.on('received_message', (data) => {
            console.log(data)
            //setMessages([...messages, message]);
        }) 
    }, []);

    return (
        <div>
            <InfoBar room={room}/>
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    )
}