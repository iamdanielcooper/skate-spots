import React, { useRef } from 'react';
import styles from './style.module.css';

const ViewSpot = ({ spotData }) => {
    const hitSpotSection = useRef(null);

    const displaySpotDate = date => {
        return date.split(', ')[0];
    };

    const getVideoUrl = file => {
        return URL.createObjectURL(file);
    };

    return (
        <div className={styles.container}>
            <video
                className={styles.spotVideo}
                autoPlay
                loop
                webkit-playsinline
                playsinline
                muted={true}
            >
                <source src={getVideoUrl(spotData.video)} type='video/mp4' />
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
            </section>
        </div>
    );
};

export default ViewSpot;
