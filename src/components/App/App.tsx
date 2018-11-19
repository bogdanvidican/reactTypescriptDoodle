import * as React from 'react';
import logo from '../../assets/logo.svg';
import Cards from '../Cards';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>PicVisor</h2>
        </header>
        <Cards />
      </div>
    );
  }
}

export default App;
