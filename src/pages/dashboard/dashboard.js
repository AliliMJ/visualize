import Support from "./support/support";
import { Switch, Route, Redirect } from "react-router-dom";
import Profile from "./profile/profile";
import logo_white from "../../svg/logo_white.svg";
import Map from "./map";
import Sidebar from "./sidebar";
import Acceuil from "./acceuil/acceuil";
import Navbar from "./navbar";
import AddProject from "../addProject/AddProject";
import { useProjects } from "../../hook/useProjects";

const Dashboard = () => {
    const projects = useProjects();
  return (
    <div className="grid grid-cols-5 px-2 gap-0 bg-blue-500 h-screen py-2">
      <img className="w-20 place-self-center py-3" src={logo_white} />

      <Sidebar className="pl-5 row-start-2 row-span-4" />

      <div className="col-start-2 col-span-4 row-span-5 row-start-1  bg-white rounded space-y-2 px-6 py-3 -ml-px">
        <Navbar />
        <hr />
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
            <Map projects={projects}/>
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
