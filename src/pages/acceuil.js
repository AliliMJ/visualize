import { Redirect, Route, Switch } from 'react-router-dom';
import Tabs from './extension/tabs';
import TabsAcceuil from './extension/tabsAcceuil';
import Projects from './projects';

const Acceuil = () => {
  return (
    <div className="space-y-3">
      <TabsAcceuil />
      <Switch>
        <Route exact path="/dashboard/acceuil">
          <Redirect to="/dashboard/acceuil/projets" />
        </Route>
        <Route path="/dashboard/acceuil/projets">
          <Projects />
        </Route>
      </Switch>
    </div>
  );
};

export default Acceuil;
