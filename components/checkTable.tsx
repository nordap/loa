import React from 'react';

interface CheckTableProps {
  data: Array<{ name: string; can: string[] }> | null;
  onToggle: (name: string, day: string) => void;
}

const days = ['월', '화', '수', '목', '금', '토', '일'];

const CheckTable: React.FC<CheckTableProps> = ({ data, onToggle }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-600">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            {days.map((day) => (
              <th key={day} className="border border-gray-300 px-4 py-2 text-center">
                {day}
              </th>
            ))}
            {/* <th className="border border-gray-300 px-4 py-2 text-center">Checked</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.name} className="hover:bg-gray-700">
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              {days.map((day) => (
                <td key={day} className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={item.can.includes(day)}
                    onChange={() => onToggle(item.name, day)}
                    className="cursor-pointer"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckTable;