"use client";

import { useState } from "react";

const UserInput = ({ onUsersUpdate }: { onUsersUpdate: (users: string[]) => void }) => {
  const [users, setUsers] = useState(Array(8).fill("")); // 8명 분의 공간 유지

  const handleChange = (index: number, value: string) => {
    const updatedUsers = users.map((user, i) => (i === index ? value : user));
    setUsers(updatedUsers);
    onUsersUpdate(updatedUsers);
  };

  return (
    <div className="mb-4 max-w-screen-xl mx-auto"> {/* 전체 너비 제한 */}
      <h2 className="text-xl font-semibold mb-2">사용자 입력</h2>
      <div className="grid grid-cols-8 gap-1"> {/* 가로 4칸까지 배치 */}
        {users.map((user, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={user}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`사용자 ${index + 1}`}
              className="p-2 border rounded w-32"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInput;
