import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const allCasesResponse = [
    {
      caseId: "0001",
      name: "John Doe",
      hospital: "General Hospital, Maharashtra",
      age: 35,
      sex: "M",
      disease: "Dengue",
      dateOfOnset: "01/14/2025",
      status: "Suspected",
    },
    {
      caseId: "0002",
      name: "Jane Smith",
      hospital: "City Hospital, Maharashtra",
      age: 28,
      sex: "F",
      disease: "Dengue",
      dateOfOnset: "01/15/2025",
      status: "Confirmed",
    },
    {
      caseId: "0003",
      name: "Robert Johnson",
      hospital: "District Hospital, Maharashtra",
      age: 45,
      sex: "M",
      disease: "Dengue",
      dateOfOnset: "01/13/2025",
      status: "Suspected",
    },
  ];

  export const getAllCases = async () => {
    try {
      if(IS_BACKEND){
        return allCasesResponse;
      }else{
        const response = await axios.get(`${BASE_URL}/getAllCases`); // Replace with your API endpoint
        return response.data; // Return the data received from the API
      }
    } catch (error) {
      console.error("Error fetching Institutes data:", error);
      throw error; // Throw the error if the request fails
    }
  };