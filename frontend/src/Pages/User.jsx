import React, {useState,useEffect} from 'react'
import {Header} from "../Components/Header";
import {Incentives} from "../Components/Incentives";
import {Forms} from "../Components/Forms";
import {Home} from "../Components/Home";
import {Footer} from "../Components/Footer";
import UserInfo from '../Components/UserInfo';
import axios from "axios";

// const navigate = useNavigate();


export default function User() {
  return (
    <>
      <Header />
      <UserInfo/>
      <Incentives />
      <Forms />
      <Footer />
    </>
  );
}