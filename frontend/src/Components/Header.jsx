import React, { useState, useEffect } from "react";

import axios from "axios";
import logo from "../Images/bluel.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // For React Router v6

export const Header = () => {
  const navigate = useNavigate();



const handleLogOut = async () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    navigate(`/signin`);
};
  return (
    <div className="relative w-full h-auto bg-blue-50">
      <div className="mx-auto flex items-center justify-between mb-12 px-4 py-4 sm:px-6 lg:px-10">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Link to="/home">
              <img src={logo} className="w-10 h-10" alt="logo" id="logo" />
            </Link>
          </span>
          <span className="font-bold text-blue-600">Re-Medi</span>
        </div>
        <div className="lg:block">
          <ul className="inline-flex text-3xl space-x-12 text-blue-600">
            <li>
              <Link to="/home" className="font-semibold hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="font-semibold hover:text-gray-900">
                About
              </Link>
            </li>
           
          </ul>
        </div>
        <div className="lg:block">
          <button
            type="button"
            onClick={handleLogOut}
            className="rounded-md bg-blue-600 px-3 py-2 font-semibold text-2xl text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
