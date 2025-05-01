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
    caseStatus: "Confirmed",
    onfirmedDate: "2023-11-12",
    natureOfConfirmation: "Clinical only",
    remarks: "Lorem sperem lorem lorem",
    confirmedBy: "P001",
    nicNo: "123456789V",
    phoneNumber: "0771234567",
    instituteName: "XYZ Medical College",
    dateOfOnset: "2023-09-17",
    dateOfAdmission: "2023-09-20",
    ward: "Ward 10",
    bhtNumber: "BHT12345",
    address: "123 Main Street, Anuradhapura",
    lat: 8.2595695,
    lng: 80.33786769999999,
    labResult: "Positive for HbA1c",
    file: null,
    notifier: "D001",
    notifiedDate: "2024-02-02",
    assignedPhi: "P001",
    phiAssignedDate: "2024-03-02",
    assignedMoh: "M001",
    mohAssignedDate: "2024-03-02",
    sendReport: "true",
    markAsReceived: "true",
  },
  {
    caseId: "C002",
    patientName: "John Doe",
    age: "5",
    sex: "Male",
    guardian: "Doe Doe",
    diseaseName: "Hepatitis B",
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
    lat: 6.9271, 
    lng: 79.8612,
    labResult: "Positive for HbA1c",
    file: null,
    notifier: "D001",
    notifiedDate: "2024-02-03",
    assignedPhi: "P002",
    phiAssignedDate: "2024-05-30",
    assignedMoh: "",
    mohAssignedDate: "",
    sendReport: "",
    markAsReceived: "",
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
    lat: 6.9106, 
    lng: 79.8876,
    labResult: "Positive for HbA1c",
    file: null,
    notifier: "D002",
    notifiedDate: "2024-02-02",
    assignedPhi: "P001",
    phiAssignedDate: "2024-03-02",
    assignedMoh: "M001",
    mohAssignedDate: "2024-03-02",
    sendReport: "",
    markAsReceived: "",
  },
  {
    caseId: "C004",
    patientName: "John Doe",
    age: "45",
    sex: "Male",
    guardian: "",
    diseaseName: "Dengue Fever",
    caseStatus: "Confirmed",
    confirmedDate: "2023-11-12",
    natureOfConfirmation: "Clinical only",
    remarks: "Lorem sperem lorem lorem",
    confirmedBy: "M002",
    nicNo: "123456789V",
    phoneNumber: "0771234567",
    instituteName: "XYZ Medical College",
    dateOfOnset: "2023-09-15",
    dateOfAdmission: "2023-09-20",
    ward: "Ward 10",
    bhtNumber: "BHT12345",
    address: "123 Main Street, Colombo",
    lat: 6.8949, 
    lng: 79.853,
    labResult: "Positive for HbA1c",
    file: null,
    notifier: "D001",
    notifiedDate: "2024-02-02",
    assignedPhi: "",
    phiAssignedDate: "",
    assignedMoh: "",
    mohAssignedDate: "",
    sendReport: "",
    markAsReceived: "",
  },
];

export const getAllCases = async (userID) => {
  try {
    if (IS_BACKEND == "false") {
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
      const response = await axios.get(`${BASE_URL}/api/cases/all?userID=${userID}`);
      if (response.status === 200) {
        const filteredCases = response.data.data.map(({ id, patientName, age, sex, guardian, diseaseName, caseStatus, confirmedDate, natureOfConfirmation, remarks, confirmedBy, nicNo, phoneNumber, instituteName, dateOfOnset, dateOfAdmission, ward, bhtNumber, address, labResult, file, notifier, notifiedDate, assignedPhi, phiAssignedDate, assignedMoh, mohAssignedDate, sendReport, markAsReceived, report }) => ({
          id,
          caseId: id,
          patientName,
          age,
          sex,
          guardian,
          diseaseName,
          caseStatus,
          confirmedDate,
          natureOfConfirmation,
          remarks,
          confirmedBy,
          nicNo,
          phoneNumber,
          instituteName,
          dateOfOnset,
          dateOfAdmission,
          ward,
          bhtNumber,
          address,
          labResult,
          file,
          notifier,
          notifiedDate,
          assignedPhi,
          phiAssignedDate,
          assignedMoh,
          mohAssignedDate,
          sendReport,
          markAsReceived,
          report,
        }));
        
        return { status: 200, message: "data fetch successfully", data: filteredCases };
      }
      return { status: 400, message: "Failed to fetch data", data: [] };
    }
  } catch (error) {
    console.error("Error fetching cases:", error);
    return [];
  }
};

