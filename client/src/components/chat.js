/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

export default function Chat() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT, {transports: ['websocket']});

        setName(name);
        setRoom(room);
        console.log(socket)
        
    },[ENDPOINT, location.search]);

    return (
        <div>
            hey
        </div>
    )
}