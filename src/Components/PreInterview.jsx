/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { interviewQuestions, interviewTips } from "../interviewStuff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function PreInterview() {
  const navigate = useNavigate()
  const [questionArr, setQuestionArr] = useState([]);
  const [captureErr, setCaptureErr] = useState("");
  const [availDevices, setAvailDevices] = useState({
    videoInput: [],
    audioInput: [],
    audioOutput: [],
  });
  const [mediaObj, setMediaObj] = useState();
  const [camOn, setCamOn] = useState(false);
  const [showDropDown, setShowDropDown] = useState(new Array(3).fill(false));
  let count = 0;

  useEffect(() => {
    setQuestionArr(interviewQuestions);

    getUserInput()

    // getInterviewQuestions()
    // .then((response)=>{
    //     console.log(response)
    //     setQuestionArr(response)
    // })
    // .catch((err)=>{
    //     console.log(err)

    // })
  }, []);

  function updateQuestions(arr) {
    setQuestionArr(arr);
  }

  function stopCam() {
    if (mediaObj != null) {
      let tracks = mediaObj.getTracks()
      tracks.forEach((element, _) => {console.log(element) 
      element.stop()
    });
      setCamOn(false);
      console.log('i ran') 
    
    }
  }
  function startInterview(){
    stopCam()
    navigate('/interview/main')
  }
  async function getUserInput() {
    let count = 0;
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      let devices = await navigator.mediaDevices.enumerateDevices();

      console.log("enumerate ran, ", count);
      console.log(devices);
      devices.forEach((value, index) => {
        if (value.kind === "audioinput") {
          console.log("audioInput");
          //console.log(value)
          setAvailDevices((prev) => {
            console.log("set avail ran");
            if (prev.audioInput.indexOf(value.label) === -1) {
              return { ...prev, audioInput: [...prev.audioInput, value.label] };
            }
          });
        } else if (value.kind === "audiooutput") {
          console.log("audioOutput");
          setAvailDevices((prev) => {
            return { ...prev, audioOutput: [...prev.audioOutput, value.label] };
          });
          //console.log(value)
        } else if (value.kind === "videoinput") {
          console.log("videoinput");
          setAvailDevices((prev) => {
            return { ...prev, videoInput: [...prev.videoInput, value.label] };
          });
          // console.log(value)
        }
      });
      console.log(availDevices);

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
        .then((userStreamObj) => {
          ///////
          setMediaObj(userStreamObj);

          let video = document.getElementById("userCam");
          if ("srcObject" in video) {
            video.srcObject = userStreamObj;
          } else {
            video.src = window.URL.createObjectURL(userStreamObj);
          }

          if (video.onloadedmetadata) {
            video.play();
          }
          setCamOn(true);
          // if(stopVid){
          //   console.log('stop vid is', stopVid)
          //   userStreamObj.getTracks()[0].stop()
          // }
        })
        .catch((err) => {
          console.log("could not capture user input.");
          console.log(err);
          setCaptureErr(
            "Please allow access to microphone and device camera and reload the page."
          );
        });
    } else {
      console.log("cannot access your video");
    }
  }

  function startVideo() {
    let video = document.getElementById("userCam");
    if ("srcObject" in video) {
      video.srcObject = mediaObj;
    } else {
      video.src = window.URL.createObjectURL(mediaObj);
    }

    if (video.onloadedmetadata) {
      video.play();
    }
    setCamOn(true);
  }

  function DropDownMenu(props) {
    const currentDevice = props.currentDevice;
    const list = props.list;
    console.log("from dropdown");
    console.log(list);
    return (
      <div className="inline-block h-full align-top relative mx-1 ">
        <div
          className="text-center bg-white absolute -top-[3 rem] right-0 left-0 -mb-1 bottom-11 w-[200px] break-words"
          style={{ display: props.showDropDown ? "inline-block" : "none" }}
        >
          {list ??
            list.map((value, index) => {
              console.log(value);
              return (
                <p key={index}>
                  <a>{index + 1 + value + "\n"}</a>
                </p>
              );
            })}
        </div>
        <button
          className="rounded-xl bg-slate-500 text-black"
          onClick={() => props.setShowDropDown(props.index)}
        >
          {currentDevice}
        </button>
      </div>
    );
  }
  function dropDownDisplay(currentIndex) {
    //map returns a new array with the results of any changes the call func made to the provided arr and does not change the og arr. from the map we need to return some value, in this case the element that was changed. so it returns an array with all the elements.
    setShowDropDown(() => {
      let tempArr = showDropDown;
      let returnArr = tempArr.map((element, index) => {
        if (index == currentIndex) {
          element = !element;
        } else {
          element = false;
        }
        return element;
      });
      return returnArr;
    });
  }
  return (
    <div className="interview-wrapper w-full py-5 px-5 text-lg">
      <h1 className="text-2xl pt-1 pb-3">
        Based on the provided job title and description, along with your
        experience level, ChatGPT has created a set of questions that will help
        you prepare for your interview.
      </h1>
      <div className="intruction-container flex w-full lg:flex-row flex-col-reverse">
        <div className="intructions-wrapper lg:w-1/2  w-full lg:border-r  border-black mx-1 lg:px-1 sm:max-lg:py-3">
          <h2 className="text-2xl inline-block">
            Please follow the below instructions to get the best interview
            experience and make any changes to your physical and camera settings
            if required.
          </h2>
          {interviewTips.map((element, index) => {
            return (
              <p key={index}>
                {index + 1}. {element}
              </p>
            );
          })}
        </div>
        <div className="cam-wrapper lg:w-1/2 w-full px-5 text-center lg:text-left">
          <h2 className="text-2xl">
            Please review your camera and mic settings
          </h2>
          <p>{captureErr}</p>
          <div className="video-wrapper">
            <video
              autoPlay
              width="500"
              id="userCam"
              className="py-4"
              src="undefined"
            ></video>
            <div
              className="bg-white"
              style={{ display: camOn ? "block" : "none" }}
            >
              {showDropDown.map((element, index) => {
                return;
              })}
              <DropDownMenu
                currentDevice="Video Input"
                list={availDevices.videoInput}
                showDropDown={showDropDown[0]}
                setShowDropDown={dropDownDisplay}
                index={0}
              />
              <DropDownMenu
                currentDevice="Audio Input"
                list={availDevices.audioInput}
                showDropDown={showDropDown[1]}
                setShowDropDown={dropDownDisplay}
                index={1}
              />
              <DropDownMenu
                currentDevice="Audio Output"
                list={availDevices.audioOutput}
                showDropDown={showDropDown[2]}
                setShowDropDown={dropDownDisplay}
                index={2}
              />
            </div>
          </div>
          <button className="align-top" onClick={startInterview}>Start Interview</button>
          <button onClick={stopCam}>Stop Cam</button>
        </div>
      </div>
    </div>
  );
}

export default PreInterview;
