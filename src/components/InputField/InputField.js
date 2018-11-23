import React from 'react'
import classes from './InputField.css';
import classNames from 'classnames';
import LoadingImage from '../../assets/loading.svg'


const inputField = (props) => {

    let visibility = null
    if (props.showLoadingAnimation) {
      visibility = classes.visibile
    } else {
      visibility = classes.not_visibile
    }

  return (
    <div className={classes.container}>
        <input className={classes.input} type="text" onChange={props.changed} />
        <input className={classNames(classes.input, classes.inputButton)} type="button" value="Check!" onClick={props.handleGetRequest} />
        <div className={visibility}>
          <img src={LoadingImage} />
        </div>
    </div>
  )
}

export default inputField
