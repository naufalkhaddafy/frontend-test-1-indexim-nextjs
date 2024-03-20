import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ModalAddEmployee({
  onChange,
  addEmployee,
  openAdd,
  setOpenAdd,
}) {
  return (
    <Dialog open={openAdd} onOpenChange={setOpenAdd}>
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
              <Label htmlFor="nrp" className="">
                NRP
              </Label>
              <Input
                id="nrp"
                name="nrp"
                type="nrp"
                placeholder="Input your nrp"
                className="col-span-3"
                onChange={onChange}
              />
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="department" className="">
                Departement
              </Label>
              <Input
                id="department"
                name="department"
                type="department"
                placeholder="Input your department"
                className="col-span-3"
                onChange={onChange}
              />
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="position" className="">
                Position
              </Label>
              <Input
                id="position"
                name="position"
                type="position"
                placeholder="Input your position"
                className="col-span-3"
                onChange={onChange}
              />
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="shift_id" className="">
                Shift
              </Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue
                    id="shift_id"
                    name="shift_id"
                    type="shift_id"
                    placeholder="Input your Shift"
                    className="col-span-3"
                    onChange={onChange}
                  />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="1">Office</SelectItem>
                  <SelectItem value="2">Vocation</SelectItem>
                  <SelectItem value="3">System</SelectItem> */}
                </SelectContent>
              </Select>
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
  );
}
