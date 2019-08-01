import React from 'react';
import '../App.css'

export default (props) => {
        return(
            <div className="snake">
                {props.snakeDots.map((dot, i) => {
                    const style = {
                        left: `${props.step * dot[0]}px`,
                        top: `${props.step * dot[1]}px`
                    }
                    return <div className='snake-dot' key={i} style={style}></div>
                })}
            </div>
        );
}
