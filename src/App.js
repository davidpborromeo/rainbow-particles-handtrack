import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { special, setup, draw } from './libs/special'


class App extends Component {
  componentWillMount(){
    // setup();
  }
  componentDidMount(){
    special(window.innerWidth / 2, 0);
  }

  render(){
    return (
      <div className="container" id="container">
      </div>
    );
  }
}

export default App;
