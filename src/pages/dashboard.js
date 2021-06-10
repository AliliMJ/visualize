import Support from './support';
import { Link, Switch, Route } from 'react-router-dom';
import Profile from './profile';
import { useAuth } from '../hook/useAuth';
import logo from '../svg/logo.svg';

const SideBar = (props) => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      alert('Error:Could not logout.');
    }
  };
  return (
    <div className={`flex flex-col ${props.className}`}>
      <Link to="/dashboard/profile">Profile</Link>
      <Link to="/dashboard/support">Support</Link>
      <button
        className="text-red-500 rounded px-4 py-1 bg-transparent border-2 border-red-500"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

const Navbar = ({ className }) => {
  return <div className={`h-20 flex ${className} bg-blue-300`}></div>;
};

const Dashboard = () => {
  return (
    <div className="grid grid-cols-5 px-2 gap-1">
      <img className="w-20 place-self-center" src={logo} />
      <Navbar className="col-span-4 col-start-2" />
      <SideBar className="px-10 py-5 row-start-2 row-span-4" />
      <div className="col-start-2 col-span-4 row-span-4 row-start-2 border bg-white rounded">
        <Switch>
          <Route path="/dashboard/profile">
            <Profile />
          </Route>
          <Route path="/dashboard/support">
            <Support />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
