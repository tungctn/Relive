import React from "react";
import Navbar from "../components/landingPage/Navbar";
import logo from "../assets/img/landingPage/ReliveLogo.png";
import Login from "../components/landingPage/Login";


export default function LandingPage(props) {
  return (
    <div className="h-screen max-h-min flex flex-col">
      <Navbar></Navbar>

      <div className="body lg:flex px-16 w-full lg:h-5/6 ">
        <img
          src={logo}
          alt="Graphics"
          className="lg:w-1/3 lg:my-auto lg:mx-auto mt-24"
        />
        <div className="lg:ml-auto lg:w-1/2 w-screen">
          <Login
            setToastShow={props.setToastShow}
            settoastCondition={props.settoastCondition}
          ></Login>
        </div>
      </div>
    </div>
  );
}
