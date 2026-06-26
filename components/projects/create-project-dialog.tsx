"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateProjectDialog() {
  const [projectName, setProjectName] =
    useState("");

  async function handleCreate() {
    const res = await fetch(
      "/api/project/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userEmail:
            "firnandaamalia05@gmail.com",

          projectName,

          gscSiteUrl:
            "sc-domain:yaplegal.id",

          ga4PropertyId:
            "530690262",
        }),
      }
    );

    const data =
      await res.json();

    console.log(data);

    window.location.reload();
  }

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button>
          + Create Project
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Create Project
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Nama Project"
            value={projectName}
            onChange={(e) =>
              setProjectName(
                e.target.value
              )
            }
          />

          <Button
            onClick={handleCreate}
            className="w-full"
          >
            Save Project
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}