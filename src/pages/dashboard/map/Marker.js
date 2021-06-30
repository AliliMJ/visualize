import { BiLocationPlus } from "react-icons/bi";
import { FiCrosshair } from "react-icons/fi";
import { MapContext } from "react-map-gl";
import { useContext } from "react";

export default function Marker({ longitude, latitude, markerType, color }) {
  const markers = {
    add: function () {
      return <BiLocationPlus color={color} size={30} />;
    },
    display: function () {
      return <FiCrosshair color={color} size={30} />;
    },
  };

  const context = useContext(MapContext);
  const [x, y] = context.viewport.project([longitude, latitude]);
  const markerPosition = { left: x - 15, top: y - 30 };

  return (
    <button className="absolute text-blue-500" style={markerPosition}>
      {/* size = top, size=2*left */}
      {markers[`${markerType}`]}
    </button>
  );
}
