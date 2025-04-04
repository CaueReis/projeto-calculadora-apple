import React from 'react';
import './Button.css';

const Button = (props) => {
    let classes = 'button ';
    classes += props.operation ? 'operation ' : '';
    classes += props.double ? 'double ' : '';
    classes += props.triple ? 'triple ' : '';

    return (
        <button 
            className={classes.trim()} 
            onClick={() => props.click(props.label)}
        >
            {props.label}
        </button>
    );
};

export default Button;