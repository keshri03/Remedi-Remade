import React, { useState ,useEffect} from "react";
import axios from "axios";
import "../Styles/Forms.css";
import { useNavigate } from "react-router-dom";
import Base from "../base"



export const Forms = ({id}) => {
  const [medNameAndStrength, setMedNameAndStrength] = useState("");
  const [quantityType, setQuantityType] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ndc, setNdc] = useState("");
  const [address, setAddress] = useState("");
  const [image, imageUpload ] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    const user_data = {
      medNameAndStrength,
      quantityType,
      availableQuantity,
      totalQuantity,
      totalPrice,
      totalWorth: Math.floor((availableQuantity * totalPrice) / totalQuantity),
      expiryDate,
      ndc,
      username: localStorage.getItem("username"),
      address,
      status: "listed",
      listDate: new Date().toDateString(),
    };

    console.log(user_data);
    try {
      const response = await axios.post(
        `http://localhost:4000/medicine`,
        user_data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("username", response.data.userDetails.username);
        setFormSubmitted(true); // Set form submission state to true
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      window.scrollTo(0, 0); // Scroll to the top
      navigate(`/user`); // Navigate to the user page
      setFormSubmitted(false); // Reset form submission state
    }
  }, [formSubmitted, navigate]);

  return (
    <div className="form-container" id="donate">
      <h1 className="text-white text-4xl text-center ">ENTER MEDICINE DETAILS</h1>
      <form  className="flex flex-row items-center m-auto">
        <div className="contleft ml-12">
        <div className="mb-3 ">
          <label htmlFor="medicineName" className="form-label">
            Medicine Name and Strength:
          </label>
          <input
            value={medNameAndStrength}
            type="text"
            className="form-control"
            id="medicineName"
            onChange={(e) => setMedNameAndStrength(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">
            Expiry Date :
          </label>
          <input
            value={expiryDate}
            type="date"
            className="form-control"
            id="expiryDate"
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Total Price :
          </label>
          <input
            value={totalPrice}
            type="number"
            className="form-control"
            id="price"
            onChange={(e) => setTotalPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address :
          </label>
          <input
            value={address}
            type="text"
            className="form-control"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        </div>
        <div className="contright">
        <div className="mb-3">
          <label htmlFor="ndc" className="form-label">
            National Drug Code :
          </label>
          <input
            value={ndc}
            type="text"
            className="form-control"
            id="ndc"
            onChange={(e) => setNdc(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="availableQuantity" className="form-label">
            Available Quantity :
          </label>
          <input
            value={availableQuantity}
            type="number"
            className="form-control"
            id="availableQuantity"
            onChange={(e) => setAvailableQuantity( e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalQuantity" className="form-label">
            Total Quantity :
          </label>
          <input
            value={totalQuantity}
            type="number"
            className="form-control"
            id="totalQuantity"
            onChange={(e) => setTotalQuantity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantityType" className="form-label">
            Medicine Type :
          </label>
          <input
            value={quantityType}
            className="form-control"
            list="datalistOptions"
            id="quantityType"
            placeholder="Type to search..."
            onChange={(e) => setQuantityType(e.target.value)}
          />
          <datalist id="datalistOptions">
            <option value="Pill" />
            <option value="Inhaler" />
            <option value="Injection" />
            <option value="Syrup" />
            <option value="Patches" />
            <option value="Tubes" />
            <option value="Other" />
          </datalist>
        </div>
        
        </div>
      </form>
      <button
          type="button"
          className="btn btn-primary  bg-white text-black"
          onClick={handleSubmit}
        >
          Submit
      </button>
     
      
      
    </div>
  );
};
