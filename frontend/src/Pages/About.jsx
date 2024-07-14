import React from "react";
import Cards from "../Components/Cards";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import AboutDet from "../Components/AboutDet";

function Team() {
  return (
    <>
      <Header />
      <AboutDet />
      <div className="pt-12 pr-4 mt-14 text-center">
        <h2 className="text-5xl font-bold tracking-tight text-gray-900">
          OUR TEAM
        </h2>
        <p className="mt-6 text-6xl text-gray-600">WEB DEMONS 😈</p>
      </div>
      <div className="my-8 pl-5 flex items-center justify-center h-full">
        <ul
          role="list"
          className="grid max-w-8xl gap-12 px-10 lg:px-8    xl:grid-cols-3"
        >
          <Cards
            name={"AKASH MITTAL"}
            imgUrl={
              "https://media.licdn.com/dms/image/C4D03AQFjWambkAYGbg/profile-displayphoto-shrink_400_400/0/1663166754947?e=1726099200&v=beta&t=EOEh421Nj56qvaGrRWytND2EZ-AuY34h81uVehwNo6Y"
            }
            linkdin={"https://www.linkedin.com/in/akash-mittal-7458541b8/"}
            company={"Google"}
          />
          {/* Additional Card components here... */}
          <Cards
            name={"SHUBHAM SINGH"}
            imgUrl={
              "https://media.licdn.com/dms/image/C4D03AQGXvS_0BpMjTQ/profile-displayphoto-shrink_100_100/0/1656970067255?e=1726099200&v=beta&t=gsWwLTBsX2T-dyaRyQuq7ZaNp_TERu2g2KehxOHWBBU"
            }
            linkdin={"https://www.linkedin.com/in/shubham-singh-108892210//"}
            company={"Microsoft"}
          />
          <Cards
            name={"SYED AREEB AHMED"}
            imgUrl={
              "https://media.licdn.com/dms/image/C5603AQHTYkQ40Nvqbw/profile-displayphoto-shrink_400_400/0/1611387025802?e=1726099200&v=beta&t=YwStnTqHs2K2_EDfoVXkQkO3HDeXKCMrOGFTRiDkMAA"
            }
            linkdin={"https://www.linkedin.com/in/syed-areeb-ahmad/"}
            company={"Genesys"}
          />
          <Cards
            name={"BHIMESH AGARWAL"}
            imgUrl={
              "https://media.licdn.com/dms/image/D5603AQGydAprSye2yg/profile-displayphoto-shrink_100_100/0/1711515868472?e=1726099200&v=beta&t=6b5j2hmalbWkTCRJtMBHwi0ogZOgKwFTuvkRfXnk_iQ"
            }
            linkdin={"https://www.linkedin.com/in/bhimesh-agrawal/"}
            company={"Walmart"}
          />
          <Cards
            name={"SHUBHAM SINGHAL"}
            imgUrl={
              "https://media.licdn.com/dms/image/D5635AQHiBN0brO35xg/profile-framedphoto-shrink_400_400/0/1695401523314?e=1721494800&v=beta&t=mySEe2EVn2d8l2XcXDTghpGoNrcN6MBmMdFO3NwZdEE"
            }
            linkdin={"https://www.linkedin.com/in/sciencestoked/"}
            company={"Ugo,inc. Japan"}
          />
          <Cards
            name={"RAJA KESHRI"}
            imgUrl={
              "https://media.licdn.com/dms/image/D5603AQGqVe9WmamN5g/profile-displayphoto-shrink_400_400/0/1716200234568?e=1726099200&v=beta&t=LodlO08Kbyny6RwljAD1VIUYvqrx_ET7Euqy2aSDU9g"
            }
            linkdin={"https://www.linkedin.com/in/raja-keshri-218529200/"}
            company={""}
          />
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Team;
