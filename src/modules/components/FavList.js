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

    const [array, setArray] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem('token')
      axios.get(`/api/fav/list`,  { headers:{'x-access-token': token} }
      ).then(res => {
          setArray(res.data)
      })
    }, [])
    
    const handleRemoveDiv = (idx) => {
        let arrayCopy = [...array];
        arrayCopy.splice(array.indexOf(idx), 1); //remove the item at the specific index
        setArray(arrayCopy);
    };

    return (        
      <List >
        {generate(array)}
      </List>
    )
}

FavList.propTypes = {

}

export default FavList

