import React from 'react'

export default function AboutDet() {
  return (
    <div className="mx-7 px-8 mb-10 py-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-5xl font-bold text-blue-600 mb-2">About Website</h1>
      <h2 className="text-3xl font-semibold mb-4">
        This website was created as a project during Hackfest 2k22 organized by
        IIT(ISM) Dhanbad.
      </h2>
      <b className="text-5xl text-blue-600">Our Motto</b>
      <p className="mt-2 text-2xl font-medium text-gray-800">
        To create a platform where citizens can upload the names of medicines
        they no longer need, allowing those medicines to be collected and
        re-distributed among those in need. Our application aims to reduce
        medical wastage across India by simplifying communication between
        citizens and NGOs. This will also decrease the demand for medicines,
        thereby reducing costs.
      </p>
    </div>
  );
}


