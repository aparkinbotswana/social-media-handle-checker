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
    ]
  }


  makeGetRequest = (username) => {

    const updateAvailability = (myJson) => {
      const websites = [...this.state.websites]
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
          this.setState({ websites: websites })
          //setting the state of original datastructure to the altered version that we defined and altered above.
        }
      })
    }

    const updateClass = () => {
      const websites = [...this.state.websites]
      websites.map((website) => {
        if (website.availability === true) {
          website.className = [classes.available];
        } else if (website.availability === false || "Invalid username") {
          website.className = [classes.unavailable];
        }
        // conditionally applying classes to each component based on response
        this.setState({ websites: websites, newSubmission: true })
        //setting the state of original datastructure to the altered version that we defined and altered above.
      })
    }

    fetch(`https://aqueous-ocean-13621.herokuapp.com/?u=${username}`).then(function (response) {
      return response.json(); 
    }).then(function (myJson) { 
      return updateAvailability(myJson) 
    }).then(function () {
      return updateClass()
    })
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

    let githubValidationMessage = null
    let twitterValidationMessage = null
    let instagramValidationMessage = null

    if (this.state.newSubmission) {
      this.state.websites.map((website) => {
        if (website.url === "https://github.com/" && website.availability === "Invalid username") {
          githubValidationMessage = <p className={classes.validationMessage}>{this.props.submittedUsername} is not a valid username for a Github account.</p>
        } else if (website.url === "https://twitter.com/" && website.availability === "Invalid username") {
          twitterValidationMessage = <p className={classes.validationMessage}>{this.props.submittedUsername} is not a valid username for a Twitter account.</p>
        } else if (website.url === "https://www.instagram.com/" && website.availability === "Invalid username") {
          instagramValidationMessage = <p className={classes.validationMessage}>{this.props.submittedUsername} is not a valid username for an Instagram account.</p>        
        }
      })
    }

    return (
      <div>
        <div className={classes.container}>
          {this.state.websites.map((website) => {
            return (
              <div className={classes.flex} key={website.id}>
                <img src={website.tag} className={classNames(classes.svgImage, website.className)} />
              </div>
            )
          })}
        </div>
        <div>
          {githubValidationMessage}
          {twitterValidationMessage}
          {instagramValidationMessage}
        </div>
      </div>
    )
  }
}

export default LogoContainer
