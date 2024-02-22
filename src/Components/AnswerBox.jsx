import { interviewQuestions } from "../interviewStuff";
import Mic from "@mui/icons-material/Mic";
import { useState, useEffect, useRef } from "react";

//This file is a sub-component for the InterviewPage.jsx file. 

function AnswerBox(prop){
    const [mediaRecorder, setMediaRecorder] = useState();
  const [audioMediaRecorder, setAudioMediaRecorder] = useState();
  const [audioMediaStream, setAudioMediaStream] = useState();
  const [camVisibility, setCamVisibility] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recorderStarted, setRecorderStarted] = useState(false);
  const audioTimer = useRef()
  const [secondTimer, setSecondTimer] = useState(0);
  const [minuteTimer, setMinuteTimer] = useState(0);
  const [hourTimer, setHourTimer] = useState(0);
  const [answerFormat, setAnswerFormat] = useState({video:true,audio:false, text:false})
  let streamVideo = "streamVideo" + prop.index
  let idString = "videoRec" + prop.index
  
   //for video input

   function startRecorder() {
    if (!camVisibility) {
      setCamVisibility(true);
    }
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      let constraints = {
        audio: true,
        video: {
          facingMode: "User",
          width: { min: 640, ideal: 1280 },
          height: { min: 480, ideal: 720 },
        },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStreamObj) => {
          let video = document.getElementById(streamVideo);
          
          let userVideo = document.getElementById(idString);
          if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
          } else {
            video.src = window.URL.createObjectURL(mediaStreamObj);
          }

          if (video.onloadedmetadata) {
            video.play();
          }
          let mediaRecorder = new MediaRecorder(mediaStreamObj);

          mediaRecorder.start();
          setMediaRecorder(mediaRecorder);
          setRecorderStarted(true);
          setRecording(true);
        });
    }
  }
  function stopRecorder() {
    if (recording) {
      let userVideo = document.getElementById(idString);
      let video = document.getElementById(streamVideo);
      if ("srcObject" in video) {
        let srcObj = video.srcObject;
        let tracks = srcObj.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
        video.srcObject = null;
      } else {
        video.src = window.URL.createObjectURL(null);
      }
      setCamVisibility(false);
      let chunksArr = [];
      console.log(mediaRecorder);
      mediaRecorder.ondataavailable = (ev) => {
        console.log("data available");
        chunksArr.push(ev.data);
      };
      mediaRecorder.onstop = (ev) => {
        let blob = new Blob(chunksArr, { type: "video/mp4" });
        console.log(blob);
        chunksArr = []
        let url = window.URL.createObjectURL(blob);
        console.log(url);
        userVideo.src = url;
      };
      mediaRecorder.stop();
      setRecording(false);
      console.log(mediaRecorder.state);
    }
  }
  function recordAgain() {
    startRecorder();
  }

