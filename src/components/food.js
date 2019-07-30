import React from 'react';
import '../App.css'

export default (props) => {
    const style = {
        left: props.position[0] * props.step,
        top : props.position[1] * props.step
    }
    return(
        <div className="food" style={style}></div>
    );
}