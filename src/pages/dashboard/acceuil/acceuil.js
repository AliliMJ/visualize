import { Redirect, Route, Switch } from 'react-router-dom';
import IconButton from '../../../components/common/iconButton';
import { FaPlus } from 'react-icons/fa';

import CollectorTable from '../../projects/collectorTable';
import ProjectTable from './projectTable';
import { useHistory } from 'react-router';
import { useInfo } from '../../../hook/useInfo';

const Acceuil = () => {
    const history = useHistory();
    const { role } = useInfo();
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
                    <div className="space-y-1">
                        <ProjectTable />
                        {role === 'superviseur' && (
                            <IconButton
                                className="bg-transparent shadow border w-full text-gray-500 rounded items-center justify-center"
                                onClick={() => history.push('/ajouter')}
                            >
                                <FaPlus />
                            </IconButton>
                        )}
                    </div>
                </Route>
                <Route path="/dashboard/acceuil/collecteurs">
                    <CollectorTable />
                </Route>
            </Switch>
        </div>
    );
};

export default Acceuil;
