import axios from "axios";
import { reportResponse } from "./reportApi";
import { testResponse } from "./loginApi";
import { doctorResponse } from "./doctorApi";
import {phiResponse} from "./phiApi"
import {mohResponse} from "./mohApi"

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

const allCasesResponse = [
  {
    caseId: "C001",
    patientName: "John Doe",
    age: "45",
    sex: "Male",
    guardian: "",
    diseaseName: "Tuberculosis (TB)",
    caseStatus: "Suspected",
    natureOfConfirmation: "",
    remarks: "",
    confirmedBy: "",
    confirmedDate: "",
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
    notifier: "D001",
    notifiedDate: "2024-02-02",
  },
  {
    caseId: "C002", 
    patientName: "John Doe",
    age: "5",
    sex: "Male",
    guardian: "Doe Doe",
    diseaseName: "Dengue Fever",
    caseStatus: "Confirmed",
    confirmedDate: "2023-11-12",
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
    notifier: "D001",
    notifiedDate: "2024-02-03",
  },
  {
    caseId: "C003",
    patientName: "John Doe",
    age: "45",
    sex: "Male",
    guardian: "",
    diseaseName: "Dengue Fever",
    caseStatus: "Suspected",
    confirmedDate: "",
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
    notifier: "D002",
    notifiedDate: "2024-02-02",
  },
];

export const getAllCases = async () => {
  try {
    if (IS_BACKEND) {
      return allCasesResponse;
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
     
      const newCaseId = "C" + (allCasesResponse.length + 1).toString().padStart(3, "0");
      const caseToAdd = { ...newCase, caseId: newCaseId };
      allCasesResponse.push(caseToAdd); 
      return { message: "Case added successfully", case: caseToAdd };
    } else {
      const response = await axios.post(`${BASE_URL}/addCase`, newCase); 
      return response.data; 
    }
  } catch (error) {
    console.error("Error adding new case:", error);
    throw error; 
  }
};

export const confirmCase = async (confirmData) => {
  try {
    if (IS_BACKEND) {
     
      const caseIndex = allCasesResponse.findIndex(
        (data) => data.caseId === confirmData.caseId
      );

      if (caseIndex !== -1) {
 
        allCasesResponse[caseIndex] = {
          ...allCasesResponse[caseIndex],
          natureOfConfirmation: confirmData.natureOfConfirmation,
          confirmationRemarks: confirmData.confirmationRemarks,
          confirmedBy: confirmData.confirmedBy,
          caseStatus: "Confirmed", 
        };

        return {
          message: "Case confirmed successfully",
        };
      } else {
        throw new Error("Case not found");
      }
    } else {
     
      const response = await axios.put(`${BASE_URL}/confirmCase`, confirmData);
      return response.data; 
    }
  } catch (error) {
    console.error("Error confirming case:", error);
    throw error; 
  }
};

export const getSingleCaseData = async (caseId) => {
  try {
    if (IS_BACKEND) {
      // Find the case by caseId
      const caseData = allCasesResponse.find((caseItem) => caseItem.caseId === caseId);

      if (!caseData) {
        return { status: 404, message: "Case not found" };
      }

      const report = reportResponse.find((report) => report.caseId === caseId) || null;

      const notifierResponse = doctorResponse.find((doctor) => doctor.doctorId == caseData.notifier)
      if (!notifierResponse) {
        return { status: 404, message: "Notifier details not found" };
      }

      // Initialize variables for confirmedBy details and report
      let confirmByResponse = null;

      // Check if the case is confirmed
      if (caseData.caseStatus === "Confirmed" && caseData.confirmedBy) {
        // Find the user who confirmed the case
        const confirmByUser = testResponse.find((user) => user.userTypeId === caseData.confirmedBy);

        if (confirmByUser) {
          // Find the details of the user who confirmed the case based on their role
          switch (confirmByUser.role) {
            case "doctor":
              confirmByResponse = doctorResponse.find((doctor) => doctor.doctorId === confirmByUser.userTypeId);
              break;
            case "phi":
              confirmByResponse = phiResponse.find((phi) => phi.phiId === confirmByUser.userTypeId);
              break;
            case "moh":
              confirmByResponse = mohResponse.find((moh) => moh.mohId === confirmByUser.userTypeId);
              break;
            default:
              return { status: 404, message: "Invalid user role" };
          }

          if (!confirmByResponse) {
            return { status: 404, message: "User details not found" };
          }
        } else {
          return { status: 404, message: "User who confirmed the case not found" };
        }
      }

      // Combine case data, confirmed by user details (if available), and report
      const singleCaseResponse = {
        ...caseData,
        confirmedByDetails: confirmByResponse, // Will be null if not confirmed
        report: report, // Will be null if no report is found
        notifierDetails: notifierResponse,
      };

      return { status: 200, message: "Case data retrieved successfully", data: singleCaseResponse };
    } else {
      // API call to fetch single case data
      const response = await axios.get(`${BASE_URL}/getSingleCaseData/${caseId}`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching case data:", error);
    return { status: 500, message: "An error occurred while fetching case data" };
  }
};