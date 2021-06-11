import Support from './support';
import { Link, Switch, Route } from 'react-router-dom';
import Profile from './profile';
import logo from '../svg/logo.svg';
import Map from './extension/Map';
import Sidebar from './extension/Sidebar';
import Navbar from './extension/Navbar';
import Acceuil from './acceuil';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-5 px-2 gap-1">
      <img className="w-20 place-self-center" src={logo} />

      <Sidebar className="pl-10 bg-blue-500 row-start-2 row-span-4" />

      <div className="col-start-2 col-span-4 row-span-4 row-start-2 border bg-white rounded px-6 py-3">
        <Switch>
          <Route path="/dashboard/profile">
            <Profile />
          </Route>
          <Route path="/dashboard/support">
            <Support />
          </Route>
          <Route path="/dashboard/carte">
            <Map />
          </Route>
          <Route path="/dashboard/acceuil">
            <Acceuil />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
