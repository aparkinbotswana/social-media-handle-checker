import React from 'react'
import classes from './InputField.css';


const inputField = (props) => {

  return (

    <div>
      <input type="text" onChange={props.changed} value={props.username} />
    </div>
  )
}

export default inputField
