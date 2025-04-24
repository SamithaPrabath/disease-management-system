import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

export const reportResponse = [
  {
    id: "001",
    caseId: "C001",
    ethnicGroup: "Sinhalese",
    dischargeDate: "2023-10-20",
    isolationDateFrom: "2023-10-16",
    isolationDateTo: "2023-10-20",
    movementHistory: "No recent travel",
    isolationStatus: "Home",
    outcome: "Recovered",
    labResults: "Positive for Dengue IgM",
    householdContacts: [
      { name: "", age: "", date: "", disposition: "" },
      { name: "", age: "", date: "", disposition: "" },
      { name: "", age: "", date: "", disposition: "" },
    ],
    otherContacts: [
      { name: "", age: "", date: "", disposition: "" },
      { name: "", age: "", date: "", disposition: "" },
      { name: "", age: "", date: "", disposition: "" },
    ],
    phiRemarks: "Patient responded well to treatment",
    file: null,
    reportCreatedDate: "2022-02-05"
  },
  {
    id: "002",
    caseId: "C002",
    ethnicGroup: "Sinhalese",
    dischargeDate: "2023-10-20",
    isolationDateFrom: "2023-10-16",
    isolationDateTo: "2023-10-20",
    movementHistory: "No recent travel",
    isolationStatus: "Home",
    outcome: "Recovered",
    labResults: "Positive for Dengue IgM",
    householdContacts: [
      { name: "", age: "", date: "", disposition: "" },
      { name: "", age: "", date: "", disposition: "" },
      { name: "", age: "", date: "", disposition: "" },
    ],
    otherContacts: [
      { name: "", age: "", date: "", disposition: "" },
      { name: "", age: "", date: "", disposition: "" },
      { name: "", age: "", date: "", disposition: "" },
    ],
    phiRemarks: "Patient responded well to treatment",
    file: null,
    reportCreatedDate: "2022-02-03"
  },
];

export const addReport = async (reportData) => {
  try {
    // Handle FormData or plain object
    let report;
    if (reportData instanceof FormData) {
      const parseContacts = (field) => {
        const value = reportData.get(field);
        if (value && typeof value === "string" && value.trim() !== "") {
          try {
            return JSON.parse(value);
          } catch (e) {
            console.warn(`Failed to parse ${field}:`, e);
            return null; // Fallback if parsing fails
          }
        }
        return null;
      };

      report = {
        caseId: reportData.get("caseId"),
        ethnicGroup: reportData.get("ethnicGroup"),
        dischargeDate: reportData.get("dischargeDate"),
        isolationDateFrom: reportData.get("isolationDateFrom"),
        isolationDateTo: reportData.get("isolationDateTo"),
        movementHistory: reportData.get("movementHistory"),
        isolationStatus: reportData.get("isolationStatus"),
        outcome: reportData.get("outcome"),
        labResults: reportData.get("labResults"),
        householdContacts: parseContacts("householdContacts"),
        otherContacts: parseContacts("otherContacts"),
        phiRemarks: reportData.get("phiRemarks"),
        file: reportData.get("file"), // File object if present
        reportCreatedDate: new Date().toISOString().split("T")[0],

      };
    } else {
      report = reportData; // Plain object case
    }

    // Validation
    if (!report || !report.caseId) {
      throw new Error("Invalid input: caseId is required");
    }

    if (IS_BACKEND == "false") {
      // Check if a report already exists for this caseId
      const existingReport = reportResponse.find((r) => r.caseId === report.caseId);
      if (existingReport) {
        return {
          status: 409,
          message: "Report already exists for this case",
          data: existingReport,
        };
      }

      // Generate a new report with a unique ID
      const newReport = {
        ...report,
        id: (reportResponse.length + 1).toString().padStart(3, "0"), // Generate new ID
        householdContacts: report.householdContacts || [
          { name: "", age: "", date: "", disposition: "" },
          { name: "", age: "", date: "", disposition: "" },
          { name: "", age: "", date: "", disposition: "" },
        ],
        otherContacts: report.otherContacts || [
          { name: "", age: "", date: "", disposition: "" },
          { name: "", age: "", date: "", disposition: "" },
          { name: "", age: "", date: "", disposition: "" },
        ],
      };

      // Append the new report to the array
      reportResponse.push(newReport);

      return {
        status: 201, // 201 for creation
        message: "Report added successfully",
        data: newReport,
      };
    } else {
      // Make an API call to update the case with the report
      const response = await axios.put(`${BASE_URL}/api/cases/add-report/${report.caseId}`, reportData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for FormData with file
        },
      });
      if(response.status == 200){
        return {
          status: 200,
          message: "Report added successfully",
          data: response.data,
        };
      }
      else{
        return {
          status: 400,
          message: "Failed to add report",
          data: null,
        };
      }
    }
  } catch (error) {
    console.error("Error adding report:", error);
    return {
      status: error.response?.status || 500,
      message: error.message || "Failed to add report",
      data: null,
    };
  }
};