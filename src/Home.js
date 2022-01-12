import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import AppFooter from "./modules/views/AppFooter";
import ProductHero from "./modules/views/ProductHero";
import ProductValues from "./modules/views/ProductValues";
import AppAppBar from "./modules/views/HomeBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import useToken from './actions/authActions';

function App() {

  const [ userData, setUserData ] = useState(null);
  const { token, setToken } = useToken();
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/signin">
          {token? <Redirect to="/dash"/> : <SignIn setToken={setToken} setUserData={setUserData} /> }
        </Route>
        <Route path="/signup">
          {token ? <Redirect to="/dash"/> : <SignUp />}
        </Route>
        <Route path="/dash">
          {token ? <Dashboard data={userData} /> : <Redirect to="/signin"/> }
        </Route>
      </Switch>
    </Router>
  );
}

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(App);
