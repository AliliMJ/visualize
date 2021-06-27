import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ActivityModal from './pages/projects/activityModal';
import Map from './pages/dashboard/map/map';
import {MapProvider} from './hook/useMap';
import MapProjects from './pages/dashboard/map/MapProjects';

// use the component in your app!

ReactDOM.render(
    <React.StrictMode>
        {/* <ActivityModal /> */}
        {/* <App /> */}
        <MapProjects/>
    </React.StrictMode>,
    document.getElementById('root')
);
