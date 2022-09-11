import React from 'react';

const Header = () => {
    const style = {
        width: '100vw',
        height: '75px',
        background: 'rgba(255,255,255,.8)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return <header style={style}>Header</header>;
};

export default Header;
