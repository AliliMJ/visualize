import React from 'react';

function NavbarButton(props) {
    const handleClick = props.click;
    return (
        <button className={props.selected?'text-primaryBlue text-2xl p-4 border-b-2 border-primaryBlue  focus:outline-none ' : 'text-black  text-2xl p-4  border-b-2  focus:outline-none hover:bg-gray-200 animate-pulse' } onClick={handleClick} >{props.name}</button>
    );
}


export default NavbarButton;