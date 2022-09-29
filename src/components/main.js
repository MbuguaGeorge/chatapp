import React from 'react';
import Chat from './chat';
import Chatty from './chatty';
import Home from './home';
import Signup from './auth/signup';
import {Routes, Route} from 'react-router-dom'

const Main = () => (
    <Routes>
        <Route exact path = "/" element={<Home/>} />
        <Route path = "/chat" element={<Chat/>} />
        <Route exact path='/chatty' element={<Chatty/>} />
        <Route exact path='/signup' element={<Signup />} />
    </Routes>
)

export default Main;