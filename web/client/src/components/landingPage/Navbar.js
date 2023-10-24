import React from "react";
import logo from "../../assets/img/landingPage/ReliveLogo.png";

import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="lg:bg-white lg:w-screen lg:h-14 shadow-md lg:px-16 lg:py-3 flex justify-items-center items-center w-full ">
      <h1 className="font-plus font-bold text-sm lg:text-xl mt-2 mb-2">
        <Link to="/">Relive. Management System</Link>
      </h1>
      <ul className="flex ml-auto pr-5 lg:w-60 justify-between font-plus font-semibold w-84 ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <Link to="/contact">Contact us</Link>
        </li>
      </ul>

      <button className="bg-primary lg:py-2 lg:px-5 rounded-xl font-semibold font-plus text-white shadow-sm hover:bg-bgsecondary py-1 px-2 mr-2">
        {location.pathname === "/register" ? (
          <Link to="/">Login</Link>
        ) : (
          <Link to="/register">Register</Link>
        )}
      </button>
    </nav>
  );
}
