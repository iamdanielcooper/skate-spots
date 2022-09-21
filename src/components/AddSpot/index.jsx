import React, { useState } from 'react';

const AddSpot = ({ setSpotData, location }) => {
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
                    created: '2022-09-01: 10:40:01',
                },
                spotHistory: [],
            };

            newState.push(newSpot);
            return newState;
        });
    };

    return (
        <div>
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
