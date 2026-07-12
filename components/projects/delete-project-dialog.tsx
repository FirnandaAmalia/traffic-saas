"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

interface DeleteProjectDialogProps {
  projectId: string;
  projectName: string;
}

export default function DeleteProjectDialog({
  projectId,
  projectName,
}: DeleteProjectDialogProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/project/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            projectId,
          }),
        }
      );

      const data =
        await res.json();

      if (!data.success) {
        alert(data.error);
        return;
      }

      router.refresh();
    } catch (err) {
      console.error(err);

      alert(
        "Gagal menghapus workspace."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>

        <Button
  variant="destructive"
  className="min-w-36"
>
  Delete Workspace
</Button>

      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Workspace
          </AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda yakin ingin
            menghapus workspace{" "}
            <strong>
              "{projectName}"
            </strong>
            ?
            <br />
            <br />
            Tindakan ini tidak dapat
            dibatalkan.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}