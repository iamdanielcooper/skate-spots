import React from 'react';

const Modal = ({ shown, closeModal, children }) => {
    const style = {
        display: shown ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,.8)',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000000,
    };

    return (
        <div style={style}>
            <div>
                {children}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
