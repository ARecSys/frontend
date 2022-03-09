import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { List, ListItem, IconButton, ListItemText } from "@material-ui/core";
import { Delete } from "@material-ui/icons"


function FavList(props) {

    function generate(array) {
      return array.map((element) =>
      <ListItem>
              
        <ListItemText
        primary={element.title}
        secondary={'doi : '+ element.doi }
        />

        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDiv(element)}>
          <Delete />
        </IconButton>

      </ListItem>
      );
    }

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem('token')
      axios.get(`/api/fav/list`,  { headers:{'x-access-token': token} }
      ).then(res => {
        setFavorites(res.data)
      })
    }, [])
    
    const handleRemoveDiv = (fav) => {
      const token = localStorage.getItem('token')
      axios.post(`/api/fav/delete?doi=${fav.doi}`, {}, { headers:{'x-access-token': token} }
      ).then(res => {
          console.log("successful removed fav")
          const newFavorites = favorites.filter( (element) => {return element.doi != fav.doi})
          setFavorites(newFavorites)
      })
    };

    return (        
      <List >
        {generate(favorites)}
      </List>
    )
}

FavList.propTypes = {

}

export default FavList

