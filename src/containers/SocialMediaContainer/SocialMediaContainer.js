import React, { Component } from 'react'
import classes from './SocialMediaContainer.css'
import GithubImage from '../../assets/github.svg'
import InstagramImage from '../../assets/instagram.svg'
import TwitterImage from '../../assets/twitter.svg'


class SocialMediaContainer extends Component {

  state = {
    availability: [
      { "https://github.com/": null },
      { "https://twitter.com/": null },
      { "https://www.instagram.com/": null }
    ]
  }


  makeGetRequest = (username) => {
    const handleResponse = (myJson) => {
      const availability = [...this.state.availability]
      // creating copy of array so we can alter it as need be. 
      availability.map((socialMediaSite) => {
        // iterate through every object in the array so we can update the key/value pairs based on response from server
        for (const urlKey in socialMediaSite) {
          for (const myJsonKey in myJson) {
            if (myJsonKey === urlKey) {
              // iterating through key value pair and checking to see if it is the correct key so the correct value is updated
              socialMediaSite[urlKey] = myJson[myJsonKey];
            }
          }
          this.setState({ availability: availability })
          //setting the state of original datastructure to the altered version that we defined and altered above.
        }
      })
    }

    const alterClass = () => {
      console.log(this.state.availability);
    }

    fetch(`https://aqueous-ocean-13621.herokuapp.com/?u=${username}`).then(function (response) {
      return response.json(); 
    }).then(function (myJson) { 
      return handleResponse(myJson) 
    }).then(function () {
      return alterClass()
    });
  }

  componentDidUpdate() {  
    if (this.props.sendRequest) {
      this.makeGetRequest(this.props.username)
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
        <GithubImage key="github" className={imgClass.join(' ')} />
        <InstagramImage key="instagram" className={imgClass.join(' ')} />
        <TwitterImage key="twitter" className={imgClass.join(' ')} />
      </div>
    )
  }
}

export default SocialMediaContainer
