import React, { Component } from 'react'
import classes from './SocialMediaContainer.css'
import GithubImage from '../../assets/github.svg'
import InstagramImage from '../../assets/instagram.svg'
import TwitterImage from '../../assets/twitter.svg'


class SocialMediaContainer extends Component {

  state = {
    socialMediaSites: [
      { "https://github.com/": null, tag: GithubImage, id: "github" },
      { "https://twitter.com/": null, tag: TwitterImage, id: "twitter" },
      { "https://www.instagram.com/": null, tag: InstagramImage, id: "instagram" }
    ]
  }


  makeGetRequest = (username) => {

    const handleResponse = (myJson) => {
      const socialMediaSites = [...this.state.socialMediaSites]
      // creating copy of array so we can alter it as need be. 
      socialMediaSites.map((socialMediaSite) => {
        // iterate through every object in the array so we can update the key/value pairs based on response from server
        for (const urlKey in socialMediaSite) {
          for (const myJsonKey in myJson) {
            if (myJsonKey === urlKey) {
              // iterating through key value pair and checking to see if it is the correct key so the correct value is updated
              socialMediaSite[urlKey] = myJson[myJsonKey];
            }
          }
          this.setState({ socialMediaSites: socialMediaSites })
          //setting the state of original datastructure to the altered version that we defined and altered above.
        }
      })
    }

    fetch(`https://aqueous-ocean-13621.herokuapp.com/?u=${username}`).then(function (response) {
      return response.json(); 
    }).then(function (myJson) { 
      return handleResponse(myJson) 
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
    let imgClass = [classes.flex];
    let style = null
    
    this.state.socialMediaSites.map((socialMediaSite) => {
      if (this.state.socialMediaSites === 1) {
        imgClass = [classes.flex, classes.available];
      } else if (this.state.socialMediaSites > 1) {
        imgClass = [classes.flex, classes.unavailable];
      }
    })
    for (const key of this.state.socialMediaSites) {
      console.log(key);
    }

    return (
      <div className={classes.container}>
        {this.state.socialMediaSites.map((socialMediaSite) => {
          return <img src={socialMediaSite.tag} key={socialMediaSite.id} className={imgClass.join(' ')} />
        })}
      </div>
    )
  }
}

export default SocialMediaContainer
