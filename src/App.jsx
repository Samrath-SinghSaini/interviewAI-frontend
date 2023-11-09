import { useState } from "react";
import Body from "./Components/Body";
import Header from "./Components/Header";
import Error from "./Components/Error";
import Login from "./Components/Login";
import Register from "./Components/Register";
import './output.css'
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user">
          <Route path="upload" element={<Body />}></Route>
          <Route path="interview" element={<Body />}></Route>
        </Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </>
  );
}

export default App;
