import "../Styles/SignIn.css";
import React, { useState } from "react";
import axios from "axios";
import logo from "../Images/bluel.png";
import donatepic from "../Images/donatepic.jpg";
import { useNavigate } from "react-router-dom"; // For React Router v6
import Base from "../base"

function SignIn() {
  const [show, setShow] = useState("login");
  const changetoSignup = () => setShow("signup");
  const changetoLogin = () => setShow("login");
  const navigate = useNavigate(); // For React Router v6

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegisterSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name must not be empty");
      isValid = false;
    } else {
      setNameError(""); // Clear error if valid
    }

    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError(""); // Clear error if valid
    }

    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters");
      isValid = false;
    } else {
      setPasswordError(""); // Clear error if valid
    }

    if (!phone.trim()) {
      setPhoneError("Mobile number must not be empty");
      isValid = false;
    } else {
      setPhoneError(""); // Clear error if valid
    }

    if (isValid) {
      const user_data = {
        type: type,
        name: name,
        email: email,
        password: password,
        phone: phone,
      };

      const response = await axios.post(`${Base()}/register`, user_data);
      if (response.data.success) {
        const { token } = response.data;
        const userId = response.data.user._id; // Extract the user ID from the response
        localStorage.setItem("token", token); // Corrected to store the email
        localStorage.setItem("username", response.data.user.email);
        if (response.data.user.type === "user") {
          navigate(`/user`); // Redirect to user page with ID
        } else {
          navigate(`/ngo`); // Redirect to NGO page with ID
        }
      }
    }
  };


  const handleLoginSubmit = async () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      const user_data = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${Base()}/login`, user_data);
      // console.log(response);

      if (response.data.success) {
        // console.log(response.data);
        const userId = response.data.user._id;
        const { token } = response.data; // Extract the user ID from the response
        localStorage.setItem("token", token); // Corrected to store the email
        localStorage.setItem("username",response.data.user.email);
        if (response.data.user.type === "user") {
          navigate(`/user`); // Redirect to user page with ID
        } else {
          navigate(`/ngo`); // Redirect to NGO page with ID
        }
      }
    }
  };

  return (
    <>
      <div className="HeroContainer flex">
        <div className="flex w-full">
          {/* Left Section */}
          <div className="imageContainer"></div>

          {/* Right Section */}
          <div className="w-1/2 flex flex-col justify-center p-8">
            <h2 className="flex items-center justify-center pb-6 mb-auto">
              <img
                src={logo}
                alt="donatepic"
                id="logo"
                className="h-16 w-16 mr-2"
              />
              <b className="text-4xl font-bold text-blue-600">Re-Medi</b>
            </h2>

            {show === "login" ? (
              <form
                action=""
                className=" flex flex-col flex-auto bg-white border border-solid border-blue-100 shadow-md rounded-lg  mb-auto p-6"
              >
                <h2 className="text-5xl m-3 mb-4 font-bold text-blue-600 text-center">
                  LOG-IN
                </h2>
                <div className="mb-4 mt-2">
                  <label className="text-gray-600" htmlFor="floatingInput">
                    EMAIL ADDRESS
                  </label>
                  <input
                    value={email}
                    type="email"
                    className="form-control border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="text-gray-600" htmlFor="floatingPassword">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    className="form-control border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-200"
                  onClick={handleLoginSubmit}
                >
                  Login
                </button>
                <hr className="my-4" />
                <button
                  type="button"
                  onClick={changetoSignup}
                  className="w-full bg-gray-300 text-gray-800 rounded-lg py-2 hover:bg-gray-400 transition duration-200"
                >
                  Don't have an Account yet?
                </button>
              </form>
            ) : (
              <form className="bg-white flex flex-col flex-auto border border-solid border-blue-100 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
                  SIGN-UP
                </h2>
                <select
                  className="form-select border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Default select example"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>
                    Select User Type
                  </option>
                  <option value="user">User</option>
                  <option value="ngo">NGO</option>
                </select>

                <div className="mb-4">
                  <label className="text-gray-600" htmlFor="floatingInput">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="floatingInput"
                    placeholder="Name"
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm">{nameError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="text-gray-600" htmlFor="floatingInput">
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="text-gray-600" htmlFor="floatingPassword">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-600" htmlFor="floatingPhone">
                    Mobile No.
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
                    className="form-control border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="floatingPhone"
                    placeholder="Mobile No."
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm">{phoneError}</p>
                  )}
                </div>
                <button
                  onClick={handleRegisterSubmit}
                  type="button"
                  className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-200"
                >
                  Sign Up
                </button>
                <hr className="my-4" />
                <button
                  type="button"
                  onClick={changetoLogin}
                  className="w-full bg-gray-300 text-gray-800 rounded-lg py-2 hover:bg-gray-400 transition duration-200"
                >
                  Already have an Account?
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

