import React from 'react';

const ViewSpot = ({ spotData }) => {
    const style = {
        width: '400px',
        height: '90vh',
        background: 'white',
    };

    return (
        <div style={style}>
            <h1>{spotData.name}</h1>
            <p>{spotData.created.creator}</p>
            <p>{spotData.created.created}</p>
            {spotData.spotHistory.map(spot => (
                <>
                    <p>{spot.name}</p>
                    <p>{spot.date}</p>
                </>
            ))}
        </div>
    );
};

export default ViewSpot;
