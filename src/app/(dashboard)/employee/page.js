"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import nookies from "nookies";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/toaster";

export default function page() {
  const [employees, setEmployees] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [addForm, setAddForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const token = nookies.get();

  const onChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  // console.log(["form", addForm]);
  // console.log(["token", token]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user`).then((response) => {
      setEmployees(response.data.data);
    });
  }, []);

  async function addEmployee(e) {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/user`, addForm, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((res) => {
        setEmployees([...employees, res.data.data]);
        setOpen(false);
        toast({
          title: "Succes Create Employee",
          description: `Success Data ${res.data.data.name}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteEmployee(id) {
    axios
      .delete(`${process.env.NEXT_PUBLIC_URL}/api/user/${id}/delete`, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((res) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
        setOpen(false);
        toast({
          title: "Succes Delete ",
          description: `Success Delete Data Employee`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start mx-20 mt-10">
      <div className="w-full p-6 rounded-xl shadow-lg border">
        <div className="flex justify-between mb-5">
          <h3 className="text-3xl">Data Karyawan</h3>
          <Dialog open={open} onOpenChange={setOpen}>
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
          </Dialog>
        </div>
        <div className="flex items-center justify-start mb- border-t-2 py-4">
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
              <TableHead>NRP</TableHead>
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
                  <TableCell>{employee.nrp}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-3">
                      <Button className="bg-orange-600">edit</Button>
                      <Button
                        variant="destructive"
                        onClick={(e) => deleteEmployee(employee.id)}
                      >
                        delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Toaster />
    </div>
  );
}
