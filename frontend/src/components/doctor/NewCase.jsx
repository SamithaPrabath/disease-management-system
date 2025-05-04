import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { newCaseSchema } from "../../yupSchema/newCaseSchema";
import { FaPaperclip } from "react-icons/fa";
import { addNewCase } from "../../api/allCasesApi";
import { message } from "antd";
import { geDiseasesList } from "../../api/diseasesApi";
import { getInstitutesList } from "../../api/institutesApi";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeAddNewCase } from "../../redux/actions/viewAddNewCaseAction";
import { GoogleMap, Marker, useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

// Map container style
const containerStyle = {
  width: "100%",
  height: "400px",
};

const NewCase = ({ AllLogins, closeAddNewCase }) => {
// Define libraries array outside component to maintain reference
const libraries = ["places", "maps"];

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
    id: "google-map-script",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [diseasesList, setDiseasesList] = useState([]);
  const [institutesList, setInstitutesList] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  const [notifier, setNotifier] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 6.9271,
    lng: 79.8612,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const navigate = useNavigate();

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMapCenter(newLocation);
        setSelectedLocation(newLocation);
        formik.setFieldValue("latitude", newLocation.lat.toString());
        formik.setFieldValue("longitude", newLocation.lng.toString());
        formik.setFieldValue("locationAddress", place.formatted_address);

        // Store location details
        setLocationDetails({
          address: place.formatted_address,
          name: place.name,
          placeId: place.place_id,
          addressComponents: place.address_components,
        });
      }
    }
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          messageApi.warning(
            "Unable to get current location, using default location"
          );
        }
      );
    } else {
      messageApi.warning("Geolocation is not supported by this browser");
    }
  }, [messageApi]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diseases = await geDiseasesList();
        const institutes = await getInstitutesList();
        setDiseasesList(diseases.data);
        setInstitutesList(institutes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        messageApi.error("Failed to load required data");
      }
    };
    fetchData();
  }, [messageApi]);

  useEffect(() => {
    setUserTypeId(AllLogins.data.userTypeId);
    setNotifier(AllLogins.data.userTypeId);
  }, [AllLogins]);

  const formik = useFormik({
    initialValues: {
      patientName: "",
      age: "",
      sex: "",
      guardian: "",
      diseaseName: "",
      caseStatus: "",
      natureOfConfirmation: "",
      confirmedBy: "",
      nicNo: "",
      phoneNumber: "",
      instituteId: "",
      dateOfOnset: "",
      dateOfAdmission: "",
      ward: "",
      bhtNumber: "",
      address: "",
      labResult: "",
      files: [],
      latitude: "",
      longitude: "",
      locationAddress: "",
    },
    validationSchema: newCaseSchema,
    validate: (values) => {
      const errors = {};
      if (!values.caseStatus) {
        errors.caseStatus = "Case Status is required";
      }
      if (values.caseStatus === "Confirmed" && !values.natureOfConfirmation) {
        errors.natureOfConfirmation =
          "Nature of Confirmation is required for confirmed cases";
      }
      if (values.age && Number(values.age) < 18 && !values.guardian) {
        errors.guardian = "Guardian is required for patients under 18";
      }
      if (!selectedLocation || !selectedLocation.lat || !selectedLocation.lng) {
        errors.location = "Please select a location on the map";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      if (values.caseStatus === "Confirmed") {
        const currentDate = new Date().toISOString().split("T")[0];
        values.confirmedDate = currentDate;
      }
      if (AllLogins) {
        const currentDate = new Date().toISOString().split("T")[0];
        values.notifiedDate = currentDate;
      }

      // Handle files separately
      if (values.files && values.files.length > 0) {
        values.files.forEach((file, index) => {
          formData.append('files[]', file); // Change to files[] to indicate array
        });
      }

      // Handle other form fields
      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'files' && value) { // Skip files as we handled them above
          formData.append(key, value);
        }
      });

      if (remarks) formData.append("remarks", remarks);
      if (values.caseStatus === "Confirmed" && userTypeId) {
        formData.append("confirmedBy", userTypeId);
      }
      if (notifier) formData.append("notifier", notifier);

      console.log(formData);

      try {
        const response = await addNewCase(formData);
        if (response?.message) {
          messageApi.success(response.message);
          resetForm();
          setRemarks("");
          setSelectedLocation(null);
          setTimeout(() => closeAddNewCase(), 1000);
        } else {
          throw new Error("No response message");
        }
      } catch (error) {
        console.error("Error during case registration:", error);
        messageApi.error("Failed to register case. Please try again.");
      }
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue("files", [...formik.values.files, ...files]);
  };

  const removeFile = (indexToRemove) => {
    formik.setFieldValue(
      "files",
      formik.values.files.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleMapClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();
    
    // Create a Geocoder instance
    const geocoder = new window.google.maps.Geocoder();
    
    // Get address for clicked location
    geocoder.geocode(
      { location: { lat: clickedLat, lng: clickedLng } },
      (results, status) => {
        if (status === "OK" && results[0]) {
          setLocationDetails({
            address: results[0].formatted_address,
            name: results[0].name,
            placeId: results[0].place_id,
            addressComponents: results[0].address_components,
          });
          formik.setFieldValue("locationAddress", results[0].formatted_address);
        }
      }
    );

    setSelectedLocation({ lat: clickedLat, lng: clickedLng });
    formik.setFieldValue("latitude", clickedLat.toString());
    formik.setFieldValue("longitude", clickedLng.toString());
  };

  useEffect(() => {
    const age = Number(formik.values.age);
    if (age < 18) {
      formik.setFieldValue("nicNo", "");
    } else {
      formik.setFieldValue("guardian", "");
    }
  }, [formik.values.age]);

  // Add effect to handle case status changes
  useEffect(() => {
    if (formik.values.caseStatus !== "Confirmed") {
      formik.setFieldValue("natureOfConfirmation", "");
      setRemarks("");
    }
  }, [formik.values.caseStatus]);

  // Format date to YYYY-MM-DD for input fields
  const formatDateForInput = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <>
      {contextHolder}
      <div className="w-full min-h-[200.px] bg-white flex flex-col p-[32px] gap-[24px]">
        <h2 className="w-full text-[32px] font-medium text-[#080809] text-left">
          Notifiable Disease Notification Form
        </h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-row gap-3">
            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">
                Name of Patient<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="patientName"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.patientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.patientName && formik.errors.patientName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.patientName}
                </p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">
                Age<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min="0"
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-red-500 text-sm">{formik.errors.age}</p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">
                Sex<span className="text-red-500">*</span>
              </label>
              <select
                name="sex"
                className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.sex}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.touched.sex && formik.errors.sex && (
                <p className="text-red-500 text-sm">{formik.errors.sex}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">
                {Number(formik.values.age) < 18 ? "Guardian" : "Guardian"}
                <span className="text-red-500">
                  {Number(formik.values.age) < 18 ? "*" : ""}
                </span>
              </label>
              <input
                type="text"
                name="guardian"
                className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                  Number(formik.values.age) >= 18
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                value={formik.values.guardian}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={Number(formik.values.age) >= 18}
              />
              {formik.touched.guardian && formik.errors.guardian && (
                <p className="text-red-500 text-sm">{formik.errors.guardian}</p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">
                Disease<span className="text-red-500">*</span>
              </label>
              <select
                name="diseaseName"
                className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.diseaseName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Disease</option>
                {diseasesList.map((disease) => (
                  <option key={disease.id} value={disease.diseaseName}>
                    {disease.diseaseName}
                  </option>
                ))}
              </select>
              {formik.touched.diseaseName && formik.errors.diseaseName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.diseaseName}
                </p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">
                Case Status<span className="text-red-500">*</span>
              </label>
              <select
                name="caseStatus"
                className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.caseStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Status</option>
                <option value="Suspected">Suspected</option>
                <option value="Confirmed">Confirmed</option>
              </select>
              {formik.touched.caseStatus && formik.errors.caseStatus && (
                <p className="text-red-500 text-sm">
                  {formik.errors.caseStatus}
                </p>
              )}
            </div>
          </div>

          {formik.values.caseStatus === "Confirmed" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <label className="block text-gray-700">
                  Nature of Confirmation*
                </label>
                <div className="space-y-2">
                  {[
                    "Clinical only",
                    "Clinical and epidemiological",
                    "Clinical and bacteriological",
                    "Clinical and serological",
                    "Clinical, bacteriological and serological",
                    "Clinical and direct microscopy",
                  ].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={`nature-${option}`}
                        name="natureOfConfirmation"
                        value={option}
                        checked={formik.values.natureOfConfirmation === option}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <label
                        htmlFor={`nature-${option}`}
                        className="ml-2 text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                  {formik.touched.natureOfConfirmation &&
                    formik.errors.natureOfConfirmation && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.natureOfConfirmation}
                      </p>
                    )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="block text-gray-700">Remarks</label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex flex-row gap-3">
            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">
                NIC No
                <span className="text-red-500">
                  {Number(formik.values.age) >= 18 ? "*" : ""}
                </span>
              </label>
              <input
                type="text"
                name="nicNo"
                className={`w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none ${
                  Number(formik.values.age) < 18
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                value={formik.values.nicNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={Number(formik.values.age) < 18}
              />
              {formik.touched.nicNo && formik.errors.nicNo && (
                <p className="text-red-500 text-sm">{formik.errors.nicNo}</p>
              )}
            </div>

            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">
                Institute<span className="text-red-500">*</span>
              </label>
              <select
                name="instituteId"
                className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.instituteId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Institute</option>
                {institutesList.map((institute) => (
                  <option key={institute.id} value={institute.id}>
                    {institute.name}
                  </option>
                ))}
              </select>
              {formik.touched.instituteId && formik.errors.instituteId && (
                <p className="text-red-500 text-sm">
                  {formik.errors.instituteId}
                </p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">Date of Onset</label>
              <input
                type="date"
                name="dateOfOnset"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formatDateForInput(formik.values.dateOfOnset)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                max={formatDateForInput(new Date())}
              />
              {formik.touched.dateOfOnset && formik.errors.dateOfOnset && (
                <p className="text-red-500 text-sm">
                  {formik.errors.dateOfOnset}
                </p>
              )}
            </div>

            <div className="w-1/4 flex flex-col gap-3">
              <label className="block text-gray-700">
                Date of Admission<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfAdmission"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formatDateForInput(formik.values.dateOfAdmission)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                max={formatDateForInput(new Date())}
              />
              {formik.touched.dateOfAdmission &&
                formik.errors.dateOfAdmission && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.dateOfAdmission}
                  </p>
                )}
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">Ward</label>
              <input
                type="text"
                name="ward"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.ward}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ward && formik.errors.ward && (
                <p className="text-red-500 text-sm">{formik.errors.ward}</p>
              )}
            </div>

            <div className="w-1/2 flex flex-col gap-3">
              <label className="block text-gray-700">B.H.T Number</label>
              <input
                type="text"
                name="bhtNumber"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                value={formik.values.bhtNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bhtNumber && formik.errors.bhtNumber && (
                <p className="text-red-500 text-sm">
                  {formik.errors.bhtNumber}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="block text-gray-700">
              Address of the Patient<span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="block text-gray-700">
              Location<span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-4">
              {isLoaded ? (
                <>
                  <div className="mb-2">
                    <StandaloneSearchBox
                      onLoad={onLoad}
                      onPlacesChanged={onPlacesChanged}
                    >
                      <input
                        type="text"
                        placeholder="Search for a location..."
                        className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                      />
                    </StandaloneSearchBox>
                  </div>
                  <div className="w-full h-[400px] relative">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={mapCenter}
                      zoom={13}
                      onClick={handleMapClick}
                    >
                      {selectedLocation && (
                        <Marker position={selectedLocation} />
                      )}
                    </GoogleMap>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-md">
                  Loading Map...
                </div>
              )}
              {selectedLocation && locationDetails && (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                  <div className="space-y-2">
                    {locationDetails.name && locationDetails.name !== locationDetails.address && (
                      <div className="flex gap-2">
                        <span className="font-medium text-gray-700">Place:</span>
                        <span className="text-gray-600">{locationDetails.name}</span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700">Location Address:</span>
                      <span className="text-gray-600">{formik.values.locationAddress}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium text-gray-700">Coordinates:</span>
                      <span className="text-gray-600">{selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</span>
                    </div>
                  </div>
                </div>
              )}
              {formik.touched.latitude && formik.errors.location && (
                <p className="text-red-500 text-sm">{formik.errors.location}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="block text-gray-700">
              Laboratory Results (if available)
            </label>
            <textarea
              name="labResult"
              className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={formik.values.labResult}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
            />
            <div className="space-y-3">
              <label
                htmlFor="file-upload"
                className="w-fit flex items-center gap-2 px-4 py-2 bg-gray-200 text-black font-medium rounded-md hover:bg-gray-300 transition duration-200 cursor-pointer"
              >
                <FaPaperclip className="text-lg" />
                Attach Files
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.png"
                multiple
              />
              {formik.values.files.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">Attached Files:</p>
                  <div className="space-y-2">
                    {formik.values.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <span className="text-gray-600">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-start gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200 cursor-pointer"
              onClick={closeAddNewCase}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

const mapDispatchToProps = {
  closeAddNewCase: closeAddNewCase,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCase);
