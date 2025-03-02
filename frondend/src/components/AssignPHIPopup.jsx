import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { getPhiListByLocation, phiAssignToCase } from "../api/phiApi";
import { closeAssignPHIPopUp } from "../redux/actions/assginPHIPopupAction";
import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation schema
const assignPHISchema = Yup.object().shape({
  assignPhi: Yup.string().required("Please select a PHI"),
});

const AssignPopup = ({ Assignphipopup, ViewsSingleCase, closeAssignPHIPopUp }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [phiList, setPhiList] = useState([]);

  useEffect(() => {
    setIsOpen(Assignphipopup);
  }, [Assignphipopup]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPhiListByLocation("Colombo");
        setPhiList(response.data || []);
      } catch (error) {
        console.error("Error fetching PHI list:", error);
        messageApi.error("Failed to fetch PHI list");
      }
    };

    if (isOpen) fetchData();
  }, [isOpen, messageApi]);

  const formik = useFormik({
    initialValues: {
      caseId: ViewsSingleCase?.[1] || "",
      assignPhi: "",
      phiAssignedDate: new Date().toISOString().split("T")[0],
    },
    validationSchema: assignPHISchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await phiAssignToCase(values);

        if (response?.message) {
          messageApi.success(response.message);
          resetForm();
          setTimeout(() => closeAssignPHIPopUp(), 1000);
        } else {
          throw new Error("No response message");
        }
      } catch (error) {
        console.error("Error during PHI assignment:", error);
        messageApi.error("An error occurred during PHI assignment");
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
                Assign PHI
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={() => closeAssignPHIPopUp()}
              >
                <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition" />
              </button>
            </div>

            <div className="p-[16px]">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-3">
                  <label className="text-[16px] text-gray-700">
                    Select a PHI According to Location
                  </label>
                  <select
                    name="assignPhi"
                    className="w-full px-4 py-2 h-[40px] bg-gray-200 rounded-md focus:outline-none"
                    value={formik.values.assignPhi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select PHI</option>
                    {phiList.map((phi) => (
                      <option key={phi.id} value={phi.id}>
                        Name: {phi.name}, MOH: {phi.moh}
                      </option>
                    ))}
                  </select>
                  {formik.touched.assignPhi && formik.errors.assignPhi && (
                    <p className="text-red-500 text-sm">{formik.errors.assignPhi}</p>
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
  Assignphipopup: state.assignphipopupReducer,
  ViewsSingleCase: state.viewsSingleCase,
});

const mapDispatchToProps = (dispatch) => ({
  closeAssignPHIPopUp: () => dispatch(closeAssignPHIPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignPopup);