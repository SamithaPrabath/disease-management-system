import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useFormik } from "formik";
import { eventSchema } from "../../yupSchema/eventSchema";
import { getAllEvents, updateEvent } from "../../api/eventsApi";
import { message } from "antd";
import { connect } from "react-redux";
import { closeViewEditEvent } from "../../redux/actions/viewEditEventAction";

const EditEvent = ({ ViewEditEvent, closeViewEditEvent, AllLogins }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [image, setImage] = useState(null);
  const [eventData, setEventData] = useState(null); // Changed to null for single object
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(ViewEditEvent?.[0] || false); // Ensure boolean fallback
  }, [ViewEditEvent]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEvents(AllLogins.data.userId);
        const filteredData = response.data.find(
          (item) => item.id === ViewEditEvent?.[1]
        );
        setEventData(filteredData || {}); // Set single object or empty object
      } catch (error) {
        console.error("Failed to fetch event data:", error);
        messageApi.error("Failed to load event data");
      }
    };

    if (ViewEditEvent?.[1]) fetchData();
  }, [ViewEditEvent, messageApi]);

  const formik = useFormik({
    initialValues: {
      eventName: eventData?.eventName || "",
      startDate: eventData?.startDate || "",
      startTime: eventData?.startTime || "",
      location: eventData?.location || "",
      description: eventData?.description || "",
    },
    enableReinitialize: true, // Reinitialize when eventData changes
    validationSchema: eventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("id", eventData?.id || ""); // Ensure ID is included
        Object.entries(values).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });

        // Handle image: if new image is selected use it, otherwise keep existing image
        if (image) {
          formData.append("image", image);
        } else if (eventData?.image) {
          // If no new image but there's an existing image, send it as a string
          formData.append("image", eventData.image);
        }

        const response = await updateEvent(eventData?.id, formData);
        if (response.status === 200 && response.message) {
          messageApi.success(response.message);
          resetForm();
          setImage(null);
          setTimeout(() => closeViewEditEvent(), 1000); // Use Redux action to close
        } else {
          messageApi.error(response.message || "Event update failed");
        }
      } catch (error) {
        console.error("Error during event update:", error);
        messageApi.error(
          error.message || "An error occurred during event update"
        );
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
      {isOpen && eventData && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
          <div className="bg-white w-[400px] min-h-[500px] max-h-[95vh] overflow-y-auto rounded-[8px] shadow-sm flex flex-col">
            {/* Header Section */}
            <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
              <h1 className="w-full text-center text-[24px] font-medium text-[#080809]">
                Update Event
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition cursor-pointer"
                onClick={() => closeViewEditEvent()}
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
                <label className="block text-gray-700 font-medium mb-1">
                  Event Name<span className="text-red-500">*</span>
                </label>
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
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.eventName}
                  </p>
                )}
              </div>

              {/* Start Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Start Date<span className="text-red-500">*</span>
                  </label>
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
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Start Time<span className="text-red-500">*</span>
                  </label>
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
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.startTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Location<span className="text-red-500">*</span>
                </label>
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
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.location}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full min-h-[80px] px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  disabled={formik.isSubmitting}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.description}
                  </p>
                )}
              </div>

              {/* Update Photo */}
              <div>
                <label
                  htmlFor="file-upload"
                  className={`w-full h-[60px] px-4 py-2 bg-[#E2E5E9] rounded-md flex items-center justify-center text-[#65686C] font-medium transition ${
                    formik.isSubmitting
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-[#D1D5DB]"
                  }`}
                >
                  Update Photo
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handlePhotoChange}
                  className="hidden"
                  disabled={formik.isSubmitting}
                  accept="image/*"
                />
                {image ? (
                  <p className="text-sm text-gray-600 mt-1">{image.name}</p>
                ) : eventData?.image ? (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Current: </p>
                    <img
                      src={eventData.image}
                      alt="Current event image"
                      className="mt-2 max-h-[200px] w-auto rounded-md object-cover"
                    />
                  </div>
                ) : null}
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
                  {formik.isSubmitting ? "Updating..." : "Update Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  ViewEditEvent: state.viewEditEvent,
  AllLogins: state.allLogins,
});

const mapDispatchToProps = (dispatch) => ({
  closeViewEditEvent: () => dispatch(closeViewEditEvent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
