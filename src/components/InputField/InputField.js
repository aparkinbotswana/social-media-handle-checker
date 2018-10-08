import React from 'react'
import classes from './InputField.css';
import classNames from 'classnames';


const inputField = (props) => {
  // HANDLE SPACES!!!!!!!!
  return (
    <div className={classes.container}>
      <div className={classes.flex}>
        <input className={classes.input} type="text" onChange={props.changed} />
        <input className={classNames(classes.input, classes.input__button)} type="button" value="Submit" onClick={props.handleGetRequest} />
      </div>
    </div>
  )
}

export default inputField
