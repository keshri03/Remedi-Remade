import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import Base from "../base";

let goToViolation = () => {
  const violation = document.getElementById("donate");
  window.scrollTo({
    top: violation.offsetTop,
    behavior: "smooth",
  });
};
function UserInfo() {

  const [name, setname] = useState("")
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage

      if (!token) {
        navigate("/signin"); // Navigate to /signin if no token is found
        return; // Exit early
      }

      try {
        const result = await axios.get(`${Base()}/user/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        console.log(result.data.user);
        setname(result.data.user.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [])

  return (
    <>
      <div className="main-text text-center py-12 bg-gradient-to-r">
        <h1 className="text-6xl font-extrabold text-gray-800 leading-tight">
          <p className="mb-8">
            Welcome back,{" "}
            <span className="text-blue-500 font-bold">{name}</span>! We’re glad
            to have you here.
          </p>
          <p className="text-3xl">
            {" "}
            Your generous donation of medicines is making a profound difference
            in many lives!
          </p>

          <button
            className="btn btn-primary text-white bg-blue-500 hover:bg-blue-700 rounded-full py-2 px-6 text-xl transition-all duration-300 ease-in-out shadow-lg animate-bounce"
            onClick={goToViolation}
          >
            Donate Now
          </button>
        </h1>
      </div>
    </>
  );
}

export default UserInfo;
