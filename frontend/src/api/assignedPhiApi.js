import axios from "axios";
import { allCasesResponse } from "./allCasesApi";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IS_BACKEND = import.meta.env.VITE_IS_BACKEND;

export const assignedPhiResponse = [
  {
    id: "001",
    assignedStatus: "assigned",
    remarks: "",
    assignedPhi: "P001",
    caseId: "C001",
  },
  {
    id: "002",
    assignedStatus: "assigned",
    remarks: "Lorem Lorem",
    assignedPhi: "P001",
    caseId: "C003",
  },
];

export const assignedPhi = async () => { };

export const unAssignedPhi = async (unAssignData) => {
  try {
    if (IS_BACKEND == "false") {
      const caseIndex = allCasesResponse.findIndex(
        (caseItem) => caseItem.caseId === unAssignData.caseId
      );

      if (caseIndex === -1) {
        return { status: 404, message: `Case with ID ${unAssignData.caseId} not found` };
      }

      allCasesResponse[caseIndex] = {
        ...allCasesResponse[caseIndex],
        assignedPhi: "",
        phiAssignedDate: "", // Default to current date if not provided
      };

      assignedPhiResponse[caseIndex] = {
        ...assignedPhiResponse[caseIndex],
        assignedStatus: "unassigned",
        remarks: unAssignData.remarks,
      };

      return { status: 200, message: "PHI unassigned successfully" };
    } else {
      const response = await axios.put(
        `${BASE_URL}/api/cases/${unAssignData.caseId}/assign-phi`,
        { assignedPhi: "", phiAssignedDate: "" }
      );
      if (response.status == 200) {
        return { status: 200, message: "PHI unassigned successfully", data: response.data.data };
      } else {
        return { status: 400, message: response.data.message };
      }
    }
  } catch (error) {
    console.error("Error unassigning PHI:", error);
    throw error;
  }
};