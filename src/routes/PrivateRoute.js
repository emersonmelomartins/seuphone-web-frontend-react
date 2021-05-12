import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function PrivateRoute({ component: Component, ...rest }) {

  const { signed } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        signed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}