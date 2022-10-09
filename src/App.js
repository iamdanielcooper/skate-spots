import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Modal, AddSpot, ViewSpot } from './components';
import testData from './spotData.json';

import 'leaflet/dist/leaflet.css';
import Header from './components/Header';

function App() {
    const [usersLocation, setUsersLocation] = useState([51.505, -0.09]);
    const [spotData, setSpotData] = useState(testData);
    const [modalChild, setModalChild] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(5);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setUsersLocation([
                position.coords.latitude,
                position.coords.longitude,
            ]);
        });
    }, []);

    const [modalShown, setModalShown] = useState(false);
    const [icon, setIcon] = useState(
        new L.Icon({
            iconUrl:
                'https://www.blacksheepstore.co.uk/media/catalog/product/cache/1/small_image/700x/9df78eab33525d08d6e5fb8d27136e95/b/d/bd7dffe8351bce8e0f66f8fd45c1cfec.jpg',
            iconRetinaUrl:
                'https://www.blacksheepstore.co.uk/media/catalog/product/cache/1/small_image/700x/9df78eab33525d08d6e5fb8d27136e95/b/d/bd7dffe8351bce8e0f66f8fd45c1cfec.jpg',
            iconAnchor: null,
            popupAnchor: null,
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null,
            iconSize: new L.Point(zoomLevel * 20, zoomLevel * 20),
            className: 'leaflet-div-icon',
        })
    );

    useEffect(() => {
        setIcon(
            new L.Icon({
                iconUrl:
                    'https://e7.pngegg.com/pngimages/760/674/png-clipart-skateboard-free-computer-icons-skateboarding-skateboard-sports-skateboard.png',
                iconRetinaUrl:
                    'https://e7.pngegg.com/pngimages/760/674/png-clipart-skateboard-free-computer-icons-skateboarding-skateboard-sports-skateboard.png',
                iconAnchor: null,
                popupAnchor: null,
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null,
                iconSize: new L.Point(60 - zoomLevel * 2, 60 - zoomLevel * 2),
                className: 'leaflet-div-icon',
            })
        );
    }, [zoomLevel]);

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setModalShown(!modalShown);
                setModalChild(
                    <AddSpot
                        setSpotData={setSpotData}
                        location={[e.latlng.lat, e.latlng.lng]}
                    />
                );
            },
            zoom(e) {
                setZoomLevel(e.target.getZoom());
            },
        });

        return false;
    };

    return (
        <main>
            <Header />
            <MapContainer
                center={usersLocation}
                zoom={17}
                scrollWheelZoom={true}
                style={{ height: '-webkit-fill-available' }}
                markerZoomAnimation={true}
                zoomAnimation={true}
            >
                <TileLayer
                    attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
                    url='https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
                    // url='http://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
                />

                {spotData &&
                    spotData.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                position={[
                                    marker.location.lat,
                                    marker.location.lng,
                                ]}
                                icon={icon}
                                eventHandlers={{
                                    click: e => {
                                        setModalShown(!modalShown);
                                        setModalChild(
                                            <ViewSpot spotData={marker} />
                                        );
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
        </main>
    );
}

export default App;
