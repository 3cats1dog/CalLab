import React, { Fragment } from 'react'
import { getStoredAuthToken } from 'shared/utils/authToken';
import Sidebar from './Sidebar';
import {ContentPage} from './Styles';

import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const hasAuth =getStoredAuthToken();

  return (
        <Route
        {...rest}
        render={props => ()=>{
            return hasAuth ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/authenticate', state: { from: props.location } }} />
            )
            }
        }
        />
  )
}

export default PrivateRoute