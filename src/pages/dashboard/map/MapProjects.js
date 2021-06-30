import { MapProvider,useMap } from '../../../hook/useMap';
import Map from '../../extension/Map';

import {useState} from 'react';


function MapProjects(props) {
    const [clickCords, setClickCords] = useState([0, 0]);

    function getCords(e) {
        setClickCords(e);
      }
    return (
        <div>
            <MapProvider>
                <Map  getLngLat={getCords} />
            </MapProvider>
        </div>
    );
}

export default MapProjects;