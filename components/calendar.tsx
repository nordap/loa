"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Calendar = ({ userNames }: { userNames: string[] }) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [availability, setAvailability] = useState<{ [key: string]: boolean }>({});

  // 📌 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("schedules").select("*");
      if (data) {
        const mappedData = data.reduce((acc, curr) => {
          acc[`${curr.day}-${curr.user}`] = curr.status;
          return acc;
        }, {} as { [key: string]: boolean });
        setAvailability(mappedData);
      }
    };

    fetchData();

    // 📌 실시간 업데이트 리스너
    const subscription = supabase
      .channel("schedules")
      .on("postgres_changes", { event: "*", schema: "public", table: "schedules" }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // 📌 참석 여부 업데이트
  const toggleAvailability = async (day: string, user: string) => {
    const key = `${day}-${user}`;
    const newStatus = !availability[key];
  
    try {
      const { error } = await supabase
        .from("schedules")
        .upsert([{ day, user, status: newStatus }], { onConflict: "day, user" }); // ✅ 수정된 부분
  
      if (error) {
        console.error("Error updating availability:", error);
        return; // 에러 발생 시 상태 업데이트 X
      }
  
      // 📌 성공하면 상태 업데이트
      setAvailability((prev) => ({ ...prev, [key]: newStatus }));
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  
  return (
    <table className="border-collapse border w-full text-center table-fixed">
      <thead>
        <tr>
          <th className="border p-2 w-20">요일</th>
          {userNames?.map((name, idx) => (
            <th key={idx} className="border p-2 w-32">{name || `사용자 ${idx + 1}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {days?.map((day) => (
          <tr key={day}>
            <td className="border p-2 w-20">{day}</td>
            {userNames?.map((user, idx) => {
              const key = `${day}-${user}`;
              return (
                <td
                  key={idx}
                  className={`border p-2 w-32 cursor-pointer ${
                    availability[key] ? "bg-green-300" : "bg-red-300"
                  }`}
                  onClick={() => toggleAvailability(day, user)}
                >
                  {availability[key] ? "✔" : "❌"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
