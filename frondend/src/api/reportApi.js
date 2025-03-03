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
  },
];

export const addReport = async (report) => {
  try {
    if (IS_BACKEND) {

      return { status: 200, message: "Report add successfully" };
      
    } else {
      // Make an API call to update the case
      const response = await axios.put(
        `${BASE_URL}/updateCase/${report.caseId}`,
        report
      );
      return response.data; // Return the data received from the API
    }
  } catch (error) {
    console.error("Error updating case:", error);
    throw error; // Throw the error if the request fails
  }
};
