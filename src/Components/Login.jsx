import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [showPass, setShowPass] = useState(false);
  const [inputVal, setInputVal] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [passInputType, setPassInputType] = useState("password");
  //   function LabelInput(prop) {
  //     return (

  //   }

  function setPassVisibility() {
    setShowPass(!showPass);
    if (passInputType == "password") {
      setPassInputType("text");
    } else if (passInputType == "text") {
      setPassInputType("password");
    }
  }

  function setInput(e) {
    let name = e.target.name;
    if (name == "email") {
      setInputVal({ ...inputVal, email: e.target.value });
    } else if (name == "password") {
      setInputVal({ ...inputVal, password: e.target.value });
    } else if (name == "userName") {
      setInputVal({ ...inputVal, userName: e.target.value });
    }
  }
  return (
    <div className="login-div text-center p-3 text-xl">
      <h1 className="text-4xl my-5">Login</h1>
      <div className="flex-wrapper flex flex-col lg:flex-row justify-around">
        <div>
          <h2>Sign in to your InterviewAI account</h2>
          <div className="block py-2 text-center lg:text-left">
            <label className="block py-2">Username</label>
            <input
              type="text"
              className="border-2 border-black p-2"
              placeholder=" Your Username"
              onChange={(e) => setInput(e)}
              value={inputVal.userName}
              name="userName"
            ></input>
          </div>
          <div className="block py-2 text-center lg:text-left">
            <label className="block py-2">Email</label>
            <input
              type="email"
              className="border-2 border-black p-2"
              placeholder=" Your Email"
              onChange={(e) => setInput(e)}
              value={inputVal.email}
              name="email"
            ></input>
          </div>
          <div className="block py-2 text-center lg:text-left">
            <label className="block py-2">Password</label>
            <div className="text-center lg:text-left sm:m-auto flex justify-center items-center w-1/3">
            <input
              type={passInputType}
              className="border-2 border-black p-2"
              placeholder=" Your Password"
              onChange={(e) => setInput(e)}
              value={inputVal.password}
              name="password"
            ></input>
            <i onClick={setPassVisibility} className="ml-2">
            {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
           
          </i>
          </div>
          </div>
          
          <button className="p-2 my-4 border-black border-2 text-center lg:text-left">
            Submit
          </button>
        </div>
        <div className="image-wrapper w-3/4 lg:w-1/2 mx-auto lg:mx-2.5 ">
          <img src="../assets/vec2.jpg" className="w-full h-auto"></img>
        </div>
      </div>
    </div>
  );
}

export default Login;
