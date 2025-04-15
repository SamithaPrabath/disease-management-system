import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { closePopUp } from "../redux/actions/popUpAction";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Map container style
const containerStyle = {
  width: "100%",
  height: "400px", // Adjust height as needed
};

// Colombo, Sri Lanka coordinates
const center = {
  lat: 6.9271, // Latitude of Colombo
  lng: 79.8612, // Longitude of Colombo
};

const ViewLocationPopup = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  // Load the Google Maps API
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    setIsOpen(props.AllPopup);
  }, [props.AllPopup]);

  const handlePopUpCLose = () => {
    props.closePopUp();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
          <div className="bg-white w-[400px] min-h-[500px] rounded-[8px] shadow-sm flex flex-col">
            {/* Header Section */}
            <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
              <h1 className="w-full text-center text-[24px] font-medium">
                View Location
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={handlePopUpCLose}
              >
                <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition" />
              </button>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              <p className="text-base text-[#080809] mb-4">Address: Colombo, Sri Lanka</p>
              {/* Google Map */}
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={13} // Adjust zoom level as needed
                >
                  {/* Add a marker for Colombo */}
                  <Marker position={center} />
                </GoogleMap>
              ) : (
                <div className="flex items-center justify-center h-[400px] bg-gray-100">
                  Loading Map...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllPopup: state.allPopup,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closePopUp: () => dispatch(closePopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewLocationPopup);