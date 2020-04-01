import React, { useRef, useState, useEffect } from 'react'
import moment from 'moment'
import 'leaflet/dist/leaflet.css'
// import worldGeoJSON from './data/countries.geo';
import worldGeoJSON from 'world-map-geojson';
import L from 'leaflet'
import { Map as LeafletMap, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'


// FIX leaflet's default icon path problems with webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const styles = {
    mapContainer: {
        height: '80%',
        width: '80%',
        zIndex: '1',
    },
};

const apiKey = ''; // todo here must be your api key
const unitSystem = 'metric';
const fixed = 2;

function App() {
    const mapRef = useRef();

    const handleClick = (e) => {
        const map = mapRef.current;
        if (map != null) {
            map.leafletElement.locate()
        }
        console.log(e.latlng)
    };

    const handleLocationFound = (e) => {
        //console.log(e.latlng)
    };

    const onDragEnd = (e) => {
        const { lat, lng } = e.target.getLatLng();
        console.log(lat, lng)
    };

    return (
        <div className="weather-page">

            {/* one map */}
            <LeafletMap
                ref={mapRef}
                onLocationfound={handleLocationFound}
                onClick={handleClick} center={[51.505, -0.09]}
                style={styles.mapContainer}
                minZoom={1}
                maxZoom={10}
                zoom={3}
                zoomControl={true}
                animate={true}
                easeLinearity={0.35}
            >

                <Marker position={[51.505, -0.09]} draggable onDragend={onDragEnd}>
                    <Popup>
                        <div>pop up content here</div>
                    </Popup>

                </Marker>

                {/* this is map from geojson */}

                <GeoJSON
                    data={worldGeoJSON}
                    style={() => ({
                        color: '#ececec',
                        weight: 0.5,
                        strokeColor: '#ececec',
                        fillColor: "#1a1d62",
                        fillOpacity: 0.2,
                    })}
                    opacity={0.5}
                />
                {/* this is weather map with temperature*/}
                <TileLayer
                  // opacity={0.8}
                  url='https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=154e6c0bfc5326aae817c723304e7434'
                />
                {/*this is labels */}
                <TileLayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png" zIndex={1}
                           opacity={100} />

            </LeafletMap>

            {/* another map*/}
            <LeafletMap
              ref={mapRef}
              onLocationfound={handleLocationFound}
              onClick={handleClick} center={[51.505, -0.09]}
              style={styles.mapContainer}
              minZoom={1}
              maxZoom={10}
              zoom={3}
              zoomControl={true}
              animate={true}
              easeLinearity={0.35}
            >

                <Marker position={[51.505, -0.09]} draggable onDragend={onDragEnd}>
                    <Popup>
                        <div>pop up content here</div>
                    </Popup>

                </Marker>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            </LeafletMap>
        </div>
    )
}

export default App;
