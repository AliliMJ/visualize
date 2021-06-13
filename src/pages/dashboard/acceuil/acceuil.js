import { Redirect, Route, Switch } from 'react-router-dom';
import TabsAcceuil from './tabsAcceuil';
import Projects from '../../extension/projects';
import CollectorTable from '../../projects/collectorTable';

const Acceuil = () => {
    return (
        <div className="space-y-6">
            <TabsAcceuil />
            <Switch>
                <Route exact path="/dashboard/acceuil">
                    <Redirect to="/dashboard/acceuil/projets" />
                </Route>
                <Route path="/dashboard/acceuil/projets">
                    <Projects />
                </Route>
                <Route path="/dashboard/acceuil/collecteurs">
                    <CollectorTable />
                </Route>
            </Switch>
        </div>
    );
};

export default Acceuil;
