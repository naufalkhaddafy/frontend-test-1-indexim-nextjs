import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
  FaCircleUser,
  FaRegCalendarCheck,
} from "react-icons/fa6";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/dashboard"
              className={`link ${
                pathname === "/dashboard" ? "bg-gray-100" : ""
              } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
            >
              <FaChartLine />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/employee"
              className={`link ${
                pathname === "/employee" ? "bg-gray-100" : ""
              } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
            >
              <FaCircleUser />
              <span className="ms-3">Employee</span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
              onClick={() => setOpen((e) => !e)}
            >
              <FaRegCalendarCheck />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Attendance
              </span>
              {open ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {open ? (
              <ul id="dropdown-example" className="py-2 space-y-2">
                <li>
                  <Link
                    href="/attendance/shift"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Shift
                  </Link>
                </li>
                <li>
                  <Link
                    href="/attendance/report"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Report
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>
        </ul>
      </div>
    </aside>
  );
}
