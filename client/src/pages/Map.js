import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '90vh'
};

const center = {
    lat: -10.51470028456413,
    lng: -78.00704281196573
};


function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // mapIds: ['eb3894643d1781b'],
        googleMapsApiKey: "AIzaSyCLD89y6zAJjP2lxnmtni5-ck-311J_Rk4"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2.5}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)