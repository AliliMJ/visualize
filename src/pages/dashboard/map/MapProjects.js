import { MapProvider,useMap } from '../../../hook/useMap';
import Map from '../../extension/Map';

import React from 'react';

function MapProjects(props) {
    return (
        <div>
            <MapProvider>
                <Map markerType="add"/>
            </MapProvider>
        </div>
    );
}

export default MapProjects;