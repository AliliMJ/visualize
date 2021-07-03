import React, { useContext, useRef } from "react";
import ReactMapGl, { MapContext } from "react-map-gl";
import { BiLocationPlus, BiCurrentLocation } from "react-icons/bi";
import { useMap } from "../../../hook/useMap";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useProjects } from "../../../hook/useProjects";
import { getClass, getKeyByValue, getStateColor } from "../../../helpers/states";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFtemFmZWdob3VsaSIsImEiOiJja3BucnJ5dTgwdjMyMnFxcTJzYm91emF3In0.ReNmWwsDL-3jWvogomg7Lg";
export function Marker({ longitude, latitude, size, color, markerType }) {
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
    <button className="absolute text-blue-500" style={markerPosition}>
      {/* size = top, size=2*left */}
      {markers.map((element) =>
        element.markerType == markerType ? element.icon(size, color) : null
      )}
    </button>
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

  const mapRef = useRef();
  return (
    <>
      <div className="flex space-x-1">
        <div className=" overflow-hidden rounded" style={{ height: 450 }}>
          <ReactMapGl
            {...viewport}
            ref={mapRef}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/hamzafeghouli/ckkv7wgfo3pe417pgw0e1mycw"
            onClick={(e) => {
              changeMarkerPos(e.lngLat);
            }}
          >
            <Marker
                key={0}
              longitude={lngLat[0]}
              latitude={lngLat[1]}
              color="blue"
              markerType="add"
              size={30}
            />
            
            {projects.length !==0 ? projects.map((project,idx) =>{ 
            return <Marker 
                key={idx+1}
                longitude={project.cords[0]} 
                latitude={project.cords[1]} 
                color={getKeyByValue( getStateColor(project.work),true)}
                markerType="displayProject"
                size={30}/>
                
                    }
                ):<div></div>}
            

            <Geocoder
              mapRef={mapRef}
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              position="top-left"
            />
          </ReactMapGl>
        </div>
        <div className="p-3 w-64 border rounded flex flex-col flex-grow">
          <div className="font-bold text-gray-400">Details</div>
        </div>
      </div>
    </>
  );
}

export default Map;
