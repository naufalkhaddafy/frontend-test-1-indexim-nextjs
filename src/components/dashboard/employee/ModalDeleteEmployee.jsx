import { Button } from "@/components/ui/button";
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

export default function ModalDeleteEmployee({ employee, deleteEmployee }) {
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
      <AlertDialogTrigger>
        <Button className="bg-red-600">Hapus</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Karyawan</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda ingin menghapus data karyawan? {employee.name}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={(e) => deleteEmployee(employee.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
