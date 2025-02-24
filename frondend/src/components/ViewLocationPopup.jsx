import React, {useState, useEffect} from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from 'react-redux';
import { closePopUp } from '../redux/actions/popUpAction';

const ViewLocationPopup = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(props.AllPopup);
      }, [props.AllPopup]);

      const handlePopUpCLose = () => {
        props.closePopUp();
      }

  return (
    <>
     {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#080809]/80 z-50">
          <div className="bg-white w-[400px] h-[500px] rounded-[8px] shadow-sm flex flex-col">
            
            {/* Header Section */}
            <div className="h-[56px] px-[16px] py-[8px] flex items-center justify-between border-b border-[#E2E5E9]">
              <h1 className="w-full text-center text-[24px] font-medium">View Location</h1>
              <button
                className="p-2 text-gray-600 hover:text-black transition"
                onClick={handlePopUpCLose}
              >
                <IoIosCloseCircle className="text-[40px] text-[#E2E5E9] hover:text-[#d11a2a] cursor-pointer transition"/>
              </button>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              <p className="text-base text-[#080809]">Address</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
    return {
        AllPopup: state.allPopup,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    closePopUp: () => dispatch(closePopUp()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewLocationPopup);