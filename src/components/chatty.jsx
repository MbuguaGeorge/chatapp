import React, {useState, useEffect} from 'react';
import avatar from './img/avatar.jpg';
import dev from './img/dev.jpg';
import AddIcon from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';

import {io} from "socket.io-client";

export default function Chatty() {
    const [email, setEmail] = useState(null);           // state to hold emails for current users
    const [userSenderID, setUserSenderID] = useState(null);
    const [userReceiverID, setUserReceiverID] = useState(null);     // state to display chats of selected user
    const [customers, setCustomers] = useState([]);     // state for all users in database
    const [socket, setSocket] = useState(null);

    const [curMessage, setCurMessage] = useState('');   
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchUsers(){
            const users = await fetch('http://127.0.0.1:8000/profile/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })

            const res = await users.json()
            setCustomers(res)
        };

        async function fetchData(){
            const data = await fetch('http://127.0.0.1:8000/profile/cur', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })

            const res = await data.json()
            const useremail = res.map(em => em.email)
            setEmail(useremail[0])
        };

        fetchUsers();
        fetchData();
    }, []);

    useEffect(() => {
        if(email){
            const pk = customers.find(id => {
                return id.email === email
            })
            setUserSenderID(pk)
        }

    },[email, customers]);

    useEffect(() => {
        const URL = "http://localhost:5000/";
        if (socket === null){
            setSocket(io(URL, {transports: ['websocket']}))
        };

        if(socket){
            if (userSenderID !== null && userSenderID !== undefined){
                socket.emit("addUser", userSenderID.id);
            }

            socket.on("getUsers", users => {
                console.log(users)
            });
        };

    
    }, [socket, userSenderID])

    useEffect(() => {
        if(socket){
            socket.on('received_message', (content) => {
                console.log(content)
                setMessages((msgs) => [...msgs, content]);
            });
        }

    }, [socket]);

    const sendMessage = async (event) => {
        event.preventDefault()

        if (curMessage !== ''){
            // const receiverID = customers.find(user => user.id === userReceiverID)

            const messageData = {
                content: curMessage,
                receiverID: userReceiverID,
                senderID: userSenderID,
            };
            await socket.emit('sendMessage', messageData);
            setMessages((msgs) => [...msgs, messageData]);
            setCurMessage("")
        }

    };

    return (
        <div className='container'>
            <div className='row no-gutters'>
                <div className='col-md-4 border-right'>
                    <div className='settings-tray'>
                        <img className='profile-image' src={avatar} alt='profile'/>
                        {email !== null &&
                            <h5>{email}</h5>
                        }
                        <span className='settings-tray--right float-right'>
                        <i className="material-icons"><AddIcon /></i>
                        </span>
                    </div>
                    <div className="search-box">
                        <div className="input-wrapper">
                            <i className="material-icons"><Search/></i>
                            <input type="text" className="text" placeholder="Search here"/>
                        </div>
                    </div>
                    {/* <ScrollToBottom className="msg-container"> */}
                    {customers.filter(custom => (custom.email !== email)).map((customer, index) => 
                        <>
                            <div className="friend-drawer friend-drawer--onhover" key={index} onClick={() => {
                                setUserReceiverID(customer.id)
                            }}>
                                <img src={dev} alt="profile" className="profile-image" />
                                <div className="text">
                                    <h6>{customer.email}</h6>
                                    <p>Network security</p>
                                </div>
                                <span className="time small">17.00</span>
                            </div>
                            <hr style={{margin: '5px auto'}}/>
                        </>
                    )}
                    {/* </ScrollToBottom> */}
                </div>
                <div className="col-md-8">
                    <div className="friend-drawer no-gutters friend-drawer--grey">
                        <img src={dev} alt="profile" className='profile-image'/>
                        <div className="text">
                            <h6>Gilfoyle</h6>
                            <p>Network security</p>
                        </div>
                    </div>

                    <form>
                        <div className="chat-panel">
                        {messages.map((content, i) => {
                            return (
                            <div className="row no-gutters" key={i}>
                                <div className={userSenderID.id === content.senderID.id ? "col-md-3 offset-md-9" : "col-md-3"}>
                                    <div className={userSenderID.id === content.senderID.id ? "chat-bubble chat-bubble--blue chat-bubble--right" : "chat-bubble chat-bubble--left"}>
                                        <p>{content.content}</p>
                                    </div>
                                </div>
                            </div>)
                        })}
                            <div className="row">
                                <div className="col-12">
                                    <div className="chat-box-tray">
                                        <i className="material-icons"><SentimentSatisfiedAltIcon /></i>
                                        <input type="text" className="text" placeholder='Type your message here...'
                                            value = {curMessage}
                                            onChange = {(event) => setCurMessage(event.target.value)}
                                            onKeyPress = {event => event.key === 'Enter' ? sendMessage(event) : null}
                                        />
                                        <i className="material-icons"><MicIcon /></i>
                                        <i className="material-icons" style={{marginLeft: '10px'}}><SendIcon /></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}