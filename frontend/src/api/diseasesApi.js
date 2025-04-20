import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const diseasesResponse = [
    {
      id: "DS001",
      diseaseName: "Dengue Fever",
      category: "Viral Infection",
      modeOfTransmission: "Mosquito-borne (Aedes mosquitoes)",
      description: "Dengue fever is a viral illness transmitted by mosquitoes, causing high fever, severe headaches, joint pain, and skin rash. In severe cases, it can lead to hemorrhagic fever or shock syndrome.",
    },
    {
      id: "DS002",
      diseaseName: "Tuberculosis (TB)",
      category: "Bacterial Infection",
      modeOfTransmission: "Airborne (coughing, sneezing, or talking)",
      description: "Tuberculosis is a contagious bacterial infection that primarily affects the lungs. Symptoms include chronic cough, weight loss, fever, and night sweats. It is spread through airborne droplets when an infected person coughs or sneezes.",
    },
    {
      id: "DS003",
      diseaseName: "Hepatitis B",
      category: "Viral Infection",
      modeOfTransmission: "Blood, bodily fluids, unprotected sex, mother-to-child",
      description: "Hepatitis B is a liver infection caused by the Hepatitis B virus. It can lead to chronic liver disease, cirrhosis, and liver cancer. It spreads through contact with infected blood, sexual transmission, or from mother to child during childbirth.",
    },
  ];

export const addDiseases = async (disease) => {
  try {
    if (IS_BACKEND == "false") {
      
      const existingDisease = diseasesResponse.find((dis) => dis.diseaseName === disease.diseaseName || dis.id === disease.id);

      console.log(existingDisease)
      
      if (existingDisease) {

        return { status: 400, message: "Disease already exists" };
      } else {
        
        const newDisease = {
          ...disease,
          id: (diseasesResponse.length + 1).toString().padStart(3, "0"), 
        };
        diseasesResponse.push(newDisease);

        return { status: 200, message: "Disease registered successfully" };
      }
    } else {
      
      const response = await axios.post(`${BASE_URL}/api/diseases/create`, disease);
      if (response.status === 200) {
        return { status: 200, message: "Disease registered successfully" };
      } else {
        return { status: 400, message: "Failed to register disease" };
      }
    }
  } catch (error) {
    console.error("Error registering disease:", error);
    return error;
  }
};

export const getAllDiseasesData = async () => {
  try {
    if(IS_BACKEND == "false"){
      return { status: 200, message: "fetch data successfully", data: diseasesResponse }
    }else{
      const response = await axios.get(`${BASE_URL}/api/diseases/all`);
      if (response.status === 200) {
        const filteredDiseases = response.data.data.map(({ id, name, category, mod_of_transmission, description }) => ({
          id: id,
          diseaseName: name,
          category: category,
          modeOfTransmission: mod_of_transmission,
          description: description,
        }));
        return { status: 200, message: "fetch data successfully", data: filteredDiseases }
      }else{
        return { status: 400, message: "fetch data failed", data: [] }
      }
    }
  } catch (error) {
    console.error("Error fetching Diseases data:", error);
    throw error; // Throw the error if the request fails
  }
};

export const deleteDiseases = async (id) => {
  try {
    if (IS_BACKEND == "false") {
      // Simulating deletion from mock data
      const index = diseasesResponse.findIndex((diseases) => diseases.id === id);
      if (index !== -1) {
        diseasesResponse.splice(index, 1); // Remove the item from the array
        return { status: 200, message: "Disease record deleted successfully" };
      } else {
        return { status: 404, message: "Disease record not found" };
      }
    } else {
      // API call to delete Disease record
      const response = await axios.delete(`${BASE_URL}/api/diseases/delete/${id}`);
      if (response.status === 200) {
        return { status: 200, message: "Disease record deleted successfully" };
      } else {
        return { status: 400, message: "Failed to delete disease record" };
      }
    }
  } catch (error) {
    console.error("Error deleting Disease record:", error);
    throw error; // Throw error for handling in UI
  }
};

export const updateDiseases = async (id, updatedData) => {
  try {
    if (IS_BACKEND == "false") {
      // Simulating update in mock data
      const index = diseasesResponse.findIndex((disease) => disease.id === id);
      if (index !== -1) {
        diseasesResponse[index] = { ...diseasesResponse[index], ...updatedData };
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 404, message: "Record not found" };
      }
    } else {
      // API call to update PHI record
      const response = await axios.put(`${BASE_URL}/api/diseases/update/${id}`, updatedData);
      if (response.status === 200) {
        return { status: 200, message: "Record updated successfully" };
      } else {
        return { status: 400, message: "Failed to update disease record" };
      }
    }
  } catch (error) {
    console.error("Error updating Disease record:", error);
    throw error; // Throw error for handling in UI
  }
};

export const geDiseasesList = async () => {
  try {
    if(IS_BACKEND == "false"){
      const filteredDiseases = diseasesResponse.map(({ diseaseId, diseaseName }) => ({
        diseaseId,
        diseaseName,
      }));
      return { status: 200, message: "Diseases list retrieved successfully", data: filteredDiseases };
    }else{
      const response = await axios.get(`${BASE_URL}/api/diseases/all`);
      if (response.status === 200) {
        const filteredDiseases = response.data.data.map(({ id, name, category, mod_of_transmission, description }) => ({
          diseaseId: id,
          diseaseName: name,
          category: category,
          modeOfTransmission: mod_of_transmission,
          description: description,
        }));
        return { status: 200, message: "Diseases list retrieved successfully", data: filteredDiseases }
      }else{
        return { status: 400, message: "Diseases list retrieval failed", data: [] }
      }
    }
  } catch (error) {
    console.error("Error fetching Diseases data:", error);
    throw error; // Throw the error if the request fails
  }
};