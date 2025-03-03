import React, {useState} from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import { eventSchema } from "../../yupSchema/eventSchema";
import { createEvent } from "../../api/eventsApi";
import { message } from "antd";


const AddEvent = ({ handleAddEvent }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [image, setImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      eventName: "",
      startDate: "",
      startTime: "",
      location: "",
      description: "",
    },
    validationSchema: eventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        if (image) {
          formData.append("image", image);
        }

        console.log("Form: ", formData)

        const response = await createEvent(formData);
        if (response.status === 201 && response.message) {
          messageApi.success(response.message);
          resetForm();
          setTimeout(() => handleAddEvent(), 1000);
        } else {
          messageApi.error(response.message || "Event creation failed");
        }
      } catch (error) {
        console.error("Error during event creation:", error);
        messageApi.error(error.message || "An error occurred during event creation");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      {contextHolder}
      <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
        <div className="bg-white w-[400px] min-h-[500px] rounded-[8px] shadow-sm flex flex-col">
          {/* Header Section */}
          <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
            <h1 className="w-full text-center text-[24px] font-medium text-[#080809]">
              Create Event
            </h1>
            <button
              className="p-2 text-gray-600 hover:text-black transition"
              onClick={() => handleAddEvent()}
              aria-label="Close"
            >
              <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] transition" />
            </button>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full p-4 flex flex-col gap-4"
          >
            {/* Event Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Event Name*</label>
              <input
                type="text"
                name="eventName"
                value={formik.values.eventName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={formik.isSubmitting}
              />
              {formik.touched.eventName && formik.errors.eventName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.eventName}</p>
              )}
            </div>

            {/* Start Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Start Date*</label>
                <input
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.startDate}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Start Time*</label>
                <input
                  type="time"
                  name="startTime"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.startTime && formik.errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.startTime}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Location*</label>
              <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={formik.isSubmitting}
              />
              {formik.touched.location && formik.errors.location && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full min-h-[80px] px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                disabled={formik.isSubmitting}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
              )}
            </div>

            {/* Add Photo */}
            <div>
              <label
                htmlFor="file-upload"
                className={`w-full h-[60px] px-4 py-2 bg-[#E2E5E9] rounded-md flex items-center justify-center text-[#65686C] font-medium transition ${
                  formik.isSubmitting
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-[#D1D5DB]"
                }`}
              >
                Add Photo
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handlePhotoChange}
                className="hidden"
                disabled={formik.isSubmitting}
                accept="image/*"
              />
               {image && <p className="text-sm text-gray-600">{image.name}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full px-6 py-2 rounded-md text-white font-medium transition ${
                  formik.isSubmitting || !formik.isValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEvent;