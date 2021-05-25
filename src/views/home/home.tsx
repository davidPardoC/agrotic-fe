import React, { useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Header } from "../../components/home/header/header";
import { Sidebar } from "../../components/home/sidebar/sidebar";
import { Dashboard } from "./views/dashboard/dashboard";
import {
  ContentWrapper,
  SwitchWrapper,
} from "./views/dashboard/styled-components";
import { Plants } from "./views/plants";
import { Settings } from "./views/settings";
export const Home = () => {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  const [sidebarState, setSidebarState] = useState<boolean>(false);

  const switchTab = (route: string) => {
    history.push(`${path}/${route}`);
  };

  return (
    <div>
      <Header sidebarState={sidebarState} setSidebarState={setSidebarState} />
      <ContentWrapper>
        <Sidebar sidebarState={sidebarState} switchTab={switchTab} />
        <SwitchWrapper>
          <Switch>
            <Route path={`${path}/dashboard`}>
              <Dashboard />
            </Route>
            <Route path={`${path}/plants`}>
              <Plants />
            </Route>
            <Route path={`${path}/settings`}>
              <Settings />
            </Route>
            <Route path="*">
              <Redirect to={`${path}/plants`} />
            </Route>
          </Switch>
        </SwitchWrapper>
      </ContentWrapper>
    </div>
  );
};
