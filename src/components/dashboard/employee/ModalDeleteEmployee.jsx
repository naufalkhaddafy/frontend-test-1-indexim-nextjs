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
import { useRouter } from "next/navigation";

export default function ModalDeleteEmployee({ employee }) {
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

  async function deleteEmployee(id) {
    axios
      .delete(`${process.env.NEXT_PUBLIC_URL}/api/user/${id}/delete`, {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((res) => {
        router.refresh();
        setOpenDelete(false);
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
    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
      <AlertDialogTrigger>
        <button>Hapus</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Karyawan</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda ingin menghapus data karyawan? {employee}
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
