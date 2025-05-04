import React, { useState, useEffect } from 'react';
import HeaderBar from '../../components/HeaderBar';
import UserTableCard from '../../components/UserTableCard';
import { connect } from 'react-redux';

const EpidemiologyUnit = (props) => {
  const [activeTab, setActiveTab] = useState('users');
  const [epidemiologyUsers, setEpidemiologyUsers] = useState([]);
  
  useEffect(() => {
    // Mock data for demonstration
    // In a real implementation, this would be fetched from your API
    setEpidemiologyUsers([
      { id: 1, name: 'John Doe', email: 'john.doe@epi.gov', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@epi.gov', role: 'Analyst', status: 'Active' },
      { id: 3, name: 'Robert Johnson', email: 'robert.j@epi.gov', role: 'Epidemiologist', status: 'Inactive' },
    ]);
  }, []);

  const handleAddUser = () => {
    // Implementation for adding a new epidemiology unit user
    console.log('Add new epidemiology unit user');
  };

  const handleEditUser = (userId) => {
    // Implementation for editing a user
    console.log('Edit user with ID:', userId);
  };

  const handleDeleteUser = (userId) => {
    // Implementation for deleting a user
    console.log('Delete user with ID:', userId);
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <HeaderBar title="Epidemiology Unit Management" description="Manage epidemiology unit staff, settings, and data" />
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Epidemiology Unit Staff</h2>
                <button 
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add New User
                </button>
              </div>
              
              <UserTableCard 
                users={epidemiologyUsers} 
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                columns={[
                  { key: 'name', header: 'Name' },
                  { key: 'email', header: 'Email' },
                  { key: 'role', header: 'Role' },
                  { key: 'status', header: 'Status' },
                ]}
              />
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Epidemiology Unit Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Notification Settings</h3>
                  <div className="flex items-center mb-2">
                    <input type="checkbox" id="email-notifications" className="mr-2" />
                    <label htmlFor="email-notifications">Email Notifications</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sms-notifications" className="mr-2" />
                    <label htmlFor="sms-notifications">SMS Notifications</label>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Report Generation</h3>
                  <div className="flex items-center mb-2">
                    <input type="checkbox" id="auto-reports" className="mr-2" />
                    <label htmlFor="auto-reports">Automated Weekly Reports</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="data-exports" className="mr-2" />
                    <label htmlFor="data-exports">Enable Data Exports</label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(EpidemiologyUnit); 