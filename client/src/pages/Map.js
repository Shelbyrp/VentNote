import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { QUERY_MARKERS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Geocode from "react-geocode";
import Footer from '../components/Footer';

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
    const { journalId, journalAddress, journalLatLng, journalTitle } = useParams();
    const { loading, data } = useQuery(QUERY_MARKERS, {
        // pass URL parameter
        variables: { journalId: journalId, journalAddress: journalAddress, journalLatLng: journalLatLng, journalTitle: journalTitle },
    });

    // Geocode.setApiKey("AIzaSyCLD89y6zAJjP2lxnmtni5-ck-311J_Rk4");
    // Geocode.setLanguage("en");
    // Geocode.setRegion("es");
    // Geocode.setLocationType("ROOFTOP");
    // Geocode.enableDebug();

    // Geocode.fromAddress("Perth").then(
    //     (response) => {
    //         const { lat, lng } = response.results[0].geometry.location;
    //         console.log(lat, lng);
    //     },
    //     (error) => {
    //         console.error(error);
    //     }
    // )

    // console.log("postionlocation", data);

    const journal = data?.journal || {};

    console.log("journalLatLng " + journalTitle)

    const markers = [
        // {
        //     id: 2,
        //     name: "Denver, Colorado",
        //     position: { lat: 39.739235, lng: -104.99025 }
        // },
        // {
        //     id: 3,
        //     name: "Los Angeles, California",
        //     position: { lat: 34.052235, lng: -118.243683 }
        // },
        // {
        //     id: 4,
        //     name: "New York, New York",
        //     position: { lat: 40.712776, lng: -74.005974 }
        // }
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
            zoom={3}
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


{/* <GoogleMap
mapContainerStyle={containerStyle}
center={center}
zoom={3}
onLoad={onLoad}
onClick={() => setActiveMarker(null)}
onUnmount={onUnmount}
mapIds={mapIds}
options={{ mapId: "eb3894643d1781b" }}
>
{data?.journals.map( async ({ _id: key, journalAddress }) =>{ 
    // response.results[0].geometry.location;
    const geoCode = await Geocode.fromAddress("Perth") || {};
    console.log("Geocode", geoCode)
    const {results: [{geometry: {location: {lat, lng} = {}} = {}} = {}] = []} = geoCode;
    return (
    <Marker
        key={key}
        position={{lat, lng}}
        onClick={() => handleActiveMarker(key)}
    >
        {activeMarker === key ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{journalAddress}</div>
            </InfoWindow>
        ) : null}
    </Marker>
)})}
</GoogleMap> */}