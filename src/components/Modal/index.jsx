import React from 'react';
import styles from './style.module.css';

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

    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a
        // typescript error too.
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...child.props, closeModal });
        }
        return child;
    });

    return (
        <div style={style}>
            <div>
                {childrenWithProps}
                <button className={styles.close} onClick={closeModal}>
                    X
                </button>
            </div>
        </div>
    );
};

export default Modal;
