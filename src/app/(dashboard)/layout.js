"use client";
import nookies, { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";

import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  const token = nookies.get();
  const router = useRouter();
  const pathname = usePathname();

  const doLogout = async () => {
    router.replace("/login");
    destroyCookie(null, "token");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token.token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar doLogout={doLogout} />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </>
  );
}
