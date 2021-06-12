import Support from './support';
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './profile';
import logo_white from '../svg/logo_white.svg';
import Map from './extension/map';
import Sidebar from './extension/sidebar';
import Acceuil from './acceuil';
import Navbar from './navbar';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-5 px-2 gap-0 bg-blue-500 h-full">
      <img className="w-20 place-self-center" src={logo_white} />
      <Navbar className="col-span-4 py-3 self-center" />

      <Sidebar className="pl-5 row-start-2 row-span-4" />

      <div className="col-start-2 col-span-4 row-span-4 row-start-2  bg-white rounded px-6 py-3 -ml-px">
        <Switch>
          <Route exact path="/dashboard">
            <Redirect to="/dashboard/acceuil" />
          </Route>
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
