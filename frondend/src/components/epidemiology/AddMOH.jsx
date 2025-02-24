import React from "react";

const AddMOH = ({handleBack}) => {


  return (
    <>
        <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Add MOH
          </h2>

          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-gray-700">Registration Number</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
            </div>

            {/* MOH */}
            <div>
              <label className="block text-gray-700">MOH</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
            </div>

            {/* Area */}
            <div>
              <label className="block text-gray-700">Area</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
            </div>

            {/* Two-column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Email Address */}
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                />
              </div>
            </div>

            {/* Two-column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
                onClick={() => handleBack()}
              >
                Back
              </button>
            </div>
          </form>
        </div>
    </>
  );
};

export default AddMOH;
