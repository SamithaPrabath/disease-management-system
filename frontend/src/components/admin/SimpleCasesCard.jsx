import React from "react";

const SimpleCasesCard = ({ title, value, bgColor, textColor }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow flex flex-col items-center`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <p className={`text-4xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
};

export default SimpleCasesCard; 