import React from 'react'
import classes from './InputField.css';


const inputField = (props) => {
  return (
    <div>
      <input type="text" onChange={props.changed}/>
      <input type="button" value="Submit" onClick={props.handleGetRequest}/>
    </div>
  )
}

export default inputField
