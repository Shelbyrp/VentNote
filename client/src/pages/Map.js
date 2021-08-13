import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { QUERY_MARKERS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '90vh',
};

const center = {
    lat: 20, lng: 133.775
};

const mapIds = {
    mapIds: ['eb3894643d1781b']
};

function Map() {

    const [activeMarker, setActiveMarker] = useState(null);
    const { journalId, journalAddress, journalLatLng, journalTitle } = useParams();
    const { loading, data } = useQuery(QUERY_MARKERS, {
        // pass URL parameter
        variables: { journalId: journalId, journalAddress: journalAddress, journalLatLng: journalLatLng, journalTitle: journalTitle },
    });

    const journal = data?.journal || {};

    console.log("journalLatLng " + journalTitle)

   
    const handleActiveMarker = (markers) => {
        if (markers === activeMarker) {
            return;
        }
        setActiveMarker(markers);
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCLD89y6zAJjP2lxnmtni5-ck-311J_Rk4",
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // const bounds = new window.google.maps.LatLngBounds();
        // markers.forEach(({ position }) => bounds.extend(position));
        // map.fitBounds(bounds);
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
            zoom={2.8}
            onLoad={onLoad}
            onClick={() => setActiveMarker(null)}
            onUnmount={onUnmount}
            mapIds={mapIds}
            options={{ mapId: "eb3894643d1781b" }}
        >
            {data.journals.map(({ _id, journalAddress, journalLatLng, journalTitle }) => (
                <Marker
                    key={_id}
                    position={journalLatLng}
                    title={journalAddress}
                    onClick={() => handleActiveMarker(_id)}
                >
                    {activeMarker === _id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)} style={{ width: "100%" }}>
                            <div>{journalTitle}</div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    ) : <></>
}

export default Map
