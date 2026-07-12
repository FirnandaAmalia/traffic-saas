"use client";

import { useState } from "react";

import {
  Database,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

import ExportFormatCard from "./export-format-card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type ExportFormat =
  | "pdf"
  | "excel"
  | "csv";

interface ExportDialogProps {
  projectId: string;
  projectName: string;
}

export default function ExportDialog({
  projectId,
  projectName,
}: ExportDialogProps) {
  const [format, setFormat] =
    useState<ExportFormat>("pdf");

  const handleExport = async () => {
  try {
    let endpoint = "";

    switch (format) {
      case "pdf":
        endpoint = "/api/export/pdf";
        break;

      case "excel":
        endpoint = "/api/export/excel";
        break;

      case "csv":
        endpoint = "/api/export/csv";
        break;
    }

    const response = await fetch(
      `${endpoint}?projectId=${projectId}`
    );

    if (!response.ok) {
      throw new Error("Export failed");
    }

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    const extension =
      format === "pdf"
        ? "pdf"
        : format === "excel"
        ? "xlsx"
        : "csv";

    a.href = url;
    a.download = `${projectName}-SEO-Report.${extension}`;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

    } catch (error) {

    console.error(
      "Export failed:",
      error
    );

    alert(
      "Failed to export report."
    );

  }
};

return (
  <Dialog>

    <DialogTrigger asChild>

      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>

    </DialogTrigger>

    <DialogContent className="max-w-2xl">

      <DialogHeader>

        <DialogTitle>
          Export Report
        </DialogTitle>

        <DialogDescription>
          Download your SEO performance report in your preferred format.
        </DialogDescription>

      </DialogHeader>

      <div className="space-y-4">

        <ExportFormatCard
          title="PDF Report"
          description="Professional report with AI Executive Summary, KPI overview, and recommendations."
          icon={
            <FileText className="h-6 w-6 text-red-500" />
          }
          selected={format === "pdf"}
          recommended
          onClick={() =>
            setFormat("pdf")
          }
        />

        <ExportFormatCard
          title="Excel Workbook"
          description="Detailed SEO metrics for advanced analysis and reporting."
          icon={
            <FileSpreadsheet className="h-6 w-6 text-emerald-600" />
          }
          selected={format === "excel"}
          onClick={() =>
            setFormat("excel")
          }
        />

        <ExportFormatCard
          title="CSV Export"
          description="Raw SEO & Analytics data for external tools and custom processing."
          icon={
            <Database className="h-6 w-6 text-blue-600" />
          }
          selected={format === "csv"}
          onClick={() =>
            setFormat("csv")
          }
        />

      </div>

      <DialogFooter className="mt-6">

        <Button variant="outline">
          Cancel
        </Button>

        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Generate Report
        </Button>

      </DialogFooter>

    </DialogContent>

  </Dialog>
);

}