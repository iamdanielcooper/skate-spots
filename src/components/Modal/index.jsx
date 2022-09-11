import React from 'react';

const Modal = ({ shown, closeModal }) => {
    const style = {
        display: shown ? 'block' : 'none',
        background: 'pink',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000000,
    };

    return (
        <div style={style}>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default Modal;
