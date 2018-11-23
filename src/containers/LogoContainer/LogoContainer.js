import React, { Component } from 'react'
import classes from './LogoContainer.css'
import GithubImage from '../../assets/github.svg'
import InstagramImage from '../../assets/instagram.svg'
import TwitterImage from '../../assets/twitter.svg'
import classNames from 'classnames';


class LogoContainer extends Component {

  state = {
    newSubmission: false,
    websites: [
      { url: "https://github.com/", availability: null, tag: GithubImage, id: "Github", className: null },
      { url: "https://twitter.com/", availability: null, tag: TwitterImage, id: "Twitter", className: null },
      { url: "https://www.instagram.com/", availability: null, tag: InstagramImage, id: "Instagram", className: null }
    ],
    serverResponse: {}
  };

  checkUsernameValidity( url ){
    if (!(url in this.state.serverResponse)) {
      return;
    }
    return this.state.serverResponse[url]; // print the error string (or true/false which prints as nothing)
  }

  getLogoClass( url ){
    if( !(url in this.state.serverResponse) ){
      // if the key is not defined, it means we don't even have a response from
      // the server yet, so return an empty class
      return '';
    }
    if( this.state.serverResponse[url] === true ){
      return classes.available;
    } else {
      return classes.unavailable;
    }
  }

  makeGetRequest = (username) => {
    fetch(`https://aqueous-ocean-13621.herokuapp.com/?u=${username}`)
    .then( response => response.json() )
    .then( myJson => { 
      this.setState({ serverResponse: myJson});
      console.log(this.props);
      this.props.updateLoadingAnimation()
    } );
  }

  componentDidUpdate() {  
    if (this.props.sendRequest) {
      console.log(this.props);
      this.setState({ newSubmission: false })
      this.makeGetRequest(this.props.username)
      this.props.handleGetRequest()
      // executes handleGetRequest again so that state for sendRequest can be set back to false
    }
  }

  render() {
    return (
      <div className={classes.container}>
        {this.state.websites.map((website) => {
          return (
            <div className={classes.flex} key={website.id}>
              <div>
                <img src={website.tag} className={classNames( classes.svgImage, this.getLogoClass(website.url) )} />
              </div>
              <div className={classes.validationMessage} >
                {this.checkUsernameValidity(website.url)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default LogoContainer;
