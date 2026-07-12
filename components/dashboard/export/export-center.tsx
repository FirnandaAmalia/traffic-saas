"use client";

import { useState } from "react";

import {
  FileText,
  FileSpreadsheet,
  Database,
  Download,
  Lock,
} from "lucide-react";

import {
  FEATURES,
  hasFeature,
} from "@/lib/features";

import {
  PLANS,
} from "@/lib/plan";

import { goToBilling } from "@/lib/upgrade";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ExportCenterProps {
  projectId: string;
}

const plan = PLANS.FREE;

const canExportPdf = hasFeature(
  plan,
  FEATURES.EXPORT_PDF
);

const canExportExcel = hasFeature(
  plan,
  FEATURES.EXPORT_EXCEL
);

function ExportCard({
  title,
  description,
  icon,
  selected,
  locked,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  locked?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-slate-200"
      } ${
        locked
          ? "cursor-not-allowed opacity-60"
          : "hover:border-blue-300"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">

        {icon}

        {locked && (
          <span className="flex items-center gap-1 rounded-full bg-violet-100 px-2 py-1 text-[10px] font-semibold text-violet-700">

            <Lock className="h-3 w-3" />

            PRO

          </span>
        )}

      </div>

      <h3 className="font-semibold">

        {title}

      </h3>

      <p className="mt-2 text-sm text-slate-500">

        {description}

      </p>

    </button>
  );
}

export default function ExportCenter({
  projectId,
}: ExportCenterProps) {
  const [format, setFormat] = useState<
    "pdf" | "xlsx" | "csv"
  >("csv");

  return (
    <Dialog>

      <DialogTrigger asChild>

        <Button>

          <Download className="mr-2 h-4 w-4" />

          Export Report

        </Button>

      </DialogTrigger>

      <DialogContent className="max-w-3xl">

        <DialogHeader>

          <DialogTitle>

            Export Center

          </DialogTitle>

        </DialogHeader>

        <div className="mt-6 grid grid-cols-2 gap-4">

          {/* PDF */}

          <ExportCard
            title="PDF Report"
            description="Executive report with charts and AI summary."
            selected={format === "pdf"}
            locked={!canExportPdf}
            onClick={() => {
              if (!canExportPdf) {
                goToBilling();
                return;
              }

              setFormat("pdf");
            }}
            icon={
              <FileText className="h-8 w-8 text-red-500" />
            }
          />

          {/* Excel */}

          <ExportCard
            title="Excel"
            description="KPI and raw performance data."
            selected={format === "xlsx"}
            locked={!canExportExcel}
            onClick={() => {
              if (!canExportExcel) {
                goToBilling();
                return;
              }

              setFormat("xlsx");
            }}
            icon={
              <FileSpreadsheet className="h-8 w-8 text-emerald-600" />
            }
          />

          {/* CSV */}

          <ExportCard
            title="CSV"
            description="Raw data for external analysis."
            selected={format === "csv"}
            onClick={() => setFormat("csv")}
            icon={
              <Database className="h-8 w-8 text-slate-600" />
            }
          />

        </div>

        <div className="mt-8 flex justify-end">

          {format === "csv" ? (

            <Button>

              Generate CSV

            </Button>

          ) : (

            <Button
              onClick={goToBilling}
              className="bg-gradient-to-r from-violet-600 to-blue-600"
            >

              Upgrade to Pro

            </Button>

          )}

        </div>

      </DialogContent>

    </Dialog>
  );
}