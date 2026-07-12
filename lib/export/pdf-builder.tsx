import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import {
  buildClicksChartData,
  buildUsersChartData,
} from "@/lib/charts/chart-data";

import {
  buildLineChartUrl,
} from "@/lib/charts/quickchart";

import type {
  ReportData,
} from "./report-types";

import {
  formatMetric,
  formatChange,
} from "./format";

const styles = StyleSheet.create({
  chartSection: {
  marginBottom: 28,
},

chartTitle: {
  fontSize: 12,
  marginBottom: 8,
  fontWeight: "bold",
},
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },

  chart: {
  width: "100%",
  height: 220,
  marginBottom: 24,
  objectFit: "contain",
},

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 24,
  },

  section: {
    marginBottom: 28,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
  },

  infoLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 6,
  },

  infoValue: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },

  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  metricCard: {
    width: "48%",
    border: "1 solid #E5E7EB",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },

  metricTitle: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 4,
  },

  metricNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },

  metricChange: {
    marginTop: 8,
    fontSize: 10,
    color: "#374151",
  },

  table: {
  border: "1 solid #E5E7EB",
  borderRadius: 6,
},

tableHeader: {
  flexDirection: "row",
  backgroundColor: "#F3F4F6",
  borderBottom: "1 solid #E5E7EB",
},

tableRow: {
  flexDirection: "row",
  borderBottom: "1 solid #F3F4F6",
},

cellTitle: {
  width: "58%",
  padding: 8,
  fontSize: 10,
},

cellNumber: {
  width: "21%",
  padding: 8,
  fontSize: 10,
  textAlign: "right",
},

headerText: {
  fontWeight: "bold",
},

  opportunity: {
    marginBottom: 8,
    lineHeight: 1.5,
  },
});

export function buildPDFDocument(
  report: ReportData
) {

  const clicksChart = buildLineChartUrl(
  "Organic Clicks",
  buildClicksChartData(report.gscHistory)
);

const usersChart = buildLineChartUrl(
  "Users",
  buildUsersChartData(report.ga4History)
);

  return (
    <Document>

  {/* PAGE 1 */}

  <Page size="A4" style={styles.page}>

    <View style={styles.section}>

      <Text style={styles.title}>
        TrafficSaaS
      </Text>

      <Text style={styles.subtitle}>
        SEO Performance Report
      </Text>

      <Text style={styles.infoLabel}>
        Website
      </Text>

      <Text style={styles.infoValue}>
        {report.website}
      </Text>

      <Text style={styles.infoLabel}>
        Project
      </Text>

      <Text style={styles.infoValue}>
        {report.projectName}
      </Text>

      <Text style={styles.infoLabel}>
        Reporting Period
      </Text>

      <Text style={styles.infoValue}>
        {report.period.label}
      </Text>

      <Text>
        {report.period.startDate}
        {" - "}
        {report.period.endDate}
      </Text>

      <Text style={styles.infoLabel}>
        Generated At
      </Text>

      <Text>
        {report.generatedAt.toLocaleString()}
      </Text>

    </View>

  </Page>

  {/* PAGE 2 */}

<Page
  size="A4"
  style={styles.page}
>

  {/* ================= Top Queries ================= */}

  <View style={styles.section}>

    <Text style={styles.heading}>
      Top Search Queries
    </Text>

    <View style={styles.table}>

      <View style={styles.tableHeader}>

        <Text
          style={[
            styles.cellTitle,
            styles.headerText,
          ]}
        >
          Query
        </Text>

        <Text
          style={[
            styles.cellNumber,
            styles.headerText,
          ]}
        >
          Clicks
        </Text>

        <Text
          style={[
            styles.cellNumber,
            styles.headerText,
          ]}
        >
          Impressions
        </Text>

      </View>

      {report.topQueries
        .slice(0, 10)
        .map((row, index) => (

          <View
            key={index}
            style={styles.tableRow}
          >

            <Text style={styles.cellTitle}>
              {row.keys?.[0] ?? "-"}
            </Text>

            <Text style={styles.cellNumber}>
              {formatMetric(
                "Clicks",
                row.clicks ?? 0
              )}
            </Text>

            <Text style={styles.cellNumber}>
              {formatMetric(
                "Impressions",
                row.impressions ?? 0
              )}
            </Text>

          </View>

        ))}

    </View>

  </View>

  {/* ================= Top Pages ================= */}

  <View style={styles.section}>

    <Text style={styles.heading}>
      Top Landing Pages
    </Text>

    <View style={styles.table}>

      <View style={styles.tableHeader}>

        <Text
          style={[
            styles.cellTitle,
            styles.headerText,
          ]}
        >
          Page
        </Text>

        <Text
          style={[
            styles.cellNumber,
            styles.headerText,
          ]}
        >
          Clicks
        </Text>

        <Text
          style={[
            styles.cellNumber,
            styles.headerText,
          ]}
        >
          Impressions
        </Text>

      </View>

      {report.topPages
        .slice(0, 10)
        .map((row, index) => (

          <View
            key={index}
            style={styles.tableRow}
          >

            <Text style={styles.cellTitle}>
              {row.keys?.[0] ?? "-"}
            </Text>

            <Text style={styles.cellNumber}>
              {formatMetric(
                "Clicks",
                row.clicks ?? 0
              )}
            </Text>

            <Text style={styles.cellNumber}>
              {formatMetric(
                "Impressions",
                row.impressions ?? 0
              )}
            </Text>

          </View>

        ))}

    </View>

  </View>

</Page>

  {/* ================= PAGE 3 ================= */}

<Page
  size="A4"
  style={styles.page}
>

  {/* Executive Summary */}

  <View style={styles.section}>

    <Text style={styles.heading}>
      Executive Summary
    </Text>

    <Text>
      {report.summary.overview}
    </Text>

  </View>

  {/* SEO Health */}

  <View style={styles.section}>

    <Text style={styles.heading}>
      SEO Health
    </Text>

    <Text>
      {report.summary.seoHealth}
    </Text>

    <Text>
      Confidence Score:{" "}
      {report.summary.confidence}%
    </Text>

  </View>

  {/* KPI */}

  <View style={styles.section}>

    <Text style={styles.heading}>
      Performance Overview
    </Text>

    <View style={styles.metricGrid}>

      {Object.values(
        report.metrics
      ).map((metric) => (

        <View
          key={metric.title}
          style={styles.metricCard}
        >

          <Text style={styles.metricTitle}>
            {metric.title}
          </Text>

          <Text style={styles.metricNumber}>
            {formatMetric(
              metric.title,
              metric.value
            )}
          </Text>

          <Text style={styles.metricChange}>
            {formatChange(metric.change)}
          </Text>

        </View>

      ))}

    </View>

  </View>

  {/* Opportunities */}

  <View style={styles.section}>

    <Text style={styles.heading}>
      Biggest Opportunities
    </Text>

    {report.summary.opportunities.map(
      (item, index) => (

        <Text
          key={index}
          style={styles.opportunity}
        >
          • {item}
        </Text>

      )
    )}

  </View>

</Page>

{/* ================= PAGE 4 ================= */}

<Page
  size="A4"
  style={styles.page}
>

  <Text style={styles.heading}>
    Performance Trends
  </Text>

  <View style={styles.chartSection}>

    <Text style={styles.chartTitle}>
      Organic Clicks Trend
    </Text>

    <Image
      src={clicksChart}
      style={styles.chart}
    />

  </View>

  <View style={styles.chartSection}>

    <Text style={styles.chartTitle}>
      Users Trend
    </Text>

    <Image
      src={usersChart}
      style={styles.chart}
    />

  </View>

</Page>

</Document>
  );
}