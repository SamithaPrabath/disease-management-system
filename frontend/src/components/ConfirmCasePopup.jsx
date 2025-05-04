import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from "react-redux";
import { closeVIewConfirmPopUp } from "../redux/actions/confirmCasePopUpAction";
import { message } from "antd";
import { confirmCase } from "../api/allCasesApi";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  natureOfConfirmation: Yup.string().required(
    "Please select nature of confirmation"
  ),
});

const ConfirmCasePopup = ({
  AllLogins,
  ConfirmPopUp,
  closeVIewConfirmPopUp,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [remarks, setRemarks] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(ConfirmPopUp?.[0]);
  }, [ConfirmPopUp]);

  useEffect(() => {
    setUserTypeId(AllLogins.data.userId);
  }, [AllLogins]);

  const handleSubmit = async (values) => {
    const submitValues = {
      natureOfConfirmation: values.natureOfConfirmation,
      remarks: remarks,
      confirmedBy: userTypeId,
      id: ConfirmPopUp?.[1],
      confirmedDate: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await confirmCase(submitValues);

      if (response && response.message) {
        messageApi.success(response.message);
        setTimeout(() => {
          closeVIewConfirmPopUp();
        }, 1000);
      } else {
        messageApi.error("Confirmation failed");
      }
    } catch (error) {
      console.error("Error during confirmation:", error);
      messageApi.error("An error occurred during confirmation.");
    }
  };

  const confirmationOptions = [
    "Clinical only",
    "Clinical and epidemiological",
    "Clinical and bacteriological",
    "Clinical and serological",
    "Clinical, bacteriological and serological",
    "Clinical and direct microscopy",
  ];

  return (
    <>
      {contextHolder}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
          <div className="bg-white w-[400px] min-h-[500px] max-h-[95vh] overflow-y-auto  rounded-[8px] shadow-sm flex flex-col">
            <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
              <h1 className="w-full text-center text-[24px] font-medium">
                Confirm Case
              </h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={() => closeVIewConfirmPopUp()}
              >
                <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition" />
              </button>
            </div>

            <div className="p-[16px]">
              <h2 className="w-full text-left text-[20px] font-medium">
                Nature of Confirmation
              </h2>

              <Formik
                initialValues={{
                  natureOfConfirmation: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="space-y-2">
                      {confirmationOptions.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <Field
                            type="radio"
                            id={`option-${index}`}
                            name="natureOfConfirmation"
                            value={option}
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <label
                            htmlFor={`option-${index}`}
                            className="ml-2 text-gray-700"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                      {errors.natureOfConfirmation &&
                        touched.natureOfConfirmation && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.natureOfConfirmation}
                          </div>
                        )}
                    </div>

                    <div className="mt-6">
                      <h2 className="text-[20px] font-medium text-gray-800 mb-2">
                        Remarks
                      </h2>
                      <textarea
                        name="phiRemarks"
                        className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-3"
                    >
                      Confirm
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
    ConfirmPopUp: state.confirmPopUp,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeVIewConfirmPopUp: () => dispatch(closeVIewConfirmPopUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCasePopup);
