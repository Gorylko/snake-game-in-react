import React from 'react';
import Logo from './logo'
import Score from './score'
import '../App.css'

export default (props) => {
    return(
        <div className='panel'>
            <Logo />
            <div className="panel-text">Snake Gennady</div>
            <Score value={props.score} />
        </div>
    );
}