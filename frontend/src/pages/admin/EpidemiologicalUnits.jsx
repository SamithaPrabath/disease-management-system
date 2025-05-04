import React, { useState, useEffect } from 'react';;
import { connect } from 'react-redux';
import { CiSearch } from "react-icons/ci";
import AddEpidemiologicalUnit from '../../components/admin/AddEpidemiologicalUnit';

const EpidemiologicalUnits = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingUnit, setIsAddingUnit] = useState(false);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  // In a real implementation, you would fetch this from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUnits([
        { 
          id: 1, 
          name: 'Central Epidemiology Unit', 
          code: 'CEU-001',
          region: 'Colombo',
          address: '123 Main St, Colombo',
          contactPerson: 'Dr. Samantha Perera',
          email: 'central.epi@health.gov.lk',
          phone: '0112345678',
          status: 'Active'
        },
        { 
          id: 2, 
          name: 'Southern Province Epi Unit', 
          code: 'SEU-002',
          region: 'Galle',
          address: '45 Hospital Road, Galle',
          contactPerson: 'Dr. Nimal Silva',
          email: 'south.epi@health.gov.lk',
          phone: '0912345678',
          status: 'Active'
        },
        { 
          id: 3, 
          name: 'Northern Surveillance Unit', 
          code: 'NEU-003',
          region: 'Jaffna',
          address: '78 Temple Road, Jaffna',
          contactPerson: 'Dr. Kumari Navaratne',
          email: 'north.epi@health.gov.lk',
          phone: '0212345678',
          status: 'Inactive'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredUnits = units.filter((unit) => {
    const query = searchQuery.toLowerCase();
    return (
      query === "" ||
      unit.name.toLowerCase().includes(query) ||
      unit.code.toLowerCase().includes(query) ||
      unit.region.toLowerCase().includes(query)
    );
  });

  const handleAddUnit = () => {
    setIsAddingUnit(true);
  };

  const handleCancelAdd = () => {
    setIsAddingUnit(false);
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {isAddingUnit ? (
        <AddEpidemiologicalUnit onCancel={handleCancelAdd} />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Epidemiological Units</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  className="bg-[#E2E5E9] w-[250px] h-[50px] rounded-[8px] px-[16px] py-[14px] text-black placeholder-gray-600 focus:outline-none"
                  type="text"
                  placeholder="Search by name or code"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <CiSearch className="absolute right-[16px] top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              </div>
              <button
                onClick={handleAddUnit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add New Unit
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-6 text-center">Loading epidemiological units...</div>
            ) : filteredUnits.length === 0 ? (
              <div className="p-6 text-center">No epidemiological units found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#EDF7FF]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact Person
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email/Phone
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
                    {filteredUnits.map((unit) => (
                      <tr key={unit.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{unit.code}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{unit.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{unit.region}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{unit.contactPerson}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{unit.email}</div>
                          <div className="text-sm text-gray-500">{unit.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${unit.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {unit.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(EpidemiologicalUnits); 