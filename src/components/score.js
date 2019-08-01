import React from 'react';
import '../App.css';

export default (props) => {
    return(
        <div className="score"> Score: {props.value}</div>
    );
}