import React, { useState } from 'react';
import styles from './style.module.css';

const AddSpot = ({ setSpotData, location, closeModal }) => {
    const [spotName, setSpotName] = useState('');
    const [creator, setCreator] = useState('');
    const [video, setVideo] = useState('');

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
                video: video,
                created: {
                    creator: e.target.spotCreator.value,
                    created: new Date().toLocaleString(),
                },
            };

            newState.push(newSpot);
            return newState;
        });
        clearSpotFormData();
        closeModal();
    };

    const clearSpotFormData = () => {
        setSpotName('');
        setCreator('');
        setVideo('');
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input
                    id='spotName'
                    onChange={e => updateFormValues(e, setSpotName)}
                    placeholder='Name'
                    value={spotName}
                    required
                />
                <input
                    id='spotCreator'
                    onChange={e => updateFormValues(e, setCreator)}
                    placeholder='Who are you?'
                    value={creator}
                    required
                />
                <label className={styles.uploadLabel}>
                    Uplodad Video
                    <input
                        type='file'
                        onChange={e => setVideo(e.target.files[0])}
                    />
                </label>

                <button>Update</button>
            </form>
        </div>
    );
};

export default AddSpot;
