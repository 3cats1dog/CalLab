import React, { Fragment, useEffect, useState } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { useLocalStorage } from 'shared/utils/useLocalStorage';
import history from 'browserHistory';
import Project from 'Project';
import LoginForm from 'Auth/LoginForm';
import {DashBoard} from 'Dashboard';
import Sample from 'Sample';
import PageError from 'shared/components/PageError';
import { getStoredAuthToken } from 'shared/utils/authToken';

import {CustomerBoard} from 'Customers'
import {LabInstrumentBoard} from 'LabInstruments';
import SettingBoard from 'Settings';
import ScopeBoard from 'Scope';
import {CustomerInstrumentBoard} from 'CustomerInstruments';
import {CalibrationBoard} from 'Calibrations';
import {TemplateBoard, TemplateDetails}  from 'Templates';
import {CalibrationStart } from 'CalibrationStart';
import PrivateRoute from './PrivateRoute'
import Sidebar from './Sidebar';
import {ContentPage} from './Styles';


const Routes = () =>{

  const [isLogin, setIsLogin] =useLocalStorage("isLogin",false);

  useEffect(()=>{
    setIsLogin(getStoredAuthToken()?true:false);
  },[isLogin]);

if (!isLogin)  
{
  return(
    <Router history={history}>
      <Redirect  from="*" to="/authenticate" />
      <Route path="/authenticate" 
        render={() => (
          <LoginForm
            logout={false}
            setIsLogin={setIsLogin}
          />
        )}
       />
    </Router>
  );
}

return (
  <Router history={history}>
    <Sidebar />
    <ContentPage>
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/project" component={Project} />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/sample" component={Sample} />
      <Route path='/works' component={CalibrationBoard} />
      <Route path='/start/:calibrationId'
        render={(routeProps) => (
          <CalibrationStart
            calibrationId={routeProps.match.params.calibrationId}
          />
        )}
      />
    <Route path='/customers' component={CustomerBoard} />
    <Route path='/instruments' component={CustomerInstrumentBoard} />
    <Route path='/equipments' component={LabInstrumentBoard} />
    <Route path='/scope' component={ScopeBoard} />
    <Route path='/templates' component={TemplateBoard} />
    <Route path='/template/:templateId'
        render={routeProps => (
          <TemplateDetails
          templateId={routeProps.match.params.templateId}
        />
        )}
      />      
    <Route path='/settings' component={SettingBoard} />
    <Route path='/logout' 
        render={() => (
          <LoginForm
           logout={true}
           setIsLogin={setIsLogin}
        />
        )}
    />
    <Route component={PageError} />
    </Switch>
    </ContentPage>
  </Router>
);
} ;

export default Routes;
