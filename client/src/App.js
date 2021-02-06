import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiRes: ''
    }
  }

  componentDidMount() {
    axios.get('/api/users')
    .then(res => {
      this.setState({ apiRes: res.data });
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
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
