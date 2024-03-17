"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";

export default function page() {
  const [employees, setEmployees] = useState("");
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user`).then((response) => {
      setEmployees(response.data.data);
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start mx-20 mt-10">
      <div className="w-full p-6 rounded-xl shadow-lg border">
        <div className="flex justify-between mb-5">
          <h3 className="text-3xl">Data Karyawan</h3>

          <Button className="bg-green-600">Add</Button>
        </div>
        <div className="flex items-center justify-start mb- border-t-4 py-4">
          <Input placeholder="search..." className="w-60 " />
          {/* <Button className="bg-green-600">Print</Button> */}
        </div>
        <Table className="border">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>id</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees &&
              employees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.username}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-3">
                      <Button className="bg-orange-600">edit</Button>
                      <Button variant="destructive">delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
