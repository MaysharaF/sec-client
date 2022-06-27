import React, { useState, useEffect } from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

import Home from "../pages/Home";
import Login from "../pages/Login";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const fetchPermission = async () => {
      const response = await isAuthenticated();
      setAuthenticated(response);
      setLoading(false);
    };
    fetchPermission();
  }, []);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        loading ? (
          <></>
        ) : authenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/home" component={Home} />
    <Route exact path="*" component={Login} />
  </Switch>
);

export default Routes;
