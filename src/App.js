import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Modal, AddSpot, ViewSpot } from './components';

import 'leaflet/dist/leaflet.css';
import Header from './components/Header';

function App() {
    const [usersLocation, setUsersLocation] = useState([51.505, -0.09]);
    const [markers, setMarkers] = useState([
        [51.505, -0.09],
        [51, -0.091],
    ]);
    const [modalChild, setModalChild] = useState(null);
    const [zoomLevel, setZoomLevel] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setUsersLocation([
                position.coords.latitude,
                position.coords.longitude,
            ]);
        });
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
        iconSize: new L.Point(zoomLevel * 2, zoomLevel * 2),
        className: 'leaflet-div-icon',
    });

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setUsersLocation([e.latlng.lat, e.latlng.lng]);
                setModalShown(!modalShown);
                setModalChild(<AddSpot />);

                setMarkers(prevState => {
                    const newState = prevState.slice();
                    newState.push([e.latlng.lat, e.latlng.lng]);

                    return newState;
                });
            },
            zoom(e) {
                console.log(e.target.getZoom());
                setZoomLevel(e.target.getZoom());
            },
        });

        return false;
    };

    function ChangeView({ center }) {
        const map = useMap();
        map.setView(center, 17);
        return null;
    }

    return (
        <>
            <Header />
            <MapContainer
                center={usersLocation}
                // zoom={17}
                scrollWheelZoom={true}
                style={{ height: '100vh' }}
                markerZoomAnimation={true}
                // renderer={true}
            >
                <ChangeView center={usersLocation} />
                <TileLayer
                    attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
                    url='https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
                    // url='http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
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
                                        setUsersLocation([
                                            e.latlng.lat,
                                            e.latlng.lng,
                                        ]);
                                        setModalChild(<ViewSpot />);
                                    },
                                }}
                            ></Marker>
                        );
                    })}

                <MapEvents />
            </MapContainer>
            <Modal shown={modalShown} closeModal={() => setModalShown(false)}>
                {modalChild}
            </Modal>
        </>
    );
}

export default App;
