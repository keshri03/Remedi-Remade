import React from 'react'
import '../Styles/Footer.css'
import logo from '../Images/bluel.png'
export const Footer = () => {
  return (
    <>
      <footer className=" ">
        <div className=" h-full w-full mt-2 bg-blue-50 footer-container flex justify-between items-center">
          <div className=" flex items-center">
            <img src={logo} alt="logo" className="h-10 w-10 mr-2" />
            <span className="text-4xl font-bold text-blue-600">
              Re-
              <span id="medi" className="text-blue-700">
                Medi
              </span>
            </span>
          </div>
          <div className="foot-right text-1xl text-centre">
            <span
              className="text-blue-600 hover:text-blue-700 cursor-pointer"
              id="privacy"
            >
              Privacy policy
            </span>
            <br />
            <span className="text-gray-600 text-md">
              Copyright &copy; 2024 Re-Medi. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
