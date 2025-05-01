import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import SimpleCasesCard from '../../components/admin/SimpleCasesCard';
import { connect } from 'react-redux';

const Home = (props) => {
  const [totalCases, setTotalCases] = useState(0);
  const [pendingCases, setPendingCases] = useState(0);
  const [resolvedCases, setResolvedCases] = useState(0);
  const [activeCases, setActiveCases] = useState(0);

  useEffect(() => {
    // Here you would typically fetch data from your API
    // For demonstration purposes, using placeholder data
    setTotalCases(245);
    setPendingCases(42);
    setResolvedCases(158);
    setActiveCases(45);
  }, []);

  return (
    <div className="flex flex-col w-full gap-8">
      <HeaderBar title="Admin Dashboard" description="Welcome to the Disease Management System Admin Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleCasesCard title="Total Cases" value={totalCases} bgColor="bg-blue-50" textColor="text-blue-500" />
        <SimpleCasesCard title="Pending Cases" value={pendingCases} bgColor="bg-yellow-50" textColor="text-yellow-500" />
        <SimpleCasesCard title="Resolved Cases" value={resolvedCases} bgColor="bg-green-50" textColor="text-green-500" />
        <SimpleCasesCard title="Active Cases" value={activeCases} bgColor="bg-red-50" textColor="text-red-500" />
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">System Administration</h2>
        <p className="text-gray-600">
          This dashboard allows you to manage all aspects of the disease management system, including users, roles, and system settings.
          Use the navigation bar above to access different administrative functions.
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cases: state.cases
  };
};

export default connect(mapStateToProps)(Home); 