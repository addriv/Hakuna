import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import DashboardContainer from './dashboard/dashboard_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import React from 'react';

const App = () => (
    <div>
      <Switch>
        <AuthRoute path='/login' component={LoginContainer}/>
        <AuthRoute path='/signup' component={SignupContainer}/>
        <ProtectedRoute path='/' component={DashboardContainer}/>
      </Switch>
    </div>
);

export default App;
