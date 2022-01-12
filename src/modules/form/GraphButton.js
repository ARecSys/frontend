import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {

    const handleClick = (e) => {
        e.preventDefault();
        console.log('Le lien a été cliqué.');
    }
    
    return (
        <a href="#" onClick={handleClick}>
            Get Related Articles
        </a>
    )
}

Button.propTypes = {

}

export default Button


