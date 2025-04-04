"use client";

const RaidTable = ({ userNames }: { userNames: string[] }) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  
  return (
    <table className="border-collapse border w-full text-center table-fixed mt-4">
      <thead>
        <tr>
          <th className="border p-2 w-20">요일</th>
          <th className="border p-2 w-32">레이드명</th>
          {Array(8).fill(null).map((_, idx) => (
            <th key={idx} className="border p-2 w-32">{userNames[idx] || ` `}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days.map((day, dayIdx) => (
          <tr key={dayIdx}>
            <td className="border p-2 w-20">{day}</td>
            <td className="border p-2 w-32">
              <input type="text" className="w-full p-1 border" placeholder="레이드명" />
            </td>
            {Array(8).fill(null).map((_, userIdx) => (
              <td key={userIdx} className="border p-2 w-32">
                <input type="text" className="w-full p-1 border" placeholder="캐릭터명" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RaidTable;