//For audio input
 
  function recordAudio() {
    let second = 0;
    let hour = 0;
    let minute = 0;
    let count = 0;
    audioTimer.current = setInterval(() => {
      count++;
      second++;
      if (count >= (minute + 1) * 60) {
        minute++;
        second = 0;
        setSecondTimer(second);
        setMinuteTimer(minute);
      }
      if (minute >= (hour + 1) * 60) {
        hour++;
        second = 0;
        minute = 0;
        setSecondTimer(second);
        setMinuteTimer(minute);
        setHourTimer(hour);
      }
      setSecondTimer(second);

    }, 1000);
    if (
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    ) {
      let constraints = { audio: true };
      navigator.mediaDevices
        .getUserMedia({audio:true})
        .then((mediaStream) => {
         
          let mediaRecorder = new MediaRecorder(mediaStream);
          mediaRecorder.start();
          setAudioMediaRecorder(mediaRecorder);
          setAudioMediaStream(mediaStream)
          // let audio = document.getElementById("audio1");
          // if ("srcObject" in audio) {
          //   audio.srcObject = mediaStream;
          // } else {
          //   audio.src = URL.createObjectURL(mediaStream);
          // }

        })
        .catch((err) => {
          console.log(err)
          console.log("haha nahi chala lol");
        });
    }
  }

  function stopAudio() {
    if (audioMediaRecorder) {
      let audio = document.getElementById("audio1");

      let chunks = [];
      audioMediaRecorder.ondataavailable = (ev) => {
        chunks.push(ev.data);
        console.log(chunks);
      };
      audioMediaRecorder.onstop = (ev) => {
        let blob = new Blob(chunks, { type: "audio/mp3" });
        console.log(blob);
        let audioURL = window.URL.createObjectURL(blob);
       audio.src = audioURL

       //clearing mediastream to stop accessing mic
       let tracks = audioMediaStream.getTracks()
       console.log(tracks)
       tracks.forEach((track)=>{
        track.stop()
       })
      }
      audioMediaRecorder.stop()
      clearInterval(audioTimer.current)
      setHourTimer(0)
      setMinuteTimer(0)
      setSecondTimer(0)
      console.log(audioMediaRecorder.state)
 
    }
  }
  function submitAudio() {
    stopAudio()
    audioMediaRecorder.stop()
  }
  function setInputType(e){
    let val = e.target.value
    console.log(val)
    if(val == 'audio'){
      setAnswerFormat({text:false, video:false, audio:true})
    }
    else if(val == 'text'){
      setAnswerFormat({text:true, audio:false,video:false})
    }
    else if(val == 'video'){
      setAnswerFormat({video:true, audio:false, text:false})
    } 
  }

  return <div className="answer-wrapper" key={prop.index}>
          <h1 className="text-xl">Question {(prop.index+1)}</h1>
          <h1 className="text-xl my-2">{prop.val.question}</h1>
          
          <div className="choice-wrapper inline-block p-2 border-b-2 border-black border-t-2 ">
          <p>Choose answer format</p>
            <button onClick={(e)=>{setInputType(e)}} className="choice-btn rounded-md rounded-r-none" value='video'>
              Video
            </button>
            <button onClick={(e)=>{setInputType(e)}} className="choice-btn" value='audio'>Audio</button>
            <button onClick={(e)=>{setInputType(e)}} className="choice-btn rounded-md rounded-l-none" value='text'>
              Text
            </button>
          </div>
          <div style={answerFormat.video ? {display:'block'}: {display:'none'}} className="video-div answer-div text-center my-3">
            <button
              onClick={() => {
                startRecorder();
              }}
            >
              Record your answer
            </button>
            <video
              style={{ display: camVisibility ? "Block" : "none" }}
              className="block mx-auto"
              width="600"
              height="550"
              controls
              autoPlay
              id={streamVideo}
            ></video>
            <video
              style={{ display: !camVisibility ? "Block" : "none" }}
              className="block mx-auto"
              width="600"
              height="550"
              controls
              autoPlay
              id={idString}
            ></video>
            <button
              onClick={() => {
                startRecorder();
              }}
            >
              Record again
            </button>
            <button
              onClick={() => {
                stopRecorder();
              }}
            >
              Submit Response
            </button>
            <button>Next</button>
          </div>
          <div style={answerFormat.audio ? {display:'block'}: {display:'none'}} className="audio-div answer-divtext-center my-3">
            <h2 className="text-xl">Audio</h2>
            <button onClick={recordAudio}>Click here to start recording</button>
            <div className="text-center">
              <p>
                <Mic></Mic>
                <h1>
                  {hourTimer <= 9 ? <>0{hourTimer}</> : <>{hourTimer}</>}:
                  {minuteTimer <= 9 ? <>0{minuteTimer}</> : <>{minuteTimer}</>}:
                  {secondTimer <= 9 ? <>0{secondTimer}</> : <>{secondTimer}</>}
                </h1>
              </p>
              <audio
                className="mx-auto my-1"
                id="audio1"
                controls
              ></audio>
            </div>
            <button onClick={stopAudio}>Submit response</button>
          </div>
          <div style={answerFormat.text ? {display:'block'}: {display:'none'}} className="text-div answer-div text-center my-3">
          <textarea className="h-40 w-96 border-gray-300 border-2 resize-none p-2 block mx-auto my-4 text-black" placeholder="Enter answer here"></textarea>
          <button onClick={stopAudio}>Submit response</button>
          </div>
        </div>

}

export default AnswerBox