import { Redirect, Route, Switch } from 'react-router-dom';

import CollectorTable from '../../projects/collectorTable';
import ProjectTable from './projectTable';

const Acceuil = () => {
    return (
        <div className="space-y-6">
            {/* <TabsAcceuil /> */}
            <Switch>
                <Route exact path="/dashboard/acceuil">
                    <Redirect to="/dashboard/acceuil/projets" />
                </Route>
                <Route path="/dashboard/acceuil/projets">
                    <div className="text-3xl text-gray-500">
                        Liste des projets
                    </div>
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
