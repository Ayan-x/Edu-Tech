import React from "react";
import { Routes , Route} from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import NavBar from "./components/common/NavBar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col
    font-inter">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="signup" element={<SignUp/>}></Route>
        <Route path="login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
