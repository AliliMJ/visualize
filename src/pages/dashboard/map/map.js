import React, { useContext, useRef } from 'react';
import ReactMapGl, { MapContext } from 'react-map-gl';
import { useMap } from '../../../hook/useMap';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Marker from './Marker';
import {Markers} from "./mapProjectLogic";

const MAPBOX_TOKEN =
    'pk.eyJ1IjoiaGFtemFmZWdob3VsaSIsImEiOiJja3BucnJ5dTgwdjMyMnFxcTJzYm91emF3In0.ReNmWwsDL-3jWvogomg7Lg';

function Position({ x, y }) {
    return (
        <div className="flex flex-col">
            <div>Longitude : {x}</div>
            <div>Latitude : {y}</div>
        </div>
    );
}

function Map({displayProjects}) {
    const projects = [
        {
            name:"Université",
            state:"red",
        },
        {
            name:"Morgue",
            state:"red",
        },
        {
            name:"Cimetiere",
            state:"red",
        },
        {
            name:"Hopital",
            state:"red",
        },
    ]

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
            <div className=" overflow-hidden rounded" style={{ height: 450 }}>
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
                    {
                        displayProjects ? <Markers/> : <Marker longitude={lngLat[0]} latitude={lngLat[1]} markerType="add" />
                    }
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
            <div className="p-3 w-max border rounded flex flex-col flex-grow">
                <div className="font-bold text-gray-400">Details</div>
            </div>
        </div>
    );
}

export default Map;
