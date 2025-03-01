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
    assignedStatus: "unassigned",
    remarks: "Lorem Lorem",
    assignedPhi: "P001",
    caseId: "C001",
  },
];

export const assignedPhi = async () => {};

export const unAssignedPhi = async (unAssignData) => {
    try {
      if (IS_BACKEND) {
        // Update the main case data
        const caseIndex = allCasesResponse.findIndex(
          (data) => data.caseId === unAssignData.caseId
        );
  
        // Update the assigned phi response
        const phiAssignmentIndex = assignedPhiResponse.findIndex(
          (data) => data.caseId === unAssignData.caseId
        );
  
        if (caseIndex !== -1 && phiAssignmentIndex !== -1) {
          // Update main case record
          allCasesResponse[caseIndex] = {
            ...allCasesResponse[caseIndex],
            assignedPhi: "",
          };
  
          // Update phi assignment record
          assignedPhiResponse[phiAssignmentIndex] = {
            ...assignedPhiResponse[phiAssignmentIndex],
            assignedStatus: "unassigned",
            remarks: unAssignData.remarks,
          };
  
          return {
            status: 200,
            message: "PHI unassigned successfully",
            data: {
              case: allCasesResponse[caseIndex],
              phiAssignment: assignedPhiResponse[phiAssignmentIndex]
            }
          };
        } else {
          throw new Error("Case or PHI assignment not found");
        }
      } else {
        const response = await axios.put(`${BASE_URL}/unassignPhi`, unAssignData);
        return response.data;
      }
    } catch (error) {
      console.error("Error unassigning PHI:", error);
      throw error;
    }
  };