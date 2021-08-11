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
    lat: -3.745,
    lng: -38.523
};

const mapIds = {
    mapIds: ['eb3894643d1781b']
};

// const markers = [
//     {
//       id: 1,
//       name: "Chicago, Illinois",
//       position: { lat: 41.881832, lng: -87.623177 }
//     },
//     {
//       id: 2,
//       name: "Denver, Colorado",
//       position: { lat: 39.739235, lng: -104.99025 }
//     },
//     {
//       id: 3,
//       name: "Los Angeles, California",
//       position: { lat: 34.052235, lng: -118.243683 }
//     },
//     {
//       id: 4,
//       name: "New York, New York",
//       position: { lat: 40.712776, lng: -74.005974 }
//     }
// ];


function Map() {

    const [activeMarker, setActiveMarker] = useState(null);
    const { journalId, journalAddress, journalLocation } = useParams();
    const { loading, data } = useQuery(QUERY_MARKERS, {
        // pass URL parameter
        variables: { journalId: journalId, journalAddress: journalAddress, journalLocation: journalAddress },
    });

    const journal = data?.journal || {};

    console.log("data", data)

    const markers = [
    // {
    //   id: data.journal.id,
    //   name: data.journal.journalAddress,
    //   position: data.journal.journalLocation[0]
    // },
    // {
    //   id: 2,
    //   name: "Denver, Colorado",
    //   position: { lat: 39.739235, lng: -104.99025 }
    // },
    // {
    //   id: 3,
    //   name: "Los Angeles, California",
    //   position: { lat: 34.052235, lng: -118.243683 }
    // },
    // {
    //   id: 4,
    //   name: "New York, New York",
    //   position: { lat: 40.712776, lng: -74.005974 }
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
          {data.journals.map(({ _id, journalAddress, journalLocation }) => (
        <Marker
          key={_id}
          position={journalLocation[0]}
          onClick={() => handleActiveMarker(_id)}
        >
          {activeMarker === _id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{journalAddress}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
        </GoogleMap>
    ) : <></>
}

export default Map



// function Map() {
//     const { journalId } = useParams();
//     const { loading, data } = useQuery(QUERY_MARKERS, {
//         // pass URL parameter
//         variables: { journalId: journalId },
//     });

//     const journal = data?.journal || {};


       
//     console.log(markers)

//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: "AIzaSyCLD89y6zAJjP2lxnmtni5-ck-311J_Rk4",
//     })

//     const [map, setMap] = React.useState(null)

//     const onLoad = React.useCallback(function callback(map) {
//         const bounds = new window.google.maps.LatLngBounds();
//         map.fitBounds(bounds);
//         setMap(map)
//     }, [])

//     const onUnmount = React.useCallback(function callback(map) {
//         setMap(null)
//     }, [])

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return isLoaded ? (
//         <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={3}
//             onLoad={onLoad}
//             onUnmount={onUnmount}
//             mapIds={mapIds}
//             options={{ mapId: "eb3894643d1781b" }}
//         >
//             <Marker
//                 onLoad={onLoad}
//                 position={markers}
//             />
//         </GoogleMap>
//     ) : <></>
// }

// export default Map