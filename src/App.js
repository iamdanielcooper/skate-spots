import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Modal } from './components';

import 'leaflet/dist/leaflet.css';

function App() {
    const [usersLocation, setUsersLocation] = useState([51.505, -0.09]);
    const [markers, setMarkers] = useState([
        [51.505, -0.09],
        [51, -0.091],
    ]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setUsersLocation([
                position.coords.latitude,
                position.coords.longitude,
            ]);
        });
        console.log('hi');
    }, []);

    const [modalShown, setModalShown] = useState(false);

    const icon = new L.Icon({
        iconUrl:
            'https://e7.pngegg.com/pngimages/760/674/png-clipart-skateboard-free-computer-icons-skateboarding-skateboard-sports-skateboard.png',
        iconRetinaUrl:
            'https://e7.pngegg.com/pngimages/760/674/png-clipart-skateboard-free-computer-icons-skateboarding-skateboard-sports-skateboard.png',
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(60, 60),
        className: 'leaflet-div-icon',
    });

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setMarkers(prevState => {
                    const newState = prevState.slice();
                    newState.push([e.latlng.lat, e.latlng.lng]);
                    return newState;
                });
            },
        });
        return false;
    };

    function ChangeView({ center }) {
        console.log('hi');
        const map = useMap();
        map.setView(center, 17);
        return null;
    }

    return (
        <>
            <MapContainer
                center={usersLocation}
                // zoom={17}
                scrollWheelZoom={true}
                style={{ height: '100vh' }}
                // renderer={true}
            >
                <ChangeView center={usersLocation} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {markers &&
                    markers.map(marker => {
                        return (
                            <Marker
                                position={marker}
                                icon={icon}
                                eventHandlers={{
                                    click: e => {
                                        setModalShown(!modalShown);
                                        console.log('marker clicked', e);
                                    },
                                }}
                            ></Marker>
                        );
                    })}

                <MapEvents />
            </MapContainer>
            <Modal shown={modalShown} closeModal={() => setModalShown(false)} />
        </>
    );
}

export default App;
