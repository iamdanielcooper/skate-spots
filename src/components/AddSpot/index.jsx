import React, { useState } from 'react';
import styles from './style.module.css';

const AddSpot = ({ setSpotData, location, closeModal }) => {
    const [spotName, setSpotName] = useState('');
    const [creator, setCreator] = useState('');
    const [image, setImage] = useState('');

    const updateFormValues = (e, setter) => {
        e.preventDefault();
        setter(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        setSpotData(prevState => {
            const newState = prevState.slice();

            const newSpot = {
                id: newState.length + 1,
                name: e.target.spotName.value,
                location: { lat: location[0], lng: location[1] },
                image: 'google.com',
                created: {
                    creator: e.target.spotCreator.value,
                    created: new Date().toLocaleString(),
                },
                spotHistory: [],
            };

            newState.push(newSpot);
            return newState;
        });
        closeModal();
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input
                    id='spotName'
                    onChange={e => updateFormValues(e, setSpotName)}
                    placeholder='Name'
                    value={spotName}
                />
                <input
                    id='spotCreator'
                    onChange={e => updateFormValues(e, setCreator)}
                    placeholder='Who are you?'
                    value={creator}
                />
                <input
                    type='file'
                    value={image}
                    onChange={e => setImage(e.target.files[0])}
                />
                <button>Update</button>
            </form>
        </div>
    );
};

export default AddSpot;
