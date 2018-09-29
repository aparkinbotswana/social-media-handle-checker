import React, { Component } from 'react'
import classes from './SocialMediaContainer.css'
import GithubImage from '../../assets/github.svg'
import InstagramImage from '../../assets/instagram.svg'
import TumblrImage from '../../assets/tumblr.svg'
import TwitterImage from '../../assets/twitter.svg'


// const url = {
//   github: 'https://github.com/',
//       // exmple https://github.com/aparkinbotswana
//       // getting Access-Control-Allow-Origin
//       // bogus request returns 404. successful returns 200
//   instagram: 'https://www.instagram.com/',
//       // example https://www.instagram.com/carmen.samdiego/ NOTE!!! the forward slash at the end seems to be part of many user account. typing the web address without the slash will result in a redirect to the same address with the slash at the end and a 301 status code
//       // not get any Access-Control-Allow-Origin
//       // bogus request brings back 404. successful request gives 200
//   tumblr: '.tumblr.com',
//       // example http://twitter.com/realDonaldTrump
//       // example https://twitter.com/realDonaldTrump
//       // figure out best way to handle http and https. hold an additional key with both in an array? I dunno. maybe check for one and the redirect code of the other? 
//       // Give this some thought. Don't want to include too many special case handles for each social app. Want to try keep it all in on function
//       // getting Access-Control-Allow-Origin
//       // bogus page returns 404. successful returns 200. seems there are both http and https pages. also, https redirect gives 302 before redirecting to http, whereas http gives 307 before redirecting to http pages. may need to account for this in code.
//   twitter: 'https://twitter.com/'
//       //example https://twitter.com/whatisavariable
//       // getting Access-Control-Allow-Origin
//       // bogus page returns 404. successful returns 200. http to https redirects also give a 307 code. This may not be an issue though, it seems all twitter pages are https.
// }


class SocialMediaContainer extends Component {

  state = {
    availability: {
      github: null,
      instagram: null,
      tumblr: null,
      twitter: null
    }
  }

  handleResponse = () => {
    // console.log('this has been resolved');
  }

  handleReject = () => {
    // console.log('this has been rejected');
  }

  makeGetRequest = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(this.handleResponse());        
      xhr.onerror = () => reject(this.handleReject());
      xhr.send();
    });
  }

  componentDidUpdate() {  
    if (this.props.sendRequest) {
      this.makeGetRequest('https://www.instagram.com/carmen.samdiego/')
      // this.makeGetRequest('https://github.com/aparkinbotswana')

      this.props.handleGetRequest()
      // executes handleGetRequest again so that state for sendRequest can be set back to false
    }
  }

  render() {
    
    const imgClass = [classes.flex];
    let style = null
    if (true) {
      style = {
        fill: 'white',
      }
      imgClass.push(classes.available)
    } else if (false) {
      style = {
        fill: 'white',
      }
      imgClass.push(classes.unavailable)
    }


    return (
      <div className={classes.container}>
        <GithubImage className={imgClass.join(' ')} />
        <InstagramImage className={imgClass.join(' ')} />
        <TumblrImage className={imgClass.join(' ')} />
        <TwitterImage className={imgClass.join(' ')} />
      </div>
    )
  }
}

export default SocialMediaContainer
