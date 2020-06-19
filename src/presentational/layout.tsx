import React from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { routes } from "../utils/definitions";
import Spinner from "./spinner";
import Header from "./header";
import NavBar from "./navbar";
import ListLaunches from "./list_launches";
import LaunchDetails from "./launch_details";

export interface LayoutProps {}

const Layout: React.SFC<LayoutProps> = () => {
  return (
    <Container>
      <HashRouter>
        <Spinner />
        <Header />
        <NavBar />

        <Switch>
          <Route exact path={routes.launches} component={ListLaunches} />
          <Route path={`${routes.launches}/:id`} component={LaunchDetails} />
          <Redirect to={routes.launches} />
        </Switch>
      </HashRouter>
    </Container>
  );
};

export default Layout;
