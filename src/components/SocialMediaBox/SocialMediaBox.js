import React from 'react'
import classes from './SocialMediaBox.css'
import GithubImage from '../../assets/github.svg'
import InstagramImage from '../../assets/instagram.svg'
import TumblrImage from '../../assets/tumblr.svg'
import TwitterImage from '../../assets/twitter.svg'


const svgImages = [<GithubImage />, <InstagramImage />, <TumblrImage />, <TwitterImage />]
let style = null
// if (true) {
//   style = {
//     fill: 'white',
//   }
// } else {

// }


const socialMediaBox = (props) => {
  return (
    <div className={classes.container}>
      <GithubImage style={style} className={classes.available} />
      <p>Dear Webpack. Please compile</p>
    </div>
  )
}

export default socialMediaBox