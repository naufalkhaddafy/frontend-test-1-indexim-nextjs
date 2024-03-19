"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import Link from "next/link";
import nookies from "nookies";
import { Input } from "postcss";
import { useEffect, useState } from "react";

export default function page() {
  const [shifts, setShifts] = useState();
  const token = nookies.get();

  console.log(token);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/shift`, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((response) => {
        setShifts(response.data.data);
      });
  }, []);
  return (
    <div className="w-full p-6 rounded-xl shadow-lg border min-h-screen">
      <div className="flex justify-between mb-20">
        <h3 className="text-3xl">Data Shift</h3>
        {/* <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-green-600 text-white">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] min-w-[800px]">
            <form onSubmit={addEmployee}>
              <DialogHeader>
                <DialogTitle>Tambah Data Karyawan</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center gap-4">
                  <Label htmlFor="name" className="">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="col-span-3"
                    placeholder="Input your name"
                    onChange={onChange}
                  />
                </div>
                <div className="grid items-center gap-4">
                  <Label htmlFor="username" className="">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    className="col-span-3"
                    placeholder="Input your username"
                    onChange={onChange}
                  />
                </div>
                <div className="grid items-center gap-4">
                  <Label htmlFor="email" className="">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Input your email"
                    className="col-span-3"
                    onChange={onChange}
                  />
                </div>
                <div className="grid items-center gap-4">
                  <Label htmlFor="password" className="">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Input your password"
                    className="col-span-3"
                    onChange={onChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-500">
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog> */}
      </div>
      <div className="flex flex-wrap justify-start gap-20 py-10 border-t-2">
        {shifts &&
          shifts.map((shift, index) => (
            <Card className="w-96" key={index}>
              <CardHeader className="text-left">
                <CardTitle>{shift.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="text-xl text-center mb-2 bold">Schedule</h4>
                <div className=" flex justify-around items-center">
                  <div>{shift.start_at}</div>
                  <div>---</div>
                  <div>{shift.end_at}</div>
                </div>
                <div className="flex justify-start gap-10 items-center mt-4">
                  <h4 className="text-xl text-center mb-2">Total Hours</h4>
                  <h4 className="text-xl text-center mb-2">
                    {shift.total_hours} Hours
                  </h4>
                </div>
                <h3 className="text-xl">Description</h3>
                <p>{shift.description}</p>
              </CardContent>
              <CardFooter className="flex justify-center"></CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
