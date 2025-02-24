import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CasesCard = ({ header, data, colors }) => {
  // Filter active cases
  const activeData = data.map((item, index) => ({
    ...item,
    color: item.active ? colors[index % colors.length] : `${colors[index % colors.length]}80`, // 80 = 50% opacity
  }));

  // Calculate total active cases
  const totalActiveCases = activeData.reduce((acc, item) => (item.active ? acc + item.value : acc), 0);

  return (
    <div className="w-[300px] h-[200px] bg-white flex flex-col items-center drop-shadow-md shadow-[#E2E5E9] rounded-[8px] p-[16px]">
      <h4 className="text-[20px] text-[#65686C] font-medium text-center">
        {header}
      </h4>
      <ResponsiveContainer width={150} height={150}>
        <PieChart width={150} height={150}>
          <Pie
            data={activeData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            dataKey="value"
          >
            {activeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {/* Center Text (Total Active Cases) */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#333"
          >
            {totalActiveCases}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CasesCard;
