import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const allCasesResponse = [
    {
      id: "001",
      caseId: "001",
      name: "John Doe",
      age: 35,
      sex: "Male",
      guardian: "Jane Doe", // Only applicable if age < 18
      disease: "Dengue",
      caseStatus: "Suspected",
      nicNo: "123456789V", // Only applicable if age >= 18
      telephone: "0771234567",
      institute: "General Hospital, Colombo",
      dateOfOnset: "2023-10-15",
      dateOfAdmission: "2023-10-16",
      ward: "Ward 10",
      bhtNumber: "BHT12345",
      address: "123 Main Street, Colombo",
      labResult: "Positive for Dengue IgM",
      file: null, // Placeholder for file upload
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

  export const addNewCase = async (newCase) => {
    try {
      if (IS_BACKEND) {
        // Generate a new caseId
        const newCaseId = (allCasesResponse.length + 1).toString().padStart(4, "0");
        const caseToAdd = { ...newCase, caseId: newCaseId };
        allCasesResponse.push(caseToAdd); // Add the new case to the mock data
        return { message: "Case added successfully", case: caseToAdd };
      } else {
        const response = await axios.post(`${BASE_URL}/addCase`, newCase); // Replace with your API endpoint
        return response.data; // Return the data received from the API
      }
    } catch (error) {
      console.error("Error adding new case:", error);
      throw error; // Throw the error if the request fails
    }
  };