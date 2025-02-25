import React from "react";

const AddDiseases = ({handleBack}) => {


  return (
    <>
        <div className="w-full min-h-[200px] bg-white flex flex-col p-[32px] gap-[24px]">
          <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
            Add Diseases
          </h2>

          <form className="space-y-4">
            {/* Disease Code */}
            <div>
              <label className="block text-gray-700">Disease Code</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
            </div>

            {/* Disease Name */}
            <div>
              <label className="block text-gray-700">Disease Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
            </div>


            {/* Two-column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
            <div>
              <label className="block text-gray-700">Category</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
            </div>

              {/* Mode of Transmission */}
              <div>
                <label className="block text-gray-700"> Mode of Transmission</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                />
              </div>
            </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  type="text"
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                />
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

export default AddDiseases;
