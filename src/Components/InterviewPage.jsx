import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { interviewQuestions } from "../interviewStuff";
import Mic from "@mui/icons-material/Mic";
import AnswerBox from "./AnswerBox";
import { AnswerContext } from "../App";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
//reminder to start adding comments to your code
//I am opening this file after two months and have no idea what any of this means
//Update: Commenting does not help I opened this last week and I am just as confused as I was wo any comments
//Things to add to this file before I forget:
//Hide 'record again' btn
//make sure record again btn works
//will add more as I think of them
function InterviewPage() {
  const serverBaseURL = "http://localhost:3000";
  const [questionArr, setQuestionArr] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState();
  const [audioMediaRecorder, setAudioMediaRecorder] = useState();
  const [camVisibility, setCamVisibility] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recorderStarted, setRecorderStarted] = useState(false);
  const audioTimer = useRef();
  const [secondTimer, setSecondTimer] = useState(0);
  const [minuteTimer, setMinuteTimer] = useState(0);
  const [hourTimer, setHourTimer] = useState(0);
  const [answerFormat, setAnswerFormat] = useState({
    video: true,
    audio: false,
    text: false,
  });
  const answerObj = {
    question: null,
    answerType: null,
    answer: null,
    index: null,
  };
  const [answerArr, setAnswerArr] = useState([]);
  const [answerAgain, setAnswerAgain] = useState(false);
  let navigate = useNavigate();
  let { answerSet, setAnswerSet } = useContext(AnswerContext);
  //let {answerBox, setAnswerBox} = useContext(AnswerContext)
  useEffect(() => {
    console.log(answerSet);
    // console.log(answerBox)
    //what does this useEffect do? why is this here?
    //oh I guess it gets interview questions that I commented out because I didn't wanna make too many api calls, makes sense
    // getInterviewQuestions()
    // .then((response)=>{
    //     console.log(response)
    //     setQuestionArr(response)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
  }, []);
  // useEffect(() => {
  //   if (recorderStarted) {
  //     let interval = setTimeout(() => {
  //       if (mediaRecorder.state !== "inactive") {
  //         console.log("time out over");
  //         stopRecorder();
  //       }
  //     }, 10000);
  //   }
  // }, [recorderStarted, recording]);

  //to fetch interview questions from chatgpt
  async function getInterviewQuestions() {
    let tempArr = [];

    try {
      let apiResponse = await axios.get(serverBaseURL + "/api/v1/interview", {
        headers: { "Content-Type": "Application/json" },
      });
      let data = JSON.parse(apiResponse.data.questions);
      let questions = data.interviewQuestions;
      console.log(questions);
      return questions;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  function answerSubmission(newData) {
    /*data format:  {
      index: prop.index,
      question: prop.val.question,
      answer: finalAnswer,
    };
    answer is object with {data:data, format:answerformat}*/
    // console.log(newData)
    setAnswerArr((prev) => {
      return [...prev, newData];
    });
  }

  function submitInterview() {
    console.log(answerArr);
    setAnswerSet(answerArr);
    setTimeout(() => {
      navigate("/interview/answers");
    }, 2000);
    axios
      .post(serverBaseURL + "/api/v1/interview/answers",answerArr, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="text-center m-5">
      {/* <div className="start-wrapper">
    <h1 className="text-xl">Based on the job description, your experience level, ChatGPT has generated these interview questions for you. You can skip questions if you want, jump back between questions. Once you submit your response, you will received feedback from ChatGPT about your performance. </h1>
    <h2 className="text-lg">Click the button below to get started.</h2>
    <button>Start interview</button>
    </div> */}
      <div className="main-wrapper">
        {interviewQuestions.map((value, index) => {
          return (
            <AnswerBox
              key={index}
              index={index}
              val={value}
              answerSubmission={answerSubmission}
            />
          );
        })}
        <div>
          <p>
            This is the end of your Interview. You can now submit the Interview
          </p>
          <button onClick={submitInterview}>Submit Interview</button>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;
