"use client";

import { useState } from "react";
import UserInput from "@/components/userinput";
import Calendar from "@/components/calendar";
import RaidTable from "@/components/raidtable";

export default function Main() {
  const [userNames, setUserNames] = useState<string[]>([]);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">레이드 일정 및 주간 캘린더</h1>

      {/* 사용자 입력 */}
      <UserInput onUsersUpdate={setUserNames} />

      {/* 주간 캘린더 - 사용자 반영 */}
      <Calendar userNames={userNames} />

      {/* 레이드 일정 - 사용자 반영 */}
      <RaidTable userNames={userNames} />
    </div>
  );
}
