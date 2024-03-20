"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import nookies, { destroyCookie } from "nookies";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import ModalAddEmployee from "@/components/dashboard/employee/ModalAddEmployee";
import ModalDeleteEmployee from "@/components/dashboard/employee/ModalDeleteEmployee";
import ModalUpdateEmployee from "@/components/dashboard/employee/ModalUpdateEmployee";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function page() {
  const { toast } = useToast();
  const token = nookies.get();
  const [employees, setEmployees] = useState("");
  const [openModal, setOpenModal] = useState(false);
  // console.log(addForm);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((response) => {
        setEmployees(response.data.data);
      });
  }, []);

  const [addForm, setAddForm] = useState({
    username: "",
    name: "",
    email: "",
    nrp: "",
    image: "",
    department: "",
    position: "",
    shift_id: "",
    password: "",
  });
  console.log(addForm);
  const onChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

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
        setOpenModal(false);
        toast({
          title: "Successfully Create Employee",
          description: `Success Data ${res.data.data.name}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateEmployee(id) {
    // e.preventDefault();
    // await axios
    //   .patch(`${process.env.NEXT_PUBLIC_URL}/api/user/${id}`, addForm, {
    //     headers: {
    //       Authorization: "Bearer " + token.token,
    //     },
    //   })
    //   .then((res) => {
    //     setEmployees([...employees, res.data.data]);
    //     setOpenModal(false);
    //     toast({
    //       title: "Successfully Create Employee",
    //       description: `Success Data ${res.data.data.name}`,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        toast({
          title: "Succes Delete ",
          description: `Success Delete Data Employee ${res.data.data.name}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <div className="w-full p-6 rounded-xl shadow-lg border">
        <div className="flex justify-between mb-5">
          <h3 className="text-3xl">Data Karyawan</h3>
          <ModalAddEmployee
            onChange={onChange}
            addEmployee={addEmployee}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        </div>
        <div className="flex items-center justify-start mb- border-t-2 py-4">
          <Input placeholder="search..." className="w-60 " />
          {/* <Button className="bg-green-600">Print</Button> */}
        </div>
        <Table className="border">
          <TableCaption>A list of employees.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>NRP</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Postion</TableHead>
              <TableHead>Shift</TableHead>
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
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.shift}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-3">
                      <ModalUpdateEmployee
                        onChange={onChange}
                        updateEmployee={updateEmployee}
                        employee={employee}
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                      />
                      <ModalDeleteEmployee
                        employee={employee}
                        deleteEmployee={deleteEmployee}
                      />
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
