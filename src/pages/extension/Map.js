import React, { useContext, useRef } from "react";
import ReactMapGl, { MapContext } from "react-map-gl";
import { BiLocationPlus } from "react-icons/bi";
import { useMap } from "./useMap";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFtemFmZWdob3VsaSIsImEiOiJja3BucnJ5dTgwdjMyMnFxcTJzYm91emF3In0.ReNmWwsDL-3jWvogomg7Lg";
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
    <div className="flex flex-col p-2">
      <div>Longitude : {x}</div>
      <div>Latitude : {y}</div>
    </div>
  );
}

function Map({ getLngLat }) {
  const {
    lngLat,
    position,
    viewport,
    setViewport,
    changeMarkerPos,
    changeMousePos,
  } = useMap();

  const mapRef = useRef();
  return (
    <div className="flex space-x-1">
      <ReactMapGl
        className="rounded"
        {...viewport}
        ref={mapRef}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/hamzafeghouli/ckkv7wgfo3pe417pgw0e1mycw"
        onClick={(e) => {
          changeMarkerPos(e.lngLat);
          getLngLat(e.lngLat);
        }}
        onMouseMove={(e) => changeMousePos(e.lngLat)}
      >
        <Marker longitude={lngLat[0]} latitude={lngLat[1]} />
        <Geocoder
          mapRef={mapRef}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      </ReactMapGl>
      <div className="p-6 w-max border rounded flex flex-col flex-grow">
        <div className="font-bold text-gray-400">Position curseur : </div>
        <Position x={position.x} y={position.y} />
      </div>
    </div>
  );
}

export default Map;
