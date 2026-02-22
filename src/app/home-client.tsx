"use client";

import { useState } from "react";

export default function Home() {
  const today = new Date().toISOString().split("T")[0];

  const [totalCheckIns, setTotalCheckIns] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem("totalCheckIns");
    return stored ? parseInt(stored) : 0;
  });

  const [lastCheckInDate, setLastCheckInDate] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("lastCheckInDate");
  });

  const alreadyCheckedInToday = lastCheckInDate === today;

  const handleCheckIn = () => {
    if (alreadyCheckedInToday) return;

    const newTotal = totalCheckIns + 1;

    setTotalCheckIns(newTotal);
    setLastCheckInDate(today);

    localStorage.setItem("totalCheckIns", newTotal.toString());
    localStorage.setItem("lastCheckInDate", today);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4">
      <main className="w-full max-w-md rounded-3xl bg-white p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
        <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900">
          Compound
        </h1>

        <div className="mt-12 text-center">
          <p className="text-sm uppercase tracking-wide text-gray-400">
            Today’s Goal
          </p>
          <p className="mt-3 text-2xl font-semibold text-gray-800">
            Do 5 squats
          </p>
        </div>

        <button
          onClick={handleCheckIn}
          disabled={alreadyCheckedInToday}
          className={`mt-16 w-full rounded-2xl px-6 py-4 text-lg font-semibold text-white transition-all duration-300 active:scale-95
            ${
              alreadyCheckedInToday
                ? "bg-emerald-500 scale-105 shadow-xl"
                : "bg-gradient-to-r from-blue-600 to-emerald-500 hover:shadow-xl hover:scale-[1.02]"
            }`}
        >
          {alreadyCheckedInToday ? "Completed ✓" : "Mark as Done"}
        </button>

        {alreadyCheckedInToday && (
          <p className="mt-6 text-center text-sm text-emerald-600 animate-pulse">
            Nice. You showed up today.
          </p>
        )}
      </main>
    </div>
  );
}
