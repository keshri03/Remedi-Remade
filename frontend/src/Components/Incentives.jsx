import React, { useEffect, useState } from "react";
import "../Styles/Incentives.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Incentives = () => {
  const [totalPriceDonated, setTotalPriceDonated] = useState([]);
  const [numDonations, setNumDonations] = useState([]);
  const [level, setLevel] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage

      if (!token) {
        navigate("/signin"); // Navigate to /signin if no token is found
        return; // Exit early
      }

      try {
        const result = await axios.get(`http://localhost:4000/user`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        console.log(result.data);
        setTotalPriceDonated(result.data.user.totalPriceDonated);
        setNumDonations(result.data.user.numDonations);
        setLevel(result.data.user.level);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="incentives mt-0">
        <h3 className="text-5xl text-blue-500 font-bold">Your Landmarks 🎉</h3>
        <div className="incentive-item">
          <div className="">
            <div className="flex flex-col bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-lg rounded-xl p-4 md:p-5 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-8xl font-extrabold text-gray-900 animate-pulse">
                {totalPriceDonated}
              </h3>
              <p className="mt-1 text-3xl text-center text-blue-600 font-semibold uppercase tracking-widest">
                Money Donated
              </p>
              <p className="mt-2 text-1xl text-gray-600 text-center">
                Total money donated by you in the process of donating your
                unused medicines.
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-lg rounded-xl p-4 md:p-5 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-8xl font-extrabold text-gray-900 animate-pulse">
                {numDonations}
              </h3>
              <p className="mt-1 text-3xl text-center text-green-600 font-semibold uppercase tracking-widest">
                Quantity Donated
              </p>
              <p className="mt-2 text-1xl text-gray-600 text-center">
                Total quantity of unused medicines donated by you.
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 shadow-lg rounded-xl p-4 md:p-5 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-8xl font-extrabold text-gray-900 animate-pulse">
                {level}
              </h3>
              <p className="mt-1 text-3xl text-center text-yellow-600 font-semibold uppercase tracking-widest">
                User Level
              </p>
              <p className="mt-2 text-1xl text-gray-600 text-center">
                Hurrah! You are a Level {`${level}` || "2"} hero. Contribute
                more to increase your level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
