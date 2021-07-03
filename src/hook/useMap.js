import { createContext, useContext, useState } from 'react';

const ContextMap = createContext();

export const useMap = () => {
  return useContext(ContextMap);
};

export const Map = ({ children }) => {
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
    return [x, y];
  }

  function changeMousePos([x, y]) {
    const deciamls = 4;
    const pos = {
      x: x.toFixed(deciamls),
      y: y.toFixed(deciamls),
    };
    setPosition(pos);
  }

  const value = {
    lngLat,
    position,
    viewport,
    setViewport,
    changeMarkerPos,
   
  };
  return <ContextMap.Provider value={value}>{children}</ContextMap.Provider>;
};
