import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ActivityModal from './pages/projects/activityModal';
import AddProject from './pages/addProject/AddProject';
// use the component in your app!

ReactDOM.render(
    <React.StrictMode>
        {/* <ActivityModal /> */}
        <App />
        {/* <AddProject/> */}
    </React.StrictMode>,
    document.getElementById('root')
);
