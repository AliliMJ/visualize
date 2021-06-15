import Login from './pages/login';
import Welcome from './pages/welcome';
import Register from './pages/register';

import { AuthProvider } from './hook/useAuth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Dashboard from './pages/dashboard';
import { Map } from './hook/useMap';
import Project from './pages/projects/project';
import Activity from './pages/projects/activity';

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Welcome} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Map>
                            <PrivateRoute
                                path="/dashboard"
                                component={Dashboard}
                            />
                            <PrivateRoute
                                path="/projects/:id"
                                component={Project}
                            />
                            <PrivateRoute
                                path="/activities/:id"
                                component={Activity}
                            />
                        </Map>
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
