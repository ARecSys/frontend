import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { List, ListItem, IconButton, ListItemText, Paper } from "@material-ui/core";
import { Favorite, Clear } from "@material-ui/icons"

/*
function generatefoo(element, array) {
  return array.map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
*/

function NeighborList(props) {
    const [neighbors, setNeighbors] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const doi_in_favorite = (doi, favoritesArray) => {
        for (const fav of favoritesArray) {
            if (doi == fav.doi) return true
        }
        return false
    }



    function generate(neighborsArray, favoritesArray) {
      return neighborsArray.map((neighbor) =>{
        
        return (<ListItem>
                
            <ListItemText
                primary={neighbor.title}
                secondary={'Secondary text' }
            />
            {
                doi_in_favorite(neighbor.doi, favoritesArray) ? 
                    <IconButton edge="end" aria-label="favorite" onClick={() => handleClear(neighbor.doi)}>
                        <Clear />
                    </IconButton> :

                    <IconButton edge="end" aria-label="favorite" onClick={() => handleFav(neighbor.doi)}>
                        <Favorite />
                    </IconButton>   
            }

        </ListItem>
        )}
      );
    }

    const handleFav = (doi) => {
        const token = localStorage.getItem('token')
        axios.post(`/api/fav/add?doi=${doi}`, {}, { headers:{'x-access-token': token} }
        ).then(res => {
            console.log("successful add to fav")
            favorites.push({doi})
            setFavorites([... favorites])

        })
    };

    const handleClear = (doi) => {
        const token = localStorage.getItem('token')
        axios.post(`/api/fav/delete?doi=${doi}`, {}, { headers:{'x-access-token': token} }
        ).then(res => {
            console.log("successful removed fav")
            const newFavorites = favorites.filter( (element) => {return element.doi != doi})
            setFavorites(newFavorites)
        })
      };



    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get(`/api/fav/list`,  { headers:{'x-access-token': token} }
        ).then(res => {
            setFavorites(res.data)
        })

        setNeighbors(props.neighbors)
    }, [])

    useEffect(() => {

        setNeighbors(props.neighbors)
    }, [props.neighbors])
    

    return (
        <Paper elevation={6} style={{ padding: 10, marginRight: -10, marginLeft: 30, maxHeight: 400, overflow: 'scroll' }}>
            <List >
                {generate(neighbors, favorites)}
            </List>
        </Paper>
        
    )
}

NeighborList.propTypes = {

}

export default NeighborList

