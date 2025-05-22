import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import { CiSearch } from "react-icons/ci";
import { 
  fetchPasswordResetRequests, 
  approvePasswordResetRequestAction, 
  rejectPasswordResetRequestAction 
} from '../../redux/actions/passwordResetRequestsAction';

const ResetPasswordRequests = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const { 
    fetchPasswordResetRequests, 
    approvePasswordResetRequestAction, 
    rejectPasswordResetRequestAction, 
    passwordResetRequests 
  } = props;

  // Fetch password reset requests on component mount
  useEffect(() => {
    fetchPasswordResetRequests();
  }, [fetchPasswordResetRequests]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredRequests = passwordResetRequests && passwordResetRequests.data
    ? passwordResetRequests.data.filter((request) => {
        const query = searchQuery.toLowerCase();
        return (
          query === "" ||
          request.username.toLowerCase().includes(query) ||
          request.userId.toLowerCase().includes(query) ||
          request.userType.toLowerCase().includes(query)
        );
      })
    : [];

  const handleApprove = async (requestId) => {
    try {
      const response = await approvePasswordResetRequestAction(requestId);
      if (response.status === 200) {
        messageApi.success('Password reset request approved');
        // Refresh the list after successful approval
        fetchPasswordResetRequests();
      } else {
        messageApi.error(response.message || 'Failed to approve request');
      }
    } catch (error) {
      messageApi.error('Failed to approve request: ' + (error.message || 'Unknown error'));
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await rejectPasswordResetRequestAction(requestId);
      if (response.status === 200) {
        messageApi.success('Password reset request rejected');
        // Refresh the list after successful rejection
        fetchPasswordResetRequests();
      } else {
        messageApi.error(response.message || 'Failed to reject request');
      }
    } catch (error) {
      messageApi.error('Failed to reject request: ' + (error.message || 'Unknown error'));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {contextHolder}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Password Reset Requests</h2>
        <div className="relative">
          <input
            className="bg-[#E2E5E9] w-[250px] h-[50px] rounded-[8px] px-[16px] py-[14px] text-black placeholder-gray-600 focus:outline-none"
            type="text"
            placeholder="Search by username or ID"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <CiSearch className="absolute right-[16px] top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {passwordResetRequests && passwordResetRequests.loading ? (
          <div className="p-6 text-center">Loading password reset requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="p-6 text-center">No password reset requests found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#EDF7FF]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.userRole}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(request.requestDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${request.isReset == 1 ? 'bg-green-100 text-green-800' : 
                          request.isReset == -1 ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {request.isReset == 1 ? 'Approved' : 
                          request.isReset == -1 ? 'Rejected' : 
                          'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {request.isReset == 0 && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {request.isReset != 0 && (
                        <span className="text-gray-500">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    passwordResetRequests: state.passwordResetRequests,
    allLogins: state.allLogins
  };
};

const mapDispatchToProps = {
  fetchPasswordResetRequests,
  approvePasswordResetRequestAction,
  rejectPasswordResetRequestAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordRequests); 