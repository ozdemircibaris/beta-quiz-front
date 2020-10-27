import React, { Component } from 'react';
import video from './videos/serefsizGS.mp4';
import ReactPlayer from 'react-player';
import { Container, Button, Form, Radio } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';
export default class App extends Component {
  state = {
    videoStatus: false,
    formStatus: false,
    answerValue: "",
    answerErrorStatus: false
  }
  onLoadForm = (playedSeconds) => {
    let toFixedSeconds = playedSeconds.toFixed(1)
    if(toFixedSeconds === "3.0") {
      this.setState({ videoStatus: false, formStatus: true })
    } else if(toFixedSeconds == "5.0") {
      this.setState({ videoStatus: false, formStatus: true })
    }
  }
  handleChange = (e, { value }) => this.setState({ answerValue: value })
  onContinue = () => {
    if(this.state.answerValue.length == 0) {
      this.setState({ answerErrorStatus: true  })
    } else {
      this.setState({
        videoStatus: true,
        formStatus: false,
        answerValue: ""
      })
    }
  }

  onPlay = () => this.setState({ videoStatus: true })

  render() {
    const { videoStatus, formStatus, answerValue, answerErrorStatus } = this.state;
    return (
      <Container className="container">
        <center>
          <div className="videoContainer">
             { formStatus == true ? <p className="quiz"> soru buraya gelecek</p>:null }
            <ReactPlayer
              ref={ref => this.videoRef = ref}
              url={video}
              progressInterval={100}
              playing={videoStatus}
              onProgress={(e) => this.onLoadForm(e.playedSeconds)}
              />
          </div>
        </center>
        { videoStatus === false && formStatus === false ? <center><Button style={{ margin: 10}} onClick={() =>this.setState({ videoStatus: true })}>play</Button></center>:null}
        {
          formStatus === true ?
          <div>
            <center><Button style={{ margin: 10}} onClick={this.onContinue}> devam et </Button></center>
            <Form>
            <Form.Group inline grouped>
          <Form.Radio
            error={answerErrorStatus == true ? true:false}
            label='Yanıt 1'
            value='answer1'
            checked={answerValue === 'answer1'}
            onChange={this.handleChange}
          />
          <Form.Radio
            error={answerErrorStatus == true ? true:false}
            label='Yanıt 2'
            value='answer2'
            checked={answerValue === 'answer2'}
            onChange={this.handleChange}
          />
          <Form.Radio
            error={answerErrorStatus == true ? true:false}
            label='Yanıt 3'
            value='answer3'
            checked={answerValue === 'answer3'}
            onChange={this.handleChange}
          />
          <Form.Radio
            error={answerErrorStatus == true ? true:false}
            label='Yanıt 4'
            value='answer4'
            checked={answerValue === 'answer4'}
            onChange={this.handleChange}
          />
        </Form.Group>
            </Form>
          </div>
          :null
        }
      </Container>
    )
  }
}