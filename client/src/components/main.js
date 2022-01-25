import React from 'react';
import Chat from './chat'
import Home from './home'
import {Routes, Route} from 'react-router-dom'

const Main = () => (
    <Routes>
        <Route exact path = "/" element={<Home/>} />
        <Route path = "/chat" element={<Chat/>} />
    </Routes>
)

export default Main;