"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WorkspaceFormProps {
  projectId: string;
  projectName: string;
  domain: string | null;
}

export default function WorkspaceForm({
  projectId,
  projectName,
  domain,
}: WorkspaceFormProps) {
  const router = useRouter();

  const [name, setName] =
    useState(projectName);

  const [website, setWebsite] =
    useState(domain ?? "");

  const [loading, setLoading] =
    useState(false);

  async function handleSave() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/project/update",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              projectId,
              projectName: name,
              domain: website,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      router.refresh();

      toast.success("Workspace updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-500">
          Workspace Name
        </label>

        <Input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-500">
          Domain
        </label>

        <Input
          value={website}
          placeholder="example.com"
          onChange={(e) =>
            setWebsite(e.target.value)
          }
        />
      </div>

      <div className="flex justify-end">

        <Button
          onClick={handleSave}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </Button>

      </div>

    </div>
  );
}