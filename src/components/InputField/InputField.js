import React from 'react'
import classes from './InputField.css';
import classNames from 'classnames';


const inputField = (props) => {
  // HANDLE SPACES!!!!!!!!
  return (
    <div className={classes.container}>
        <input className={classes.input} type="text" onChange={props.changed} />
        <input className={classNames(classes.input, classes.input__button)} type="button" value="Submit" onClick={props.handleGetRequest} />
    </div>
  )
}

export default inputField
