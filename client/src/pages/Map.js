import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { QUERY_MARKERS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Geocode from "react-geocode";


const containerStyle = {
    width: '100%',
    height: '90vh',
};

const center = {
    lat: -25.274, lng: 133.775
};

const mapIds = {
    mapIds: ['eb3894643d1781b']
};

function Map() {

    const [activeMarker, setActiveMarker] = useState(null);
    const { journalId, journalAddress, journalLat, journalLng } = useParams();
    const { loading, data } = useQuery(QUERY_MARKERS, {
        // pass URL parameter
        variables: { journalId: journalId, journalAddress: journalAddress, journalLat: journalLat, journalLng: journalLng },
    });


    Geocode.setApiKey("AIzaSyCLD89y6zAJjP2lxnmtni5-ck-311J_Rk4");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    Geocode.fromAddress(data).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
        },
        (error) => {
            console.error(error);
        }
    )

    console.log("postionlocation", data);

    const journal = data?.journal || {};

    const markers = [
        {
            id: 2,
            name: "Denver, Colorado",
            position: { lat: 39.739235, lng: -104.99025 }
        },
        {
            id: 3,
            name: "Los Angeles, California",
            position: { lat: 34.052235, lng: -118.243683 }
        },
        {
            id: 4,
            name: "New York, New York",
            position: { lat: 40.712776, lng: -74.005974 }
        }
    ];

    const handleActiveMarker = (markers) => {
        if (markers === activeMarker) {
            return;
        }
        setActiveMarker(markers);
    };

    console.log(markers)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCLD89y6zAJjP2lxnmtni5-ck-311J_Rk4",
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    })

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return isLoaded ? (


        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            onLoad={onLoad}
            onClick={() => setActiveMarker(null)}
            onUnmount={onUnmount}
            mapIds={mapIds}
            options={{ mapId: "eb3894643d1781b" }}
        >
            {markers.map(({ id, name, position }) => (
                <Marker
                    key={id}
                    position={position}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>{name}</div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    ) : <></>
}

export default Map

