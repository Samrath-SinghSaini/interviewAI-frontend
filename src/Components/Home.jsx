import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
function Home() {
  const serverBaseURL = "http://localhost:3000";
  const [careerVal, setCareer] = useState("");
  const [errMessage, setErrorMessage] = useState("");
  const [chosenCareer, setChosenCareer] = useState("");
  const [showCareerSection, setCareerSection] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");
  const [jobTitleErrorMessage, setJobTitleErrorMessage] = useState("");
  const descriptionRef = useRef();
  const navigate = useNavigate()
  const careerFieldArray = [
    "Information Technology (IT)",
    "Healthcare",
    "Business and Finance",
    "Engineering",
    "Science and Research",
    "Education",
    "Arts and Entertainment",
    "Social Services",
    "Law and Legal Services",
    "Communication and Media",
    "Sales and Marketing",
    "Hospitality and Tourism",
    "Manufacturing and Production",
    "Agriculture and Environmental Sciences",
    "Government and Public Administration",
    "Human Resources",
    "Telecommunications",
    "Real Estate",
    "Retail",
    "Automotive",
  ];

  function updateChosenCareer(careerName) {
    setErrorMessage("");
    setChosenCareer(careerName);
    setCareerSection(true);
  }

  function setCareerVal(e) {
    let inputVal = e.target.value;
    if (
      inputVal !== "" ||
      typeof inputVal === "string" ||
      inputVal instanceof String
    ) {
      setCareer(inputVal);
    } else {
      setErrorMessage("There was an error with your input, please try again.");
      setCareer("");
    }
  }

  function getLoadTime(startTime) {
    //start timer when server request is made, if time exceeds ten seconds, output a message, if more than 20, change the message.
    descriptionRef.current = setTimeout(() => {
      let currentTime = Date.now();
      let timeElapsed = currentTime - startTime;
      console.log(timeElapsed);
      if (timeElapsed > 10) {
        setJobTitleErrorMessage(
          "Please wait while ChatGPT generates a job description to your needs."
        );
      } else if (timeElapsed > 20) {
        setJobTitleErrorMessage(
          "Thank you for your patience while ChatGPT generates a job description."
        );
      }
    }, 10);
  }
  function changeJobTitle(e) {
    setJobTitle(e.target.value);
  }

  function generateJobDescription() {
    if (jobTitle === "" || chosenCareer === "") {
      setJobTitleErrorMessage(
        "Please enter a job title before generating a description."
      );
      return;
    }
    setJobTitleErrorMessage("");
    // let currentTime = Date.now()
    // getLoadTime(currentTime)
    axios
      .get(serverBaseURL + "/api/v1/description", {params:{jobTitle:jobTitle, careerField:chosenCareer},
        headers: { "Content-Type": "Application/JSON" },
      })
      .then((response) => {
        console.log(response);
        setJobTitleErrorMessage("Please customize the generated job description to add your set of skills and experience level, if required.");
        setDescriptionVal(response.data.chat);
        console.log(response.data.chat);
      })
      .catch((err) => {
        console.log(err);
        setJobTitleErrorMessage("There was an error.");
      });
  }

  function submitDescription(){
    console.log('description val')
    console.log(descriptionVal)
    axios.post(serverBaseURL + "/api/v1/description", {description:descriptionVal, jobTitle:jobTitle},{headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
   }})
    .then((response)=>{
      console.log(response)
      setJobTitleErrorMessage('Your request has been submitted.')
      setTimeout(()=>navigate('/interview'), 2000)
    })
    .catch((err)=>{
      console.log(err)
      setJobTitleErrorMessage('There was an error with your request.')
    })
  }
  function onCareerBtnSubmit() {
    if (careerVal === "" || chosenCareer === "") {
      setErrorMessage("Please choose a valid job field or enter one.");
      return;
    } else if (careerVal !== "" || chosenCareer !== "") {
      setErrorMessage("");
      setChosenCareer(careerVal);
      setCareerSection(true);
    }
  }
  return (
    <div className="home-wrapper mt-9 py-5 flex flex-row w-full justify-center">
      <div className="career-input-div text-center mx-5 py-5 border-black border-2 border-solid w-2/5">
        <h1 className="text-2xl">Welcome User</h1>
        <h2 className="text-xl">Start by adding your career field</h2>
        <div>
          <input
            className="p-1 border-gray-800 border rounded-sm"
            type="text"
            placeholder=" Your Career Field"
            value={careerVal}
            onChange={(e) => {
              setCareerVal(e);
            }}
          ></input>
          <button
            className="p-1.5 text-white text-base bg-blue-600 mx-1.5 my-0.5 text-xl"
            onClick={onCareerBtnSubmit}
          >
            Submit
          </button>
          <p className="text-red-600">{errMessage}</p>
          <h2 className="text-xl">Or</h2>
          <h2 className="text-xl">Choose one of the following</h2>
          <div className="my-5 h-4/5 overflow-y-auto max-h-96">
            {careerFieldArray.map((element, index) => {
              return (
                <div
                  onClick={() => {
                    updateChosenCareer(element);
                  }}
                  key={index}
                  className="w-2/4 mx-auto bg-gray-400 hover:bg-gray-700 items-center my-1 py-2"
                >
                  <p className="mx-auto p-4">
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {element}
                    </a>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="user-input-div border-black border-2 border-solid w-2/5 mx-5 text-center py-5"
        style={{ display: showCareerSection ? "inline-block" : "none" }}
      >
        <h2>Your chosen career field is : {chosenCareer}</h2>
        <p>
          Add a title and a job description for the job you will be interviewing
          for
        </p>
        <div>
          <input
            type="text"
            placeholder=" Job Title"
            className="p-1 border-gray-800 border rounded-sm"
            onChange={(e) => {
              changeJobTitle(e);
            }}
            value={jobTitle}
          ></input>
        </div>
        <p>Generate a sample job description based on the job title.</p>
        <button onClick={generateJobDescription}>Generate</button>
        <p className="text-red-600">{jobTitleErrorMessage}</p>
        <textarea
          className="border-2 border-gray-900 border-solid p-2 m-2 w-[90%] box-border"
          cols="40"
          rows="10"
          placeholder=" Paste Job Description Here"
          value={descriptionVal}
          onChange={(e)=>{setDescriptionVal(e.target.value)}}
        ></textarea>
        <button onClick={submitDescription}>Submit</button>
      </div>
    </div>
  );
}

export default Home;
