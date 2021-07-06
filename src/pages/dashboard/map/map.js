import React, { useContext, useRef, useState, useCallback } from "react";
import ReactMapGl, { MapContext, Popup } from "react-map-gl";
import { BiLocationPlus, BiCurrentLocation } from "react-icons/bi";
import {BsFillCircleFill} from "react-icons/bs";
import { useMap } from "../../../hook/useMap";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import {
  getClass,
  getKeyByValue,
  getRemarque,
  getStateColor,
} from "../../../helpers/states";


const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFtemFmZWdob3VsaSIsImEiOiJja3BucnJ5dTgwdjMyMnFxcTJzYm91emF3In0.ReNmWwsDL-3jWvogomg7Lg";

export function Marker({
  title,
  work,
  longitude,
  latitude,
  size,
  color,
  markerType,
}) {
  const [popup, setPopup] = useState(false);

  function togglePopup(bool) {
    setPopup(bool);
  }

  const markers = [
    {
      markerType: "add",
      icon: function (size, color) {
        return <BiLocationPlus size={size} color={color} />;
      },
    },
    {
      markerType: "displayProject",
      icon: function (size, color) {
        return <BiCurrentLocation size={size} color={color} />;
      },
    },
  ];

  const context = useContext(MapContext);

  const [x, y] = context.viewport.project([longitude, latitude]);
  const markerPosition = { left: x - 15, top: y - 30 };

  return (
    <>
      <button 
        className="absolute text-blue-500 focus:outline-none"
        style={markerPosition}
        onMouseEnter={()=>togglePopup(true)}
        onMouseLeave={()=>togglePopup(false)}
      >
        {/* size = top, size=2*left */}
        {markers.map((element) =>
          element.markerType == markerType ? element.icon(size, color) : null
        )}
      </button>
      {popup && markerType==="displayProject" ? (
        <MapPopUp title={title} etat={color} lng={longitude} lat={latitude} work={work}/>
      ) : (
        <div></div>
      )}
    </>
  );
}

export function MapPopUp({ title, lng, lat, work }) {
  
  return (
    <Popup
      offsetTop={-15}
      offsetLeft={-2}
      latitude={lat}
      longitude={lng}
      closeButton={false}
      closeOnClick={true}
      
    >
      <div className="flex flex-col p-2">
        <div className="flex">
          <h1 className="text-lg text-gray-600">Titre : {' '}</h1>
          <h1 className="pt-1.5 text-sm pl-4 "> {title}</h1>
        </div>
        <div className="flex pt-1">
          <h1 className="text-lg text-gray-600">Longitude : {' '}</h1>
          <h1 className="pt-1.5 text-sm pl-4 "> {lng}</h1>
        </div>
        <div className="flex pt-2">
          <h1 className="text-lg text-gray-600">Latitude : {' '}</h1>
          <h1 className="pt-1.5 text-sm pl-4 "> {lat}</h1>
        </div>
        <div className="flex">
        <h1 className="pt-1.5 text-lg pr-4 text-gray-600">Etat : </h1>
          <div className="py-3.5">
          <BsFillCircleFill size={15} color={getKeyByValue(getStateColor(work), true)}/>
          </div>
          <h1 className="pt-3 text-sm pl-4 "> {getRemarque(work)}</h1>
        </div>
      </div>
    </Popup>
  );
}

// const SelectMarker = ({longitude, latitude})=> {

//     </Marker>
// }
// const ProjectMarker = ({work, cords})=>{

//     return (
//         <button className={`absolute ${getClass(work)}`}  style={markerPosition}>
//           {/* size = top, size=2*left */}
//           <BiLocationPlus size={30} />
//         </button>
//       );
// }
function Position({ x, y }) {
  return (
    <div className="flex flex-col">
      <div>Longitude : {x}</div>
      <div>Latitude : {y}</div>
    </div>
  );
}

function Map({ projects, ...props }) {
  const { lngLat, viewport, setViewport, changeMarkerPos } = useMap();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const mapRef = useRef();
  return (
    <>
      <div className="flex space-x-1">
        <div className=" overflow-hidden rounded" >
          <ReactMapGl
            {...viewport}
            ref={mapRef}
            
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken={"pk.eyJ1IjoiaGFtemFmZWdob3VsaSIsImEiOiJja3FzNDY2eXQwZnBuMnBvMzJldnFzMmEzIn0.3_ghKI7HabcHRWzRpii0VA"}
            mapStyle="mapbox://styles/hamzafeghouli/ckkv7rq403udv17plnccrhpaw"
            onClick={(e) => {
              changeMarkerPos(e.lngLat);
              props.getLngLat(e.lngLat);
            }}
          >
            {projects.length !== 0 ? (
              projects.map((project, idx) => {
                return (
                  <Marker
                    key={idx + 1}
                    title={project.title}
                    work={project.work}
                    longitude={project.cords[0]}
                    latitude={project.cords[1]}
                    color={getKeyByValue(getStateColor(project.work), true)}
                    markerType="displayProject"
                    size={30}
                  />
                );
              })
            ) : (
              <Marker
                key={0}
                longitude={lngLat[0]}
                latitude={lngLat[1]}
                color="blue"
                markerType="add"
                size={30}
              />
              
            )}
            <Geocoder
              mapRef={mapRef}
              mapboxApiAccessToken={"pk.eyJ1IjoiaGFtemFmZWdob3VsaSIsImEiOiJja3FzNDY2eXQwZnBuMnBvMzJldnFzMmEzIn0.3_ghKI7HabcHRWzRpii0VA"}
              onViewportChange={handleViewportChange}
              position="top-left"
              
            
            />
          </ReactMapGl>
        </div>
        {/* <div className="p-3 w-64 border rounded flex flex-col flex-grow">
          <div className="font-bold text-gray-400">Details</div>
        </div> */}
      </div>
    </>
  );
}

export default Map;
