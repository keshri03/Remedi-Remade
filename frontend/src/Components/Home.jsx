import React, {useEffect} from 'react'
import '../Styles/Home.css'
import doctor from "../Images/Doctor.png";
import {toast } from "react-toastify";
import logo from "../Images/bluel.png";
import { useNavigate } from "react-router-dom";




export const Home = ({id,name}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" mt-0" id="main-display">
        <div className="main-text">
          <h2 className="h-fit w-fit pt-0 flex items-center justify-center pr-12 pb-6 mb-auto">
            <img
              src={logo}
              alt="donatepic"
              id="logo"
              className="h-20 w-20 mr-2"
            />
            <b className="text-5xl font-bold text-blue-600">Re-Medi</b>
          </h2>
          <h1 className="text-6xl  font-bold animate-none">
            <p>
              {" "}
              Medicine Redistribution Made Simple For <span>Everyone</span>
            </p>
          </h1>
          <p className="text-2xl font-bold text-gray-700 mb-8">
            Lend a helping hand to those in need by donating unused medication
            or funds to support our work. Your donations stop waste and save
            lives.
          </p>

          <div className="mt-12 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              Why Donate?
            </h2>
            <p className="text-1xl text-gray-700 mb-8">
              Your donations not only prevent valuable medicines from going to
              waste but also provide essential support to those who can't afford
              them. Every contribution, no matter how small, makes a significant
              impact.
            </p>
          </div>

          <div className="mt-12 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">
              How It Works?
            </h2>
            <ul className=" list-inside text-1xl text-gray-700 space-y-4">
              <li>Gather your unused or surplus medications.</li>
              <li>
                Ensure they are within their expiration date and in original
                packaging.
              </li>
              <li>
                Your donated medications are sorted, checked, and redistributed
                to those in need by renowned NGOs.
              </li>
            </ul>
          </div>
          <button
            onClick={()=>navigate(`/signin`)}
            className="btn mt-10 pt-7 btn-primary text-white bg-blue-500 hover:bg-blue-700 rounded-full py-4 px-6 text-xl transition-all duration-300 ease-in-out shadow-lg animate-bounce"
          >
            Donate Now
          </button>
        </div>
        <img id="doctor" src={doctor} alt="Doctor.png" />
      </div>
    </>
  );
}
