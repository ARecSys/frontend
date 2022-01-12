import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#F2F4F4",
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: 'flex',
  },
  iconsWrapper: {
    height: 60,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  }

}));


export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          className={classes.iconsWrapper}
          spacing={2}
        >

          <Grid item className={classes.icons}>
            <a href="https://material-ui.com/" className={classes.icon}>
              <img src="/appFooterFacebook.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com/MaterialUI" className={classes.icon}>
              <img src="/appFooterTwitter.png" alt="Twitter" />
            </a>
          </Grid>

        </Grid>

      </Container>
    </Typography>
  );
}
