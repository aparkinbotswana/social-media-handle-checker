import React from 'react'
import classes from './InputField.css';


const inputField = (props) => {

  return (

    <div>
      <input type="text" onChange={props.changed}/>
      <button type="button" value="Submit">Submit</button>
    </div>
  )
}

export default inputField
