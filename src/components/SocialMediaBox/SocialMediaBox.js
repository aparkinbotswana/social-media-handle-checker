import React from 'react'
import classes from './SocialMediaBox.css'
import TwitterImage from '../../assets/twitter.svg'


const socialMediaBox = (props) => {
  let style = {
    fill : 'white',
  }
  return (
    <div>
      <TwitterImage style={style} className={classes.available}/>
      <p className={classes.container}>Dear Webpack. Please compile</p>
    </div>
  )
}

export default socialMediaBox