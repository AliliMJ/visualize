import React, { useState, useContext } from 'react';
import ReactMapGl, { MapContext } from 'react-map-gl';
import { BiLocationPlus } from 'react-icons/bi';

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
  const [lngLat, setLngLat] = useState([0, 0]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({
    width: 800,
    height: 500,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  function changeMarkerPos([x, y]) {
    setLngLat([x, y]);
  }

  function changeMousePos([x, y]) {
    const deciamls = 4;
    const pos = {
      x: x.toFixed(deciamls),
      y: y.toFixed(deciamls),
    };
    setPosition(pos);
  }

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
      <div className="p-3 w-64 w-max border rounded flex flex-col flex-shrink-0">
        <Position x={position.x} y={position.y} />
      </div>
    </div>
  );
}

export default Map;
