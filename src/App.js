import React, { Component } from 'react';
import LogoContainer from './containers/LogoContainer/LogoContainer'
import InputField from './components/InputField/InputField'
import classes from './index.css'

class App extends Component {

  state = {
    username: '',
    submittedUsername: '',
    usernameValid: true,
    sendRequest: false,
    showLoadingAnimation: false
  }

  usernameInput = (event) => {
    if (/\s|\?|`|~|!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|{|}|\[|\]|\||\\|:|;|"|'|<|>|,|\//.test(event.target.value)) {
      // testing for invalid characters to display message
      this.setState({ usernameValid: false })
    } else {
      this.setState({ usernameValid: true })   
    }
    this.setState({ username: event.target.value })
  };

  handleGetRequest = () => {
    if (this.state.usernameValid === false || this.state.username === "") {
    // testing for invalid characters. Prevent fetch request if detected
    // Also prevent request if the field is empty and check button pressed.
      return
    }
    if (this.state.sendRequest) {
      this.setState({ sendRequest: false })
    } else {
      this.setState({ 
        sendRequest: true,
        showLoadingAnimation: true
      })
    }
    this.setState({ submittedUsername: this.state.username })
  };

  updateLoadingAnimation = () => {
    this.setState({ showLoadingAnimation: false})
  };

  render() {
    let invalidMessage = null
    if (this.state.usernameValid === false) {
      invalidMessage = <p className={classes.invalidMessageText}>Invalid Username Character</p>  
    }    

    return (
      <div>
        <h1>Username Checker</h1>
        <p className={classes.introText}>Want a particular username for website? Curious to know if it exists? Just type it into the input field and click "Check!". The logos will change colour depending on their availability across websites. Still a work in progress, but perfectly usable. The server that makes the requests is currently using Heroku, so it may take a short while for the first request to process.</p>
        <InputField 
          handleGetRequest={this.handleGetRequest} 
          changed={(event) => this.usernameInput(event)}
          showLoadingAnimation={this.state.showLoadingAnimation} />  
        <div className={classes.invalidMessageContainer}>{invalidMessage}</div>
        <LogoContainer 
          handleGetRequest={this.handleGetRequest} 
          username={this.state.username} 
          sendRequest={this.state.sendRequest}
          submittedUsername={this.state.submittedUsername}
          updateLoadingAnimation={this.updateLoadingAnimation} />
      </div>
    )
  }
}

export default App
