import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { Link } from "react-router-dom";
import {
  makeStyles,
} from "@material-ui/core";
import AppFooter from './modules/views/AppFooter';
import DashBar from './modules/views/DashBar';
import GraphView from './modules/views/GraphExploration';


const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignIn() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <DashBar />

      <GraphView />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
