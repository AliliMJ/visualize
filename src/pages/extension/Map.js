import React, { useState, useContext } from 'react';
import ReactMapGl, { MapContext } from 'react-map-gl';
import { BiLocationPlus } from 'react-icons/bi';
import { useMap } from './useMap';

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
    <div className="flex justify-center bg-primaryBlue">
      <h1 className="text-black">
        X : {x} Y : {y}
      </h1>
    </div>
  );
}

function Map() {
  const {
    lngLat,
    position,
    viewport,
    setViewport,
    changeMarkerPos,
    changeMousePos,
  } = useMap();

  return (
    <div className="flex space-x-1">
      <ReactMapGl
        className="rounded"
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiaGFtemFmZWdob3VsaSIsImEiOiJja3BucnJ5dTgwdjMyMnFxcTJzYm91emF3In0.ReNmWwsDL-3jWvogomg7Lg"
        mapStyle="mapbox://styles/hamzafeghouli/ckkv7wgfo3pe417pgw0e1mycw"
        onClick={(e) => changeMarkerPos(e.lngLat)}
        onMouseMove={(e) => changeMousePos(e.lngLat)}
      >
        <Marker longitude={lngLat[0]} latitude={lngLat[1]} />
      </ReactMapGl>
      <div className="p-3 w-64 w-max border rounded flex flex-col flex-grow">
        <Position x={position.x} y={position.y} />
      </div>
    </div>
  );
}

export default Map;
