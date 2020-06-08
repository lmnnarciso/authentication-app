import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "./MainWrapper";

import LogIn from "../LogIn/index";
import Register from "../Register/index";
import ExamplePageOne from "../Example/index";
import ExamplePageTwo from "../ExampleTwo/index";
import { isAuthenticated } from "../../auth/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect to="/log_in" />
          )
        }
      />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <Switch>
      <Route exact path="/log_in" component={LogIn} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/pages/one" component={ExamplePageOne} />
      <PrivateRoute exact path="/pages/two" component={ExamplePageTwo} />
      <Route path="/" component={LogIn} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </MainWrapper>
);

export default Router;