export const addNewCase = async (formData) => {
  try {
    if (IS_BACKEND == "false") {
      const newCaseId =
        "C" + (allCasesResponse.length + 1).toString().padStart(3, "0");
      const caseToAdd = { ...formData, caseId: newCaseId };
      allCasesResponse.push(caseToAdd);
      return { message: "Case added successfully", case: caseToAdd };
    } else {
      // Log the FormData contents for debugging
      console.log("Files being sent:");
      for (let pair of formData.getAll('files[]')) {
        console.log('File:', pair.name);
      }

      const response = await axios.post(`${BASE_URL}/api/cases/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        // Add timeout and max content length settings
        timeout: 30000, // 30 seconds
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      
      if (response.status === 200) {
        return { status: 200, message: "Case added successfully", data: response.data };
      }
      return { status: 400, message: "Failed to add case", data: [] };
    }
  } catch (error) {
    console.error("Error adding new case:", error);
    throw error;
  }
};

export const confirmCase = async (confirmData) => {
  try {
    if (IS_BACKEND == "false") {
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
      const response = await axios.put(`${BASE_URL}/api/cases/confirm/${confirmData.id}`, confirmData);
      if (response.status === 200) {
        return { status: 200, message: "Case confirmed successfully", data: response.data.data };
      }
      return { status: 400, message: "Failed to confirm case", data: [] };
    }
  } catch (error) {
    console.error("Error confirming case:", error);
    throw error;
  }
};

export const getSingleCaseData = async (caseId) => {
  try {
    if (IS_BACKEND == "false") {
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
        `${BASE_URL}/api/cases/${caseId}`
      );
      if (response.status === 200) {
        console.log(response.data);
        return { status: 200, message: "data fetch successfully", data: response.data.data };
      }
      return { status: 400, message: "Failed to fetch data", data: [] };
    }
  } catch (error) {
    console.error("Error fetching case data:", error);
    return {
      status: 500,
      message: "An error occurred while fetching case data",
    };
  }
};


const colorPalette = [
  "#FF5630",
  "#36B37E",
  "#FFAB00",
  "#9966FF",
  "#FF9F40",
  "#E7E9ED",
  "#76D7C4",
];

// Function to assign a color based on disease name (deterministic)
const getColorForDisease = (diseaseName, index) => {
  // Use a simple hash to ensure consistent colors for the same disease
  const hash = diseaseName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = hash % colorPalette.length;
  return colorPalette[colorIndex] || colorPalette[index % colorPalette.length]; // Fallback to index
};

export const getCasesCount = async () => {
  try {
    let activeCasesCount;

    if (IS_BACKEND == "false") {
      const activeCases = allCasesResponse.filter((caseItem) => caseItem.caseStatus === "Confirmed");

      const casesByDisease = activeCases.reduce((acc, caseItem) => {
        const diseaseName = caseItem.diseaseName || "Unknown";
        acc[diseaseName] = (acc[diseaseName] || 0) + 1;
        return acc;
      }, {});

      activeCasesCount = Object.entries(casesByDisease).map(([diseaseName, count], index) => ({
        diseaseName,
        count,
        color: getColorForDisease(diseaseName, index), // Assign a color
      }));

      return {
        status: 200,
        message: "Data fetched successfully",
        data: activeCasesCount,
      };
    } else {
      // API call to fetch cases count
      const response = await axios.get(`${BASE_URL}/api/cases/admin/all`);
      if (response.status === 200) {
        const filteredCases = response.data.data.map(({ id, patientName, age, sex, guardian, diseaseName, caseStatus, confirmedDate, natureOfConfirmation, remarks, confirmedBy, nicNo, phoneNumber, instituteName, dateOfOnset, dateOfAdmission, ward, bhtNumber, address, labResult, file, notifier, notifiedDate, assignedPhi, phiAssignedDate, assignedMoh, mohAssignedDate, sendReport, markAsReceived }) => ({
          id,
          caseId: id,
          patientName,
          age,
          sex,
          guardian,
          diseaseName,
          caseStatus,
          confirmedDate,
          natureOfConfirmation,
          remarks,
          confirmedBy,
          nicNo,
          phoneNumber,
          instituteName,
          dateOfOnset,
          dateOfAdmission,
          ward,
          bhtNumber,
          address,
          labResult,
          file,
          notifier,
          notifiedDate,
          assignedPhi,
          phiAssignedDate,
          assignedMoh,
          mohAssignedDate,
          sendReport,
          markAsReceived,
        }));

        const activeCases = filteredCases.filter((caseItem) => caseItem.caseStatus === "Confirmed");
        const casesByDisease = activeCases.reduce((acc, caseItem) => {
          const diseaseName = caseItem.diseaseName || "Unknown";
          acc[diseaseName] = (acc[diseaseName] || 0) + 1;
          return acc;
        }, {});
  
        activeCasesCount = Object.entries(casesByDisease).map(([diseaseName, count], index) => ({
          diseaseName,
          count,
          color: getColorForDisease(diseaseName, index), // Assign a color
        }));
  
        return {
          status: 200,
          message: "Data fetched successfully",
          data: activeCasesCount,
        };
      }
      return { status: 400, message: "Failed to fetch data", data: [] };
    }
  } catch (error) {
    console.error("Error calculating cases count:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to calculate cases count",
      data: [],
    };
  }
};

export const sendFinalReport = async (value) => {
  try {
    if (IS_BACKEND) {
      const caseIndex = allCasesResponse.findIndex(
        (data) => data.caseId === value.caseId
      );

      if (caseIndex !== -1) {
        allCasesResponse[caseIndex] = {
          ...allCasesResponse[caseIndex],
          sendReport: value.sendReport,
        };

        return {
          status: 200,
          message: "Send final report successfully",
        };
      } else {
        throw new Error("Case not found");
      }
    } else {
      const response = await axios.put(`${BASE_URL}/sendFinalReport`, value);
      return response.data;
    }
  } catch (error) {
    console.error("Error confirming case:", error);
    throw error;
  }
};

export const mark_AsReceived = async (value) => {
  try {
    if (IS_BACKEND == "false") {
      const caseIndex = allCasesResponse.findIndex(
        (data) => data.caseId === value.caseId
      );

      if (caseIndex !== -1) {
        allCasesResponse[caseIndex] = {
          ...allCasesResponse[caseIndex],
          markAsReceived: value.markAsReceived,
        };

        return {
          status: 200,
          message: "Mark As Received successfully",
        };
      } else {
        throw new Error("Case not found");
      }
    } else {
      const response = await axios.put(`${BASE_URL}/api/cases/${value.caseId}/mark-received`, value);
      if (response.status === 200) {
        return { status: 200, message: "Mark As Received successfully", data: response.data };
      }
      return { status: 400, message: "Failed to mark as received", data: [] };
    }
  } catch (error) {
    console.error("Error confirming case:", error);
    throw error;
  }
}