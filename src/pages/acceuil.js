import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './extension/Navbar';

const Acceuil = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/dashboard/acceuil">
          <Redirect to="/dashboard/acceuil/projets" />
        </Route>
        <Route path="/dashboard/acceuil/projets">Project</Route>
      </Switch>
    </div>
  );
};

export default Acceuil;
