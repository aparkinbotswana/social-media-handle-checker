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

    const updateAvailability = (myJson) => {
      const websites = [...this.state.websites];

      // const website = {...this.state.websites};

      // creating copy of array so we can alter it as need be. 
      websites.map((website) => {
        // iterate through every object in the array so we can update the key/value pairs based on response from server
        for (const key in website) {
          for (const myJsonKey in myJson) {
            if (myJsonKey === website[key]) {
              // iterating through key value pair and checking to see if it is the correct key so the correct value is updated
              website.availability = myJson[myJsonKey];
            }
          }
        }
      });
      //setting the state of original datastructure to the altered version that we defined and altered above.
      this.setState({ websites: websites });
      console.log('RETURN from updateAvailability()')
      return 'getfucked';
      
    }

    const updateClass = () => {
      console.warn('HELLO?!!! from updateClass()', this.state.websites);
      const websites = [...this.state.websites]
      websites.forEach((website) => {
        if (website.availability === true) {
          website.className = [classes.available];
        } else if (website.availability === false || "Invalid username") {
          website.className = [classes.unavailable];
        }
        // conditionally applying classes to each component based on response
        this.setState({ websites: websites, newSubmission: true })
        //setting the state of original datastructure to the altered version that we defined and altered above.
      });
    }

    fetch(`https://aqueous-ocean-13621.herokuapp.com/?u=${username}`)
    .then( response => response.json() )
    .then( myJson => { this.setState({ serverResponse: myJson}); } );
 
  }

  componentDidUpdate() {  
    if (this.props.sendRequest) {
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
