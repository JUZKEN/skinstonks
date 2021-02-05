import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiRes: ''
    }
  }

  callAPI() {
    fetch('http://localhost:3001/api/users')
    .then(res => res.text())
    .then(res => this.setState({ apiRes: res }))
  }

  componentDidMount() {
    this.callAPI();
  }

  render () {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.apiRes}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }

}

export default App;
