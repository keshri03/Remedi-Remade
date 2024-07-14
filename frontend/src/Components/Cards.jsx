import React from 'react'
import linkdinlogo from "../Images/linkdin.png"

function Cards({ imgUrl, name, linkdin, company }) {
  return (
    <li className="flex items-center p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        className="h-20 w-20  rounded-full border-indigo-500"
        src={imgUrl}
        alt={`${name}'s profile`}
      />
      <div className="ml-6 mr-16 flex-1">
        <h3 className="text-3xl  mr-16 font-semibold text-gray-900 truncate">{name}</h3>
        <p className="text-2xl mt-1 font-medium text-indigo-600 truncate">
          {company}
          <a
            href={linkdin}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2"
          >
            <img src={linkdinlogo} alt="LinkedIn" className="h-6 w-6 inline" />
          </a>
        </p>
      </div>
    </li>
  );
}



export default Cards