import { useContext, useState } from "react";
import Body from "./Components/Body";
import Header from "./Components/Header";
import Error from "./Components/Error";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "./output.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import InterviewPage from "./Components/InterviewPage";
import PreInterview from "./Components/PreInterview";
import Instructions from "./Components/Instructions";
import AnswerPage from "./Components/AnswerPage";
import { createContext } from "react";
export const AnswerContext = createContext({});
function App() {
  const [answerSet, setAnswerSet] = useState({});
  const AnswerContextProvider = ()=>{
    return <AnswerContext.Provider value={{answerSet, setAnswerSet}} ></AnswerContext.Provider>
  }
  return (
    <>
      <Header></Header>
      <AnswerContext.Provider value={{answerSet, setAnswerSet}} >
      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user">
          <Route path="upload" element={<Body />}></Route>
          <Route path="interview" element={<Body />}></Route>
        </Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/ *" element={<Error />}></Route>
        
        <Route path="/interview" >
            <Route path="" element={<PreInterview />} />
            <Route path="instructions" element={<Instructions />} />
            <Route path="main" element={<InterviewPage />} />
            <Route path="answers" element={<AnswerPage />} />
        </Route>
        </Routes>
        </AnswerContext.Provider>
        
        
     
    </>
  );
}

export default App;
