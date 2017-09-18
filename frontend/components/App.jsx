import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import DashboardContainer from './dashboard/dashboard_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route } from 'react-router-dom';
import React from 'react';

const App = () => (
    <div>
      <AuthRoute path='/login' component={LoginContainer}/>
      <AuthRoute path='/signup' component={SignupContainer}/>
      <ProtectedRoute path='/dashboard' component={DashboardContainer}/>
    </div>
);

export default App;
