import React, { useContext, useRef } from 'react';
import ReactMapGl, { MapContext } from 'react-map-gl';
import { BiLocationPlus } from 'react-icons/bi';
import { useMap } from '../../../hook/useMap';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MAPBOX_TOKEN =
    'pk.eyJ1IjoiaGFtemFmZWdob3VsaSIsImEiOiJja3BucnJ5dTgwdjMyMnFxcTJzYm91emF3In0.ReNmWwsDL-3jWvogomg7Lg';
function Marker({ longitude, latitude }) {
    const context = useContext(MapContext);

    const [x, y] = context.viewport.project([longitude, latitude]);
    const markerPosition = { left: x - 15, top: y - 30 };

    return (
        <button className="absolute text-blue-500" style={markerPosition}>
            {/* size = top, size=2*left */}
            <BiLocationPlus size={30} />
        </button>
    );
}

function Position({ x, y }) {
    return (
        <div className="flex flex-col">
            <div>Longitude : {x}</div>
            <div>Latitude : {y}</div>
        </div>
    );
}

function Map() {
    const {
        lngLat,

        viewport,
        setViewport,
        changeMarkerPos,
        changeMousePos,
    } = useMap();
    const mapRef = useRef();
    return (
        <div className="flex space-x-1">
            <div className=" overflow-hidden rounded h-96">
                <ReactMapGl
                    {...viewport}
                    ref={mapRef}
                    onViewportChange={(nextViewport) =>
                        setViewport(nextViewport)
                    }
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/hamzafeghouli/ckkv7wgfo3pe417pgw0e1mycw"
                    onClick={(e) => changeMarkerPos(e.lngLat)}
                    onMouseMove={(e) => changeMousePos(e.lngLat)}
                >
                    <Marker longitude={lngLat[0]} latitude={lngLat[1]} />
                    <Geocoder
                        mapRef={mapRef}
                        onViewportChange={(nextViewport) =>
                            setViewport(nextViewport)
                        }
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        position="top-left"
                    />
                </ReactMapGl>
            </div>
            <div className="p-3 w-64 w-max border rounded flex flex-col flex-grow">
                <div className="font-bold text-gray-400">Details</div>
            </div>
        </div>
    );
}

export default Map;
