import { FaRegBell } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { Route, Switch } from 'react-router-dom';

import { useInfo } from '../../hook/useInfo';
import TabsAcceuil from './acceuil/tabsAcceuil';

const Navbar = (props) => {
    const { avatar, firstName } = useInfo();
    return (
        <div className="flex flex-row-reverse" {...props}>
            <div className="flex flex-row-reverse items-center space-x-5 space-x-reverse">
                <div className="flex items-center space-x-0.5">
                    <div className="rounded-full w-10 h-10 bg-gray-400 mr-2 overflow-hidden">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="text-gray-900 font-semibold text-sm">
                        Bonjour, {firstName}
                    </div>
                </div>
            </div>
            <Switch>
                <Route path="/dashboard/acceuil/">
                    <TabsAcceuil className="mr-auto self-center" />
                </Route>
            </Switch>
        </div>
    );
};

export default Navbar;
