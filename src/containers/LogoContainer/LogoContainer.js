import React, { Component } from 'react'
import classes from './LogoContainer.css'
import GithubImage from '../../assets/github.svg'
import InstagramImage from '../../assets/instagram.svg'
import TwitterImage from '../../assets/twitter.svg'
import classNames from 'classnames';


class LogoContainer extends Component {

  state = {
    websites: [
      { url: "https://github.com/", availability: null, tag: GithubImage, id: "github", className: null },
      { url: "https://twitter.com/", availability: null, tag: TwitterImage, id: "twitter", className: null },
      { url: "https://www.instagram.com/", availability: null, tag: InstagramImage, id: "instagram", className: null }
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
        } else if (website.availability === false) {
          website.className = [classes.unavailable];
        }
        // conditionally applying classes to each component based on response
        this.setState({ websites: websites })
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
      this.makeGetRequest(this.props.username)
      this.props.handleGetRequest()
      // executes handleGetRequest again so that state for sendRequest can be set back to false
    }
  }
  

  render() {
    // let githubValidationMessage = null
    // let twitterValidationMessage = null
    // let instagramValidationMessage = null
    // this.state.websites.map((website) => {

    // })

    if (this.state.websites === 'Invalid username') {
      invalidMessage = <p>{this.props.username} is an invalid username for a Github account. </p>
    } 

    return (
      <div className={classes.container}>
        {this.state.websites.map((website) => {
          return (
            <div className={classes.flex} key={website.id}>
              <img src={website.tag} className={classNames(classes.svgImage, website.className)} />
            </div>
          )
        })}

      </div>
    )
  }
}

export default LogoContainer
