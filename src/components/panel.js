import React from 'react';
import Logo from './logo'
import '../App.css'

export default (props) => {
    return(
        <div className='panel'>
            <Logo />
            <div className="panel-text">Snake Gennady</div>
        </div>
    );
}