import React, { Component } from 'react';
import LogoContainer from './containers/LogoContainer/LogoContainer'
import InputField from './components/InputField/InputField'

class App extends Component {

  state = {
    username: '',
    sendRequest: false
  }

  usernameInput = (event) => {
    this.setState({ username: event.target.value })
  };

  handleGetRequest = () => {
    if (this.state.sendRequest) {
      this.setState({ sendRequest: false })
    } else {
      this.setState({ sendRequest: true })
    }
  };

  render() {
    return (
      <div>
        <h1>Username Checker</h1>
        <InputField handleGetRequest={this.handleGetRequest} changed={(event) => this.usernameInput(event)}/>        
        <LogoContainer handleGetRequest={this.handleGetRequest} username={this.state.username} sendRequest={this.state.sendRequest} />
      </div>
    )
  }
}

export default App
