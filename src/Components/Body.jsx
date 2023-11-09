// import { useNavigate } from "react-router-dom"
import React from 'react'
function Body(){
    // let navigate = useNavigate()
return <div className="text-center mt-[50px] font-clash">
<div>
    <h1 className="text-[30px] font-bold">Prepare for your next interview with the help of AI</h1>
    <h2 className="text-xl font-bold">Start preparing for your interviews with the help of ChatGPT</h2>
    <button className="p-1.5 bg-blue-100 m-3" onClick={()=>{console.log('btn click')}}>Get started</button>
    </div>
    <div className="w-3/4 lg:w-1/2 h-96 align-center mx-auto">
    <img className="w-full h-auto"src="../assets/vec1-min.jpg"></img></div>
    
</div>
}
export default Body