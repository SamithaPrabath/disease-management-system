import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { closePopUp } from "../redux/actions/popUpAction";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getSingleCaseData } from "../api/allCasesApi";

// Map container style
const containerStyle = {
  width: "100%",
  height: "400px", // Adjust height as needed
};

const ViewLocationPopup = ({ AllPopup, closePopUp }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState({
    address: "",
    coordinates: {
      lat: 6.9271, // Default to Colombo
      lng: 79.8612,
    },
  });

  // Load the Google Maps API
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    setIsOpen(AllPopup?.isOpen || false);
  }, [AllPopup]);

  const handlePopUpCLose = () => {
    closePopUp();
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        if (AllPopup?.cardId) {
          const response = await getSingleCaseData(AllPopup.cardId);
          setLocation({
            address: response?.data?.location_address,
            coordinates: {
              lat: response?.data?.location_details?.latitude,
              lng: response?.data?.location_details?.longitude,
            },
          });
        } else {
          setLocation({
            address: "",
            coordinates: {
              lat: 6.9271,
              lng: 79.8612,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchLocationData();
  }, [AllPopup?.cardId]);

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
              <p className="text-base text-[#080809] mb-4">
                Address: {location.address || "Colombo, Sri Lanka"}
              </p>
              {/* Google Map */}
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={location.coordinates}
                  zoom={13} // Adjust zoom level as needed
                >
                  {/* Add a marker for the location */}
                  <Marker position={location.coordinates} />
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
