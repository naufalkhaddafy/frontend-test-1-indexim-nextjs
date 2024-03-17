"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import nookies, { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

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
    <div>
      <header>
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
          <nav className="flex h-16 items-center justify-between px-20">
            <div>
              <Link
                href={"/"}
                className="hidden items-center justify-between gap-2 md:flex"
              >
                <h1 className="text-lg font-semibold">Indexim Coalindo</h1>
              </Link>
            </div>
            <div className="">
              <ul className="flex justify-center items-center gap-5">
                <li>
                  <Link
                    className={`link ${
                      pathname === "/dashboard" ? "text-green-600" : ""
                    }`}
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className={`link ${
                      pathname === "/employee" ? "text-green-600" : ""
                    }`}
                    href="/employee"
                  >
                    Employee
                  </Link>
                </li>
                <li>Attendance</li>
                <li>Performance</li>
                <li>Employment History</li>
              </ul>
            </div>
            <div className="flex items-centergap-2">
              <div className="flex w-full justify-start items-center gap-5">
                <Button onClick={doLogout}>Logout</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button>Logout</button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="p-4 rounded-lg  mt-14">{children}</div>
      <div className="p-4 sm:ml-64"></div>
    </div>
  );
}
