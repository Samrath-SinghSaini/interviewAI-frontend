import { interviewQuestions } from "../interviewStuff";
import Mic from "@mui/icons-material/Mic";
import { useState, useEffect, useRef } from "react";

function AnswerPage() {
  let array = Array(5).fill(1);
  return (
    <>
      <h1>Your Answers:</h1>
      {array.map((value, index) => {
        return <AnswerBox key={index} />;
      })}
    </>
  );
}

function AnswerBox(prop) {
  const [answerFormat, setAnswerFormat] = useState({
    video: true,
    audio: false,
    text: false,
  });
  let streamVideo = "streamVideo" + prop.index;
  let idString = "videoRec" + prop.index;
  let audioString = "streamAudio" + prop.index;
  const [submitBtnTxt, setSubmitBtnTxt] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const initRender = useRef(false);
  let rand = true;
  //for video input
  // const answerObj = {
  //   question: null,
  //   answerType: null,
  //   answer: null,
  //   index: null,
  // };

  function toggleSubmitBtn() {
    !submitBtnTxt ? setSubmitBtnTxt(true) : setSubmitBtnTxt(false);
  }

  function setInputType(e) {
    let val = e.target.value;
    console.log(val);
    if (val == "audio") {
      setAnswerFormat({ text: false, video: false, audio: true });
    } else if (val == "text") {
      setAnswerFormat({ text: true, audio: false, video: false });
    } else if (val == "video") {
      setAnswerFormat({ video: true, audio: false, text: false });
    }
  }

  function doSomething() {
    console.log("i do somethings");
  }

  return (
    <div className="answer-wrapper text-center mx-auto my-5" key={prop.index}>
      {/* <h1 className="text-xl">Question {prop.index + 1}</h1>
      <h1 className="text-xl my-2">{prop.val.question}</h1> */}

      <div className="choice-wrapper inline-block p-2 border-b-2 border-black border-t-2">
        <button
        style={answerFormat.video ? { display: "inline-block" } : { display: "none" }}
          onClick={(e) => {
            setInputType(e);
          }}
          className="choice-btn rounded-md rounded-r-none"
          value="video"
        >
          Video
        </button>
        <button
          onClick={(e) => {
            setInputType(e);
          }}
          className="choice-btn"
          value="audio"
        >
          Audio
        </button>
        <button
          onClick={(e) => {
            setInputType(e);
          }}
          className="choice-btn rounded-md rounded-l-none"
          value="text"
        >
          Text
        </button>
      </div>
      <div
        style={answerFormat.video ? { display: "block" } : { display: "none" }}
        className="video-div answer-div text-center my-3"
      >
        
        <video
          style={{ display: rand ? "Block" : "none" }}
          className="block mx-auto"
          width="600"
          height="550"
          controls
          id={streamVideo}
        ></video>

      </div>
      <div
        style={answerFormat.audio ? { display: "block" } : { display: "none" }}
        className="audio-div answer-divtext-center my-3"
      >
        <h2 className="text-xl">Audio</h2>
        <div className="text-center">
          <audio className="mx-auto my-1" id={audioString} controls></audio>
        </div>
       
      </div>
      {/*  
              text input 
          */}
      <div
        style={answerFormat.text ? { display: "block" } : { display: "none" }}
        className="text-div answer-div text-center my-3"
      >
        <textarea
          value={"yay"}
          onChange={(e) => {
            doSomething(e);
          }}
          className="h-40 w-96 border-gray-300 border-2 resize-none p-2 block mx-auto my-4 text-black"
          placeholder="Enter answer here"
        ></textarea>
        
      </div>
    </div>
  );
}

export default AnswerPage;
