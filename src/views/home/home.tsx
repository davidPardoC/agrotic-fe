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
import { Dashboard } from "../dashboard/dashboard";
import { Plants } from "./views/plants";
import { Settings } from "../settings/settings";
import {CampDataScreen} from './views/camp-data/camp-data';
import  {SwitchWrapper, ContentWrapper} from '../styles/layout'
 export const Home = () => {
  let { path} = useRouteMatch();
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
            <Route path={`${path}/camp-data/:id/:plant`}>
              <CampDataScreen/>
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
