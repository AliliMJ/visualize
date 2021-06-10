import Login from './pages/login';
import Welcome from './pages/welcome';
import Register from './pages/register';

import { AuthProvider } from './hook/useAuth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
