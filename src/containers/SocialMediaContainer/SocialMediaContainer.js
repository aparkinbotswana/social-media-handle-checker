import React, { Component } from 'react'
import classes from './SocialMediaContainer.css'
import GithubImage from '../../assets/github.svg'
import InstagramImage from '../../assets/instagram.svg'
import TwitterImage from '../../assets/twitter.svg'


class SocialMediaContainer extends Component {

  state = {
    availability: {
      github: null,
      instagram: null,
      twitter: null
    }
  }

  handleResponse = (response) => {
    console.log(response);
    // this.setState({  })

  }

  handleReject = () => {
    // console.log('this has been rejected');
  }

  makeGetRequest = (username) => {
    fetch(`https://aqueous-ocean-13621.herokuapp.com/?u=${username}`).then(function (response) {
      console.log(response.json());
      return response.json();
    })
      .then(function (myJson) {
        console.log(myJson);
      });
  }

  componentDidUpdate() {  
    if (this.props.sendRequest) {
      // this.makeGetRequest('https://www.instagram.com/carmen.samdiego/')
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
        <GithubImage className={imgClass.join(' ')} />
        <InstagramImage className={imgClass.join(' ')} />
        <TwitterImage className={imgClass.join(' ')} />
      </div>
    )
  }
}

export default SocialMediaContainer
