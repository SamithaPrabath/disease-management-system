import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CasesCard = ({ chartData }) => {
  // Determine header based on data
  const header = "Total Active Cases";
  // Process data for visualization
  const processedData = chartData.map((item) => ({
    ...item,
    color: item.color,
  }));

  // Calculate total cases
  const totalCases = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="w-full flex flex-wrap flex-row items-center justify-left gap-[32px]">
      <div className="w-[300px] h-[200px] bg-white flex flex-col items-center drop-shadow-md shadow-[#E2E5E9] rounded-[8px] p-[16px]">
        <h4 className="text-[20px] text-[#65686C] font-medium text-center">
          {header}
        </h4>
        <ResponsiveContainer width={150} height={150}>
          <PieChart width={150} height={150}>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              dataKey="count"
              stroke="#aaa"
              strokeWidth={1}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#333"
            >
              {totalCases}
            </text>
          </PieChart>
        </ResponsiveContainer>
        
        </div>
        {chartData.map((data, key) => (
          <li
            className="w-[300px] h-[200px] bg-white flex flex-col items-center drop-shadow-md shadow-[#E2E5E9] rounded-[8px] p-[16px]"
            key={key}
          >
            <h4 className="text-[20px] text-[#65686C] font-medium text-center">
              {data.diseaseName} Cases
            </h4>
            <ResponsiveContainer width={150} height={150}>
              <PieChart width={150} height={150}>
                <Pie
                  data={processedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="count"
                  stroke="#aaa" 
                  strokeWidth={1}
                >
                  {processedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index == key? entry.color : `${entry.color}10`} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#333"
                >
                  {data.count}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </li>
      ))}
    </div>
  );
};

export default CasesCard;
