import React, { Component } from 'react';
import video from './videos/serefsizGS.mp4';
import ReactPlayer from 'react-player'

export default class App extends Component {
  state = {
    videoStatus: false,
    formStatus: false
  }
  onLoadForm = (playedSeconds) => {
    let toFixedSeconds = playedSeconds.toFixed(1)
    if(toFixedSeconds === "3.0") {
      this.setState({ videoStatus: false, formStatus: true })
    }
  }
  render() {
    const { videoStatus, formStatus } = this.state;
    return (
      <div>
        <ReactPlayer
          ref={ref => this.videoRef = ref}
          url={video}
          progressInterval={100}
          playing={videoStatus}
          onProgress={(e) => this.onLoadForm(e.playedSeconds)}
          />
        { videoStatus === false && formStatus === false ? <button style={{ margin: 10}} onClick={() =>this.setState({ videoStatus: true })}>start</button>:null}
        {
          formStatus === true ?
          <div>
            <h1> öğtmenim böğün burda form çıkacak </h1>
            <button onClick={() => this.setState({videoStatus: true, formStatus: false }) }> devam et </button>
          </div>
          :null
        }
      </div>
    )
  }
}