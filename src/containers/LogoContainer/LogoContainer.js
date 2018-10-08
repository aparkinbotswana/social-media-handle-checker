import React, { Component } from 'react'
import classes from './LogoContainer.css'
import GithubImage from '../../assets/github.svg'
import InstagramImage from '../../assets/instagram.svg'
import TwitterImage from '../../assets/twitter.svg'


class LogoContainer extends Component {

  state = {
    websites: [
      { url: "https://github.com/", availability: null, tag: GithubImage, id: "github", className: [classes.flex] },
      { url: "https://twitter.com/", availability: null, tag: TwitterImage, id: "twitter", className: [classes.flex] },
      { url: "https://www.instagram.com/", availability: null, tag: InstagramImage, id: "instagram", className: [classes.flex] }
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
          website.className = [classes.flex, classes.available];
        } else if (website.availability === false) {
          website.className = [classes.flex, classes.unavailable];
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
    return (
      <div className={classes.container}>
        {this.state.websites.map((website) => {
          return <img src={website.tag} key={website.id} className={website.className.join(' ')} />
        })}
      </div>
    )
  }
}

export default LogoContainer
