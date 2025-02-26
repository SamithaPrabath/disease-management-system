import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import { eventSchema } from "../../yupSchema/eventSchema";
import { createEvent } from "../../api/eventsApi";
import { message } from "antd";

const AddEvent = ({ handleAddEvent }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      eventName: "",
      startDate: "",
      startTime: "",
      location: "",
      details: "",
      photo: null,
    },
    validationSchema: eventSchema,
    onSubmit: async (values) => {
      try {
        const response = await createEvent(values);
        if (response && response.message) {
          messageApi.success(response.message);
        } else {
          messageApi.error("Event creation failed");
        }
      } catch (error) {
        console.error("Error during event creation:", error);
        alert("An error occurred during event creation.");
      }
    },
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("photo", file);
  };

  return (
    <>
      {contextHolder}
      <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
        <div className="bg-white w-[400px] h-[500px] rounded-[8px] shadow-sm flex flex-col">
          {/* Header Section */}
          <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
            <h1 className="w-full text-center text-[24px] font-medium">
              Create Event
            </h1>
            <button
              className="p-2 text-gray-600 hover:text-black transition"
              onClick={() => handleAddEvent()}
            >
              <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition" />
            </button>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-2xl bg-white p-4 flex flex-col gap-3 rounded-[8px]"
          >
            {/* Event Name */}
            <div>
              <label className="block text-gray-700">Event Name*</label>
              <input
                type="text"
                name="eventName"
                value={formik.values.eventName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
              {formik.touched.eventName && formik.errors.eventName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.eventName}
                </p>
              )}
            </div>

            {/* Start Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Start Date*</label>
                <input
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Start Time*</label>
                <input
                  type="time"
                  name="startTime"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                />
                {formik.touched.startTime && formik.errors.startTime && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.startTime}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700">Location*</label>
              <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
              {formik.touched.location && formik.errors.location && (
                <p className="text-red-500 text-sm">{formik.errors.location}</p>
              )}
            </div>

            {/* Details */}
            <div>
              <label className="block text-gray-700">Details</label>
              <textarea
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full min-h-[40px] px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              />
              {formik.touched.details && formik.errors.details && (
                <p className="text-red-500 text-sm">{formik.errors.details}</p>
              )}
            </div>

            {/* Add Photo */}
            <div>
              <label
                htmlFor="file-upload"
                className="w-full h-[60px] px-4 py-2 bg-[#E2E5E9] rounded-md focus:outline-none cursor-pointer flex items-center justify-center text-[#65686C] hover:bg-[#d6d9dd] transition"
              >
                Add Photo
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handlePhotoChange}
                hidden
              />
              {formik.touched.photo && formik.errors.photo && (
                <p className="text-red-500 text-sm">{formik.errors.photo}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700
              cursor-pointer"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
