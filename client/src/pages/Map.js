import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useMutation } from '@apollo/client';
import { QUERY_MARKERS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';


const containerStyle = {
    width: '100%',
    height: '90vh',
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const mapIds = {
    mapIds: ['eb3894643d1781b']
};


function MyComponent() {
    const { journalId } = useParams();
    const { loading, data } = useQuery(QUERY_MARKERS, {
        // pass URL parameter
        variables: { journalId: journalId },
    });

    const journal = data?.journal || {};

    let markers = 
        {
            lat: 25.0391667,
            lng: 121.525,
        }
       
    console.log(markers)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCLD89y6zAJjP2lxnmtni5-ck-311J_Rk4",
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // const bounds = new window.google.maps.LatLngBounds();
        // map.fitBounds(bounds);
        setMap(map)
    }, [])

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
            onUnmount={onUnmount}
            mapIds={mapIds}
            options={{ mapId: "eb3894643d1781b" }}
        >
            <Marker
                onLoad={onLoad}
                position={markers}
            />
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)