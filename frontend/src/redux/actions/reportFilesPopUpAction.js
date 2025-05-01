import { VIEW_REPORT_FILES_BUTTON_CLICKED, VIEW_REPORT_FILES_CLOSE_BUTTON_CLICKED } from "./types";

export const viewReportFilesPopUp = (caseId) => {
  console.log("Report Files Popup Action - Case ID:", caseId);
  return {
    type: VIEW_REPORT_FILES_BUTTON_CLICKED,
    payload: [true, caseId],
  }
};

export const closeReportFilesPopUp = () => {
  return {
    type: VIEW_REPORT_FILES_CLOSE_BUTTON_CLICKED,
    payload: false,
  }
}; 