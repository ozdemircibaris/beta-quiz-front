import React, { Component } from 'react';
import YouTube from 'react-youtube';
const opts = {
  height: '390',
  width: '640',
  controls: 0,
  playerVars: {
    controls: 0,
    disablekb: true,
  // https://developers.google.com/youtube/player_parameters
  },
};
export default class App extends Component {
  state = {
    timerStatus: false,
    secsTimer: 0,
    milliSecstimer: 0,
    videoRefs: null,
    formStatus: false,
    nextStatus: false,
  }
  milliSecsTick = () => this.setState({ secsTimer: this.state.milliSecstimer / 100, milliSecstimer: this.state.milliSecstimer + 1 })

  startTimer = (e, status) => {
    const { timerStatus, videoRefs, nextStatus } = this.state;
    console.log('status', status)
    let videoCurrentTime = e != null ? (e.target.playerInfo.currentTime).toFixed(1):null;
    this.setState({ secsTimer: videoCurrentTime })

    if(status == "play") {
      this.milliSecsInterval = setInterval(this.milliSecsTick, 10);
      videoRefs.playVideo()
    } else if(status == "pause") {
      clearInterval(this.milliSecsInterval);
      videoRefs.pauseVideo()
    } else {
      // videoRefs.pauseVideo()
    }
  }

  componentDidUpdate(props) {
    const { secsTimer, milliSecstimer } = this.state;
    if(secsTimer == "2") {
      this.startTimer(null, "pause")
      this.setState({ formStatus: true })
    }
  }

  render() {
    const { secsTimer, milliSecstimer, videoRefs, formStatus } = this.state;
    console.log('videoRefs', videoRefs)
    return (
      <div>
        <YouTube videoId="e5QEAI_O2IA"
          opts={opts}

          onPlay={(e) => this.startTimer(e, "play")}
          onPause={(e) => this.startTimer(e, "pause")}
          // onStateChange={(e) => console.log('e.target', e.target.playerInfo.currentTime)}
          onReady={(e) => this.setState({ videoRefs: e.target })} />
        <h1> secs timer: {secsTimer} </h1>
        <h1> milli secs timer: {milliSecstimer} </h1>

        {
          formStatus == true ? <h1> form çıkacakkk </h1>:<h1> çıkmıcakkk </h1>
        }
        {
          formStatus == true ? <button onClick={() => {
            this.setState({ nextStatus: true })
            this.startTimer(null, "play")
          }}> devam et paşa </button>:null
        }
      </div>
    )
  }
}