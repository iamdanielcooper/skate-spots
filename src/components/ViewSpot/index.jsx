import React, { useState, useEffect } from 'react';
import styles from './style.module.css';

const ViewSpot = ({ spotData }) => {
    const [image, setImage] = useState('');

    useEffect(() => {
        var reader = new FileReader();

        reader.onloadend = function () {
            setImage(reader.result);
        };

        if (spotData.image) {
            reader.readAsDataURL(spotData.image);
        } else {
            setImage('');
        }
    }, [spotData.image]);

    return (
        <div className={styles.container}>
            <img className={styles.spotImage} alt='The spot' src={image} />
            <h1 className={styles.spotTitle}>{spotData.name}</h1>
            <p className={styles.spotCreator}>
                Created by {spotData.created.creator}
            </p>
            <p>{spotData.created.created}</p>
            <section>
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
