"use client";

import Link from "next/link";

export default function page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Link href="/dashboard">Home</Link>
      Hello I am Report Attendance
    </div>
  );
}
