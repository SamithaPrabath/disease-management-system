import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../../App.css"
import { getAllMarkers } from "../../api/mapApi";
import { message } from "antd";

// Map container style
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Colombo, Sri Lanka coordinates
const center = {
  lat: 6.9271, // Latitude of Colombo
  lng: 79.8612, // Longitude of Colombo
};

const Map = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [markers, setMarkers] = useState([]);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMarkers();
        setMarkers(response.data);

      } catch (error) {
        console.error("Failed to fetch data:", error);
        messageApi.error("Failed to load required data");
      }
    };

    fetchData();
  }, [messageApi]);

  return (
    <>
    {contextHolder}
    <div
      id="Map"
      className="w-full min-w-[870px] h-[500px] bg-white flex flex-col items-center justify-center px-[32px] py-[48px] gap-[32px]"
    >
      <div className="Header">
        <h2 className="text-[32px] font-medium text-[#080809] text-center">
          Real-Time Disease Tracker
        </h2>
        <p className="text-center">
          View confirmed infectious disease cases near you. Click on a location
          for more details.
        </p>
      </div>
      <form className="flex flex-row gap-[26px]">
        <select
          name="disease"
          id="disease"
          className="custom-select w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
        >
          <option value="disease">Disease</option>
        </select>

        <select
          name="date"
          id="date"
          className="custom-select w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
        >
          <option value="date">Date</option>
        </select>

        <select
          name="affectedArea"
          id="affectedArea"
          className="custom-select w-[186px] h-[40px] px-[16px] py-[8px] bg-[#E2E5E9] rounded-[8px]"
        >
          <option value="affectedArea">Affected area</option>
        </select>
      </form>

      {/* Google Map */}
      <div className="w-full h-[400px]">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13} // Adjust the zoom level as needed
          >
            {/* Add markers */}
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                label={marker.label}
              />
            ))}
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-full">
            Loading Map...
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Map;