import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";



const GraphInput = props => {

    const useStyles = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1)
        },
        leftIcon: {
          marginRight: theme.spacing(1)
        },
        rightIcon: {
          marginLeft: theme.spacing(1)
        },
        iconSmall: {
          fontSize: 20
        },
        root: {
          padding: theme.spacing(3, 2)
        },
        container: {
          display: "flex",
          flexWrap: "wrap"
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 400
        }
      })
    );
    const classes = useStyles();

    return (
            <Paper className={classes.root} elevation={6} style={{ padding: 10, marginBottom:10, marginTop:10, marginRight: 30, marginLeft: 30, justifyContent: "center",
            alignItems: "center",
            textAlign: "center", }}>

                <form onSubmit={props.onSubmit}>
                <div>
                <TextField
                    label="DOI"
                    id="margin-normal"
                    name="name"
                    defaultValue={props.DOI}
                    helperText="Enter the DOI"
                    onChange={e => props.onChange(e.target.value)}
                />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Submit 
                </Button>
                </form>
            </Paper>
      );
}

GraphInput.propTypes = {

}

export default GraphInput

