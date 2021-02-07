import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <div id="App">
        <Navigation />
        <section id="Wrapper">
          <Header />
          <section id="Content">
            <Dashboard />
          </section>
        </section>
      </div>
    )
  }

}

export default App;
