import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class App extends Component {
  state = {
    timerStatus: false,
    timer: 0
  }
  tick = () => this.setState({ timer: this.state.timer + 1 })

  startTimer = () => {
    const { timerStatus, timer } = this.state;
    if(timerStatus == false) {
      this.interval = setInterval(this.tick, 1000);
      this.setState({ timerStatus: true })
    } else {
      clearInterval(this.interval);
      this.setState({ timerStatus: false })
    }
  }

  render() {
    const { timerStatus, timer } = this.state;
    console.log('timer', timer)
    return (
      <div>
        <YouTube videoId="e5QEAI_O2IA" opts={opts} onReady={this._onReady} />;
        <h1> timer: {timer} </h1>
        <button
          onClick={this.startTimer}
          style={{ margin: 50 }}>
            {timerStatus == false ? "Start":"Pause"}
        </button>
      </div>
    )
  }
}