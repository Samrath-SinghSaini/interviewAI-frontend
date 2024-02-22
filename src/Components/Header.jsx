import { Link, useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate()
  return (
    <div className="header-container p-3  box-border flex items-center bg-blue-200 justify-between">
      <h1 className="inline-block ml-2.5 text-xl">Interview AI</h1>
      <div className="box-border mr-2.5 ">
      <button className="p-1.5 text-white text-base bg-blue-600 mx-1.5 my-0.5 text-xl"  onClick={()=>{navigate('/')}}>Home</button>
      <button className="p-1.5 text-white text-base bg-blue-600 mx-1.5 my-0.5 text-xl" onClick={()=>{navigate('/login')}}>Login</button>
      <button className="p-1.5 text-white text-base bg-blue-600 mx-1.5 my-0.5 text-xl" onClick={()=>{navigate('/register')}}>Register</button>
      <button className="p-1.5 text-white text-base bg-blue-600 mx-1.5 my-0.5 text-xl" onClick={()=>{navigate('/home')}}>User</button>
      <button className="p-1.5 text-white text-base bg-blue-600 mx-1.5 my-0.5 text-xl" onClick={()=>{navigate('/interview/')}}>Interview</button>
      </div>
    </div>
  );
}

export default Header;
