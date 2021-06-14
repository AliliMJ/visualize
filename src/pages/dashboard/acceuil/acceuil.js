import { Redirect, Route, Switch } from 'react-router-dom';
import TabsAcceuil from './tabsAcceuil';

import CollectorTable from '../../projects/collectorTable';
import ProjectTable from './projectTable';

const Acceuil = () => {
    return (
        <div className="space-y-6">
            <TabsAcceuil />
            <Switch>
                <Route exact path="/dashboard/acceuil">
                    <Redirect to="/dashboard/acceuil/projets" />
                </Route>
                <Route path="/dashboard/acceuil/projets">
                    <ProjectTable />
                </Route>
                <Route path="/dashboard/acceuil/collecteurs">
                    <CollectorTable />
                </Route>
            </Switch>
        </div>
    );
};

export default Acceuil;
