import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.css';

const ViewSpot = ({ spotData }) => {
    const hitSpotSection = useRef(null);

    const displaySpotDate = date => {
        return date.split(', ')[0];
    };

    return (
        <div className={styles.container}>
            <video
                className={styles.spotVideo}
                autoPlay
                loop
                webkit-playsinline
                playsinline
            >
                <source
                    src={URL.createObjectURL(spotData.image)}
                    type='video/mp4'
                />
                Your browser does not support the video tag.
            </video>
            <h1 className={styles.spotTitle}>{spotData.name}</h1>
            <p className={styles.spotCreator}>
                Created by {spotData.created.creator}
            </p>
            <p>{displaySpotDate(spotData.created.created)}</p>
            <section>
                <button onClick={() => (hitSpotSection.current.hidden = false)}>
                    Hit the spot
                </button>
                <section ref={hitSpotSection} hidden>
                    <h1>Hit the spot.</h1>
                </section>
                {spotData.spotHistory.map(spot => (
                    <>
                        <p>{spot.name}</p>
                        <p>{spot.date}</p>
                    </>
                ))}
            </section>
        </div>
    );
};

export default ViewSpot;
