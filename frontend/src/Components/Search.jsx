import React, { useState } from "react";
import axios from "axios";
import "../Styles/Search.css";
import { useNavigate } from "react-router-dom"; // For React Router v6
import Base from "../base";

export const Search = () => {
  const [typeSearch, setTypeSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [foundMeds, setFoundMeds] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [category, setCategory] = useState(""); // State for category selection
  const navigate = useNavigate();

  const handleSearch = async () => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    if (!token) {
      navigate("/signin");
      return; // Exit the function
    }

    setFoundMeds([]);

    try {
      const response = await axios.get(`${Base()}/getMedicine`, {
        params: { name: query, category: category }, // Include category in search
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log(response.data);

      setFoundMeds(response.data.foundMeds);
      setTypeSearch(false);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const handleSearchAll = async () => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    setFoundMeds([]);
    if (!token) {
      navigate("/signin");
      t;
      return; // Exit the function
    }

    try {
      const response = await axios.get(`${Base()}/allmedicines`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      setTypeSearch(true);
      setFoundMeds([]);
      setFoundMeds(response.data.medicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const handleCollect = async (medId) => {
    const user_data = { id: medId };
    const token = localStorage.getItem("token"); // Get the token from local storage

    if (!token) {
      navigate("/signin"); // Navigate to sign-in if token is not present
      return; // Exit the function
    }

    try {
      const response = await axios.post(
        `${Base()}/collect`,
        user_data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (typeSearch) await handleSearchAll();
      else await handleSearch();
    } catch (error) {
      console.error("Error collecting medicine:", error);
    }
  };

  return (
    <div className="search-container">
      <nav className="navbar bg-light flex justify-center" id="searchBar">
        <form className="form-inline flex items-center space-x-2">
          <input
            value={query}
            className="px-4 py-2 border border-blue-400 rounded-lg shadow-sm bg-white text-gray-700 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            type="text"
            placeholder="Type Medicine Name"
            aria-label="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-blue-400 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Select Category</option>
            <option value="Inhaler">Inhaler</option>
            <option value="Injection">Injection</option>
            <option value="Syrup">Syrup</option>
            <option value="Patches">Patches</option>
            <option value="Yubes">Tubes</option>
            <option value="Pill">Pill</option>
            <option value="Other">Other</option>
          </select>
          <button
            className="btn bg-blue-500 text-white btn-outline-primary my-2 my-sm-0"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="btn bg-red-400 text-white btn-outline-primary my-2 my-sm-0"
            type="button"
            onClick={handleSearchAll}
          >
            Search All
          </button>
          <label className="flex items-center ml-5">
            <span className="text-gray-800 font-medium text-2xl hover:text-blue-600 transition duration-200">
              Show Collected
            </span>
            <input
              type="checkbox"
              checked={showAll}
              onChange={() => setShowAll(!showAll)}
              className="form-checkbox h-5 w-5 ml-1 text-blue-600 transition duration-150 ease-in-out mr-0 rounded"
            />
          </label>
        </form>
      </nav>

      <div className="result">
        {foundMeds
          .filter((data) => showAll || data.status === "listed")
          .map((data) => (
            <div
              key={data._id}
              className={`max-w-sm rounded-lg overflow-hidden shadow-lg border border-blue-300 transition-shadow duration-300 transform hover:scale-105 ${
                data.status === "listed"
                  ? "bg-gradient-to-r from-red-200 to-red-400 opacity-80"
                  : "bg-gradient-to-r from-green-200 to-green-400 opacity-80"
              }`}
            >
              <div className="px-6 py-4">
                <h5 className="text-3xl font-bold mb-2 text-blue-800 hover:text-blue-600 transition-colors duration-200">
                  {data.medNameAndStrength}
                </h5>
                <h6 className="text-lg font-semibold text-gray-600 mb-2">
                  {data.address}
                </h6>
                <p className="text-gray-700 text-base">
                  <span className="font-semibold">NDC:</span> {data.ndc}
                  <br />
                  <span className="font-semibold">Expiration Date:</span>{" "}
                  {data.expiryDate.substring(0, 10)}
                  <br />
                </p>
                {data.status === "listed" ? (
                  <button
                    type="button"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-6 rounded-full mt-4 shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl active:scale-95 active:shadow-md"
                    onClick={() => handleCollect(data._id)}
                  >
                    Collect
                  </button>
                ) : (
                  <p className="text-gray-800 text-base mt-4">
                    <span className="font-semibold italic">
                      Collected from:
                    </span>{" "}
                    {data.username}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
