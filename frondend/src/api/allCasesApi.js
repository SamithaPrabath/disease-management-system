import axios from "axios";
import { reportResponse } from "./reportApi";
import { doctorResponse } from "./doctorApi";
import { phiResponse } from "./phiApi";
import { mohResponse } from "./mohApi";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

export const allCasesResponse = [
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
    assignedPhi: "P001",
    phiAssignedDate: "2024-03-02",
    assignedMoh: "",
    mohAssignedDate: "",
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
    confirmedBy: "M001",
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
    assignedPhi: "",
    phiAssignedDate: "",
    assignedMoh: "",
    mohAssignedDate: "",
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
    assignedPhi: "",
    phiAssignedDate: "",
    assignedMoh: "",
    mohAssignedDate: "",
  },
  {
    caseId: "C004",
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
    assignedPhi: "",
    phiAssignedDate: "",
    assignedMoh: "",
    mohAssignedDate: "",
  },
];

export const getAllCases = async () => {
  try {
    if (IS_BACKEND) {
      // Safer version with proper null checks

      const response =  allCasesResponse.map((caseItem) => {
        const matchingReport = reportResponse.find(
          (report) => report.caseId === caseItem.caseId // Use caseId for matching
        );
        return {
          ...caseItem,
          report: matchingReport ? matchingReport : {},
        };
      });

      return { status: 200, message: "data fetch successfully", data: response };

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
      const newCaseId =
        "C" + (allCasesResponse.length + 1).toString().padStart(3, "0");
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
          confirmedDate: confirmData.confirmedDate,
          caseStatus: "Confirmed",
        };

        return {
          status: 200,
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
      const caseData = allCasesResponse.find(
        (caseItem) => caseItem.caseId === caseId
      );

      if (!caseData) {
        return { status: 404, message: "Case not found" };
      }

      //Report Response
      const report =
        reportResponse.find((report) => report.caseId === caseId) || null;

      //Notifier Response
      const notifierResponse = doctorResponse
        .filter((doctor) => doctor.id == caseData.notifier)
        .map(({ area, moh, name, role, registrationNumber }) => ({ name, role, area, moh, registrationNumber }));

      if (!notifierResponse) {
        return { status: 404, message: "Notifier details not found" };
      }

      //ConformationBy Response
      let confirmedByDetails = [];

      if (caseData.caseStatus === "Confirmed") {
        switch (caseData.confirmedBy.charAt(0)) {
          case "D":
            confirmedByDetails = doctorResponse.find(
              (doctor) => doctor.id === caseData.confirmedBy
            );
            break;
          case "P":
            confirmedByDetails = phiResponse.find(
              (phi) => phi.id === caseData.confirmedBy
            );
            break;
          case "M":
            confirmedByDetails = mohResponse.find(
              (moh) => moh.id === caseData.confirmedBy
            );
            break;
          default:
            confirmedByDetails = [];
            break;
        }
      }


      //Assigned PHI
      let assignedPhiDetails = [{}];

      if(caseData.assignedPhi != ""){
           assignedPhiDetails = phiResponse.filter((phi) => phi.id == caseData.assignedPhi)
      .map(({ area, moh, name, role, registrationNumber }) => ({ name, role, area, moh, registrationNumber }));
      }

      //Assigned MOH
      let assignedMohDetails = [{}];

      if(caseData.assignedMoh != ""){
           assignedMohDetails = mohResponse.filter((moh) => moh.id == caseData.assignedMoh)
      .map(({ area, name, role, registrationNumber }) => ({ name, role, area, registrationNumber }));
      }

      const singleCaseResponse = {
        ...caseData,
        confirmedByDetails: confirmedByDetails, // Will be null if not confirmed
        report: report, // Will be null if no report is found
        notifierDetails: notifierResponse[0],
        assignedPhiDetails: assignedPhiDetails[0],
        assignedMohDetails: assignedMohDetails[0],
      };

      return {
        status: 200,
        message: "Case data retrieved successfully",
        data: singleCaseResponse,
      };
    } else {
      // API call to fetch single case data
      const response = await axios.get(
        `${BASE_URL}/getSingleCaseData/${caseId}`
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching case data:", error);
    return {
      status: 500,
      message: "An error occurred while fetching case data",
    };
  }
};
