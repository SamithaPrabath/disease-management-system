import axios from "axios";
import { reportResponse } from "./reportApi";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const allCasesResponse = [
  {
    caseId: "C001",
    patientId: "P001",
    patientName: "John Doe",
    age: "45",
    sex: "Male",
    guardian: "",
    diseaseName: "Tuberculosis (TB)",
    caseStatus: "Suspected",
    natureOfConfirmation: "",
    remarks: "",
    confirmedBy: "",
    nicNo: "123456789V",
    phoneNumber: "0771234567",
    instituteName: "XYZ Medical College",
    dateOfOnset: "2023-09-15",
    dateOfAdmission: "2023-09-20",
    ward: "Ward 10",
    bhtNumber: "BHT12345",
    address: "123 Main Street, Colombo",
    labResult: "Positive for HbA1c",
    file: null,
  },
  {
    caseId: "C002", 
    patientId: "P002",
    patientName: "John Doe",
    age: "5",
    sex: "Male",
    guardian: "Doe Doe",
    diseaseName: "Dengue Fever",
    caseStatus: "Confirmed",
    natureOfConfirmation: "Clinical only", 
    remarks: "Lorem sperem lorem lorem",
    confirmedBy: "D001", 
    nicNo: "",
    phoneNumber: "0771234567",
    instituteName: "Global Business Academy",
    dateOfOnset: "2023-09-15",
    dateOfAdmission: "2023-09-20",
    ward: "Ward 10",
    bhtNumber: "BHT12345",
    address: "123 Main Street, Colombo",
    labResult: "Positive for HbA1c",
    file: null,
  },
  {
    caseId: "C003",
    patientId: "P001",
    patientName: "John Doe",
    age: "45",
    sex: "Male",
    guardian: "",
    diseaseName: "Dengue Fever",
    caseStatus: "Suspected",
    natureOfConfirmation: "",
    remarks: "", 
    confirmedBy: "",
    nicNo: "123456789V",
    phoneNumber: "0771234567",
    instituteName: "Sunrise International School",
    dateOfOnset: "2023-09-15",
    dateOfAdmission: "2023-09-20",
    ward: "ICU",
    bhtNumber: "BHT12345",
    address: "123 Main Street, Colombo",
    labResult: "Positive for HbA1c",
    file: null,
  },
];

export const getAllCases = async () => {
  try {
    if (IS_BACKEND) {
      return allCasesResponse.map((caseItem) => {
        const matchingReport = reportResponse.find(
          (report) => report.id === caseItem.caseId // Use caseId for matching
        );
        return {
          ...caseItem,
          report: matchingReport ? matchingReport : {},
        };
      });
    } else {
      const response = await axios.get(`${BASE_URL}/getAllCases`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching cases:", error);
    return [];
  }
};

export const addNewCase = async (newCase) => {
  try {
    if (IS_BACKEND) {
      // Generate a new caseId
      const newCaseId = "C" + (allCasesResponse.length + 1).toString().padStart(3, "0");
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