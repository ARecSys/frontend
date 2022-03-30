import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const SearchBar = props => {
    const useStyles = makeStyles(theme => ({
        root: {
          padding: theme.spacing(3, 2)
        },
        container: {
          display: "flex",
          flexWrap: "wrap"
        }
      })
    );
    const classes = useStyles();

    const [title, setTitle] = useState("")
    const [query, setQuery] = useState(
        () => (value, props) => {
            return {
                query: {
                    match: {
                        title: value
                    }
                }
            }
      }
    )
  return (
    <Paper className={classes.root} elevation={6} style={{ padding: 10, marginBottom:10, marginTop:10, marginRight: 30, marginLeft: 30, justifyContent: "center",
    alignItems: "center",
    textAlign: "center", }}>
    <ReactiveBase
        url={process.env.REACT_APP_ES_URL}
        app={process.env.REACT_APP_ES_INDEX}
        credentials= {process.env.REACT_APP_ES_CREDENTIALS}
        enableAppbase={false}
    >
        <DataSearch
            componentId="searchbox"
            type= "search"
            dataField={"title"}
            customQuery={query}
            onValueChange={
                (value) => {
                  setTitle(value)
                  setQuery(
                    () => (value, props) => {
                        return {
                            query: {
                                match: {
                                    title: title
                                }
                            }
                        }
                  }
                  )
                }
              }
            onValueSelected={
                (value, cause, source) => {
                    if (cause == "SUGGESTION_SELECT"){
                        props.onChange(source.doi)
                    }
                    if (cause == "ENTER_PRESS" || cause == "SEARCH_ICON_CLICK"){
                        props.onClick()
                        
                    }
                        
                }
            }

        />
        </ReactiveBase>
        </Paper>
    )
}

SearchBar.propTypes = {}

export default SearchBar