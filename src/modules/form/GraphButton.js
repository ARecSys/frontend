import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {

    const handleClick = (e) => {
        e.preventDefault();
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


