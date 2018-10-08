import React from 'react'
import classes from './InputField.css';


const inputField = (props) => {
  // HANDLE SPACES!!!!!!!!
  return (
    <div className={classes.container}>
      <div className={classes.flex}>
        <input type="text" onChange={props.changed}/>
        <input type="button" value="Submit" onClick={props.handleGetRequest}/>
      </div>
    </div>
  )
}

export default inputField
