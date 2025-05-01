import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { closeReportFilesPopUp } from "../redux/actions/reportFilesPopUpAction";
import { getReportFiles } from "../api/allCasesApi";

const ViewReportFilesPopup = ({ reportFilesPopup, closeReportFilesPopUp }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ViewReportFilesPopup - reportFilesPopup value:", reportFilesPopup);
    
    if (reportFilesPopup && reportFilesPopup[0]) {
      const caseId = reportFilesPopup[1];
      console.log("ViewReportFilesPopup - caseId extracted:", caseId);
      
      // Make sure we have a valid caseId before fetching
      if (caseId) {
        const fetchFiles = async () => {
          try {
            setLoading(true);
            console.log("Fetching report files for caseId:", caseId);
            const response = await getReportFiles(caseId);
            console.log("Got response for report files:", response);
            setFiles(response.data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching report files:", error);
            setLoading(false);
          }
        };
        fetchFiles();
      } else {
        console.error("No case ID provided for fetching report files");
        setLoading(false);
      }
    }
  }, [reportFilesPopup]);

  if (!reportFilesPopup || !reportFilesPopup[0]) {
    return null;
  }

  const handleViewFile = (fileUrl, fileName) => {
    // Open the file in a new tab
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Report Files</h2>
          <button
            onClick={closeReportFilesPopUp}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No files available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-500">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[300px]">
                      {file.fileName}
                    </p>
                    <p className="text-xs text-gray-500">{file.uploadDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleViewFile(file.fileUrl, file.fileName)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    reportFilesPopup: state.reportFilesPopup,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeReportFilesPopUp: () => dispatch(closeReportFilesPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewReportFilesPopup); 