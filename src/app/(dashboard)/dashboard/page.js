"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import nookies from "nookies";
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
import { useState } from "react";

export default function page() {
  let profile = [];
  const token = nookies.get();
  axios
    .request({
      headers: {
        Authorization: "Bearer " + token.token,
      },
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_URL}/api/profile`,
    })
    .then((response) => {
      profile = response.data.data;
      console.log(profile.name);
    });

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Link href="/login">Home</Link>
      Hello I am Dashboard {}
      <AlertDialog>
        <AlertDialogTrigger>Logout</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
