import React, { Component } from 'react'
import classes from './SocialMediaContainer.css'
import GithubImage from '../../assets/github.svg'
import InstagramImage from '../../assets/instagram.svg'
import TwitterImage from '../../assets/twitter.svg'


class SocialMediaContainer extends Component {

  state = {
    socialMediaSites: [
      { website: "https://github.com/", availability: null, tag: GithubImage, id: "github", className: [classes.flex] },
      { website: "https://twitter.com/", availability: null, tag: TwitterImage, id: "twitter", className: [classes.flex] },
      { website: "https://www.instagram.com/", availability: null, tag: InstagramImage, id: "instagram", className: [classes.flex] }
    ]
  }


  makeGetRequest = (username) => {

    const updateAvailability = (myJson) => {
      const socialMediaSites = [...this.state.socialMediaSites]
      // creating copy of array so we can alter it as need be. 
      socialMediaSites.map((socialMediaSite) => {
        // iterate through every object in the array so we can update the key/value pairs based on response from server
        for (const url in socialMediaSite) {
          for (const myJsonKey in myJson) {
            if (myJsonKey === socialMediaSite[url]) {
              // iterating through key value pair and checking to see if it is the correct key so the correct value is updated
              socialMediaSite.availability = myJson[myJsonKey];
            }
          }
          this.setState({ socialMediaSites: socialMediaSites })
          //setting the state of original datastructure to the altered version that we defined and altered above.
        }
      })
    }

    const updateClass = () => {
      const socialMediaSites = [...this.state.socialMediaSites]
      socialMediaSites.map((socialMediaSite) => {
        if (socialMediaSite.availability === true) {
          socialMediaSite.className = [classes.flex, classes.available];
        } else if (socialMediaSite.availability === false) {
          socialMediaSite.className = [classes.flex, classes.unavailable];
        }
        // conditionally applying classes to each component based on response
        this.setState({ socialMediaSites: socialMediaSites })
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
    let imgClass = [classes.flex]
    for (const key of this.state.socialMediaSites) {
      // console.log(key.availability);
      if (key.availability === true) {
        imgClass = [classes.flex, classes.available];
      } else if (key.availability === false) {
        imgClass = [classes.flex, classes.unavailable];
      }
    }

    return (
      <div className={classes.container}>
        {this.state.socialMediaSites.map((socialMediaSite) => {
          return <img src={socialMediaSite.tag} key={socialMediaSite.id} className={socialMediaSite.className.join(' ')} />
        })}
      </div>
    )
  }
}

export default SocialMediaContainer
