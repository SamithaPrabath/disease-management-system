import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { getMohListByLocation, mohAssignToCase } from "../api/mohApi";
import { closeAssignMOHPopUp } from "../redux/actions/assignMOHPopupAction";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation schema
const assignMOHSchema = Yup.object().shape({
  assignMoh: Yup.string().required("Please select a MOH"),
});

const AssignPopup = ({ Assignmohpopup, ViewsSingleCase, closeAssignMOHPopUp }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [mohList, setMohList] = useState([]);

  useEffect(() => {
    setIsOpen(Assignmohpopup);
  }, [Assignmohpopup]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMohListByLocation("Colombo");
        setMohList(response.data || []);
      } catch (error) {
        console.error("Error fetching MOH list:", error);
        messageApi.error("Failed to fetch MOH list");
      }
    };

    if (isOpen) fetchData();
  }, [isOpen, messageApi]);

  const formik = useFormik({
    initialValues: {
      caseId: ViewsSingleCase?.[1],
      assignMoh: "",
      mohAssignedDate: new Date().toISOString().split("T")[0],
    },
    validationSchema: assignMOHSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await mohAssignToCase(values);

        if (response?.message) {
          messageApi.success(response.message);
          resetForm();
          setTimeout(() => closeAssignMOHPopUp(), 1000);
        } else {
          throw new Error("No response message");
        }
      } catch (error) {
        console.error("Error during MOH assignment:", error);
        messageApi.error("An error occurred during MOH assignment");
      }
    },
  });

  return (
    <>
      {contextHolder}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
          <div className="bg-white w-[400px] h-[500px] rounded-[8px] shadow-sm flex flex-col">
            {/* Header Section */}
            <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
              <h1 className="w-full text-center text-[24px] font-medium">
                Assign MOH
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={() => closeAssignMOHPopUp()}
              >
                <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition" />
              </button>
            </div>

            <div className="p-[16px]">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-3">
                  <label className="text-[16px] text-gray-700">
                    Select a MOH According to Location
                  </label>
                  <select
                    name="assignMoh"
                    className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                    value={formik.values.assignMoh}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select MOH</option>
                    {mohList.map((moh) => (
                      <option key={moh.id} value={moh.id}>
                        Name: {moh.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.assignMoh && formik.errors.assignMoh && (
                    <p className="text-red-500 text-sm">{formik.errors.assignMoh}</p>
                  )}
                </div>

                {/* Placeholder for Location Component */}
                <div className="mt-4 text-gray-700">Location Here</div>

                {/* Hidden Case ID */}
                <input
                  type="hidden"
                  name="caseId"
                  value={formik.values.caseId}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-3 disabled:bg-blue-400"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting ? "Assigning..." : "Assign"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  Assignmohpopup: state.assignmohpopup,
  ViewsSingleCase: state.viewsSingleCase,
});

const mapDispatchToProps = (dispatch) => ({
  closeAssignMOHPopUp: () => dispatch(closeAssignMOHPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignPopup);