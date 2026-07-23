-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "provider" TEXT NOT NULL DEFAULT 'MANUAL',
    "paymentMethod" TEXT,
    "proofUrl" TEXT,
    "confirmedAt" DATETIME,
    "confirmedBy" TEXT,
    "transactionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportSummary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "businessCondition" TEXT,
    "mainRisk" TEXT,
    "mainOpportunity" TEXT,
    CONSTRAINT "ReportSummary_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "current" REAL NOT NULL,
    "previous" REAL,
    "change" REAL,
    CONSTRAINT "ReportMetric_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportKeyword" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL,
    "impressions" INTEGER NOT NULL,
    "ctr" REAL NOT NULL,
    "position" REAL,
    "score" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "intent" TEXT,
    "businessValue" TEXT,
    "opportunity" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    CONSTRAINT "ReportKeyword_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportInsight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    CONSTRAINT "ReportInsight_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportAction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reportId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "tasks" TEXT NOT NULL,
    CONSTRAINT "ReportAction_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "fileUrl" TEXT,
    "seoScore" INTEGER,
    "seoStatus" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Report_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("createdAt", "fileUrl", "id", "period", "projectId", "title") SELECT "createdAt", "fileUrl", "id", "period", "projectId", "title" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
CREATE INDEX "Report_projectId_idx" ON "Report"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportSummary_reportId_key" ON "ReportSummary"("reportId");

-- CreateIndex
CREATE INDEX "ReportMetric_reportId_idx" ON "ReportMetric"("reportId");

-- CreateIndex
CREATE INDEX "ReportKeyword_reportId_idx" ON "ReportKeyword"("reportId");

-- CreateIndex
CREATE INDEX "ReportInsight_reportId_idx" ON "ReportInsight"("reportId");

-- CreateIndex
CREATE INDEX "ReportAction_reportId_idx" ON "ReportAction"("reportId");
