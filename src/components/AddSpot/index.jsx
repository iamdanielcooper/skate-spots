import React, { useState } from 'react';

const AddSpot = () => {
    const [spotName, setSpotName] = useState('');
    const [creator, setCreator] = useState('');
    const [image, setImage] = useState('');

    const updateFormValues = (e, setter) => {
        e.preventDefault();
        setter(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={e => updateFormValues(e, setSpotName)}
                    placeholder='Name'
                    value={spotName}
                />
                <input
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
