import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { special, setup, draw, updatePos } from './libs/special'
import {bindPage} from './libs/bodytrack';
// import {handtrack, toggleVideo} from './libs/handtrack';
import * as posenet from '@tensorflow-models/posenet';


class App extends Component {
  constructor(props) {
    super(props);
    this.myVideo = React.createRef();
    this.myCanvas = React.createRef();
    this.state = {
      positionX: window.innerWidth / 2,
      positionY: 0
    }

    this.getPosition = this.getPosition.bind(this);
  }

  componentDidMount(){
    special(this.state.positionX, this.state.positionY);
    handtrack(this.myVideo.current, this.myCanvas.current, this.getPosition);
  }

  getPosition(val) {
    this.setState({
      positionX: val.x,
      positionY: val.y
    });
 }


  render(){
    updatePos(this.state.positionX, this.state.positionY)
    return (
      <div className="container" id="container">
        <button  id="trackbutton" className="bx--btn bx--btn--secondary" type="button" onClick={() => toggleVideo()}>
          Toggle Video
        </button>

        <video id="video" playsinline
        ref={this.myVideo}
        style=" -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        display: none;
        ">
        </video>
        <canvas id="output" ref={this.myCanvas} />
      </div>
    );
  }
}

export default App;
