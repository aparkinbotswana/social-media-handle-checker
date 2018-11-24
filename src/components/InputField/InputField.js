import React from 'react'
import classes from './InputField.css';
import classNames from 'classnames';
import LoadingImage from '../../assets/loading.svg'


const inputField = (props) => {

    let visibility = null
    if (props.showLoadingAnimation) {
      visibility = null
    } else {
      visibility = classes.not_visibile
    }

  return (
    <div className={classes.input_component_container}>
        <input className={classes.input} type="text" onChange={props.changed} />
      <div className={classes.container}>
        <div>
            <input className={classNames(classes.input, classes.inputButton)} type="button" value="Check!" onClick={props.handleGetRequest} />
        </div>
        <div>
          <img src={LoadingImage} className={classNames(classes.loading_animation, visibility)} />
        </div>
      </div>
    </div>
  )
}

export default inputField
