import React from 'react';
import avatar from './img/avatar.jpg';
import dev from './img/dev.jpg';
import dev1 from './img/dev1.jpg';
import dev2 from './img/dev2.jpg';
import dev3 from './img/dev3.jpg';
import AddIcon from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export default function Chatty() {
    return (
        <div className='container'>
            <div className='row no-gutters'>
                <div className='col-md-4 border-right'>
                    <div className='settings-tray'>
                        <img className='profile-image' src={avatar} alt='profile'/>
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
                    <div className="friend-drawer friend-drawer--onhover">
                        <img src={dev} alt="profile" className="profile-image" />
                        <div className="text">
                            <h6>Gilfoyle</h6>
                            <p>Network security</p>
                        </div>
                        <span className="time small">17.00</span>
                    </div>
                    <hr style={{margin: '5px auto'}}/>
                    <div className="friend-drawer friend-drawer--onhover">
                        <img src={dev1} alt="profile" className="profile-image" />
                        <div className="text">
                            <h6>Dinesh</h6>
                            <p>Java</p>
                        </div>
                        <span className="time small">00.00</span>
                    </div>
                    <hr style={{margin: '5px auto'}}/>
                    <div className="friend-drawer friend-drawer--onhover">
                        <img src={dev2} alt="profile" className="profile-image" />
                        <div className="text">
                            <h6>Richard</h6>
                            <p>Pied piper</p>
                        </div>
                        <span className="time small">07.50</span>
                    </div>
                    <hr style={{margin: '5px auto'}}/>
                    <div className="friend-drawer friend-drawer--onhover">
                        <img src={dev3} alt="profile" className="profile-image" />
                        <div className="text">
                            <h6>Erlich</h6>
                            <p>Aviato</p>
                        </div>
                        <span className="time small">09.00</span>
                    </div>
                    <hr style={{margin: '5px auto'}}/>
                </div>
                <div className="col-md-8">
                    <div className="friend-drawer no-gutters friend-drawer--grey">
                        <img src={dev} alt="profile" className='profile-image'/>
                        <div className="text">
                            <h6>Gilfoyle</h6>
                            <p>Network security</p>
                        </div>
                    </div>
                    <div className="chat-panel">
                        <div className="row no-gutters">
                            <div className="col-md-3">
                                <div className="chat-bubble chat-bubble--left">
                                    Hey, dude!
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-md-3 offset-md-9">
                                <div className="chat-bubble chat-bubble--blue chat-bubble--right">
                                    Hey, dude!
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="chat-box-tray">
                                    <i className="material-icons"><SentimentSatisfiedAltIcon /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}