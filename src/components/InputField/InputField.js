import React from 'react'
import classes from './InputField.css';


const inputField = (props) => {
  
  const initiateRequest = () => {
    props.handleGetRequest();
  };

  return (
    <div>
      <input type="text" onChange={props.changed}/>
      <input type="button" value="Submit" onClick={initiateRequest}/>
    </div>
  )
}

export default inputField
