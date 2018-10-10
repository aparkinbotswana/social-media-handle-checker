import React, { Component } from 'react';
import LogoContainer from './containers/LogoContainer/LogoContainer'
import InputField from './components/InputField/InputField'
import classes from './index.css'

class App extends Component {

  state = {
    username: '',
    submittedUsername: '',
    usernameValid: true,
    sendRequest: false
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
    if (this.state.usernameValid === false) {
    // testing for invalid characters. Prevent fetch request if detected
      return
    }
    if (this.state.sendRequest) {
      this.setState({ sendRequest: false })
    } else {
      this.setState({ sendRequest: true })
    }
    this.setState({ submittedUsername: this.state.username })
  };

  render() {
    let invalidMessage = null
    if (this.state.usernameValid === false) {
      invalidMessage = <p className={classes.invalidMessageText}>Invalid Username Character</p>  
    }    

    return (
      <div>
        <h1>Username Checker</h1>
        <InputField 
          handleGetRequest={this.handleGetRequest} 
          changed={(event) => this.usernameInput(event)} />  
        <div className={classes.invalidMessageContainer}>{invalidMessage}</div>
        <LogoContainer 
          handleGetRequest={this.handleGetRequest} 
          username={this.state.username} 
          sendRequest={this.state.sendRequest}
          submittedUsername={this.state.submittedUsername} />
      </div>
    )
  }
}

export default App
