"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

import {
  FEATURES,
  hasFeature,
} from "@/lib/features";

import {
  PLANS,
} from "@/lib/plan";

import { goToBilling } from "@/lib/upgrade";

interface CreateProjectDialogProps {
  plan: keyof typeof PLANS;
  projectCount: number;
}

export default function CreateProjectDialog({
  plan,
  projectCount,
}: CreateProjectDialogProps) {
  const router = useRouter();

  const [projectName, setProjectName] =
    useState("");

  const [domain, setDomain] =
    useState("");

  const [loading, setLoading] =
    useState(false);

const canCreateMoreProjects = hasFeature(
  plan,
  FEATURES.UNLIMITED_PROJECT
);

  const [showUpgrade, setShowUpgrade] =
  useState(false);

  async function handleCreate() {
    if (!projectName.trim()) {
      alert("Project name wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "/api/project/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            projectName,

            domain:
              domain.trim() || null,
          }),
        }
      );

      const data =
        await res.json();

      if (!data.success) {

  if (
    data.code === "FREE_PLAN_LIMIT"
  ) {
    setShowUpgrade(true);
    return;
  }

  alert(data.error);
  return;
}

      setProjectName("");
setDomain("");

router.push(
  `/setup/gsc?projectId=${data.project.id}`
);

    } catch (err) {
      console.error(err);

      alert(
        "Gagal membuat project."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <Dialog>

      <DialogTrigger asChild>
  <Button
    onClick={(e) => {
      if (
        !canCreateMoreProjects &&
        projectCount >= 1
      ) {
        e.preventDefault();
        setShowUpgrade(true);
      }
    }}
  >
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
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Domain (Optional)"
            value={domain}
            onChange={(e) =>
              setDomain(
                e.target.value
              )
            }
          />

          <Button
            onClick={handleCreate}
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Creating..."
              : "Create Project"}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
    <Dialog
  open={showUpgrade}
  onOpenChange={setShowUpgrade}
>

  <DialogContent>

    <DialogHeader>

      <DialogTitle className="flex items-center gap-2">

        <Lock className="h-5 w-5 text-violet-600" />

        Upgrade to Pro

      </DialogTitle>

    </DialogHeader>

    <div className="space-y-4">

      <p className="text-sm text-slate-600">

        Free Plan hanya mendukung
        <strong> 1 Project</strong>.

      </p>

      <p className="text-sm text-slate-500">

        Upgrade ke Pro untuk membuat
        project tanpa batas.

      </p>

      <Button
  className="w-full"
  onClick={goToBilling}
>
  Upgrade to Pro
</Button>

    </div>

  </DialogContent>

</Dialog>
</>

    
  );
}