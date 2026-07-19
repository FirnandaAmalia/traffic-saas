import ExcelJS from "exceljs";

import type {
  ReportData,
} from "./report-types";



function formatPercent(
  value:number | null
){

  if(value === null){
    return "-";
  }

  return `${value}%`;

}





function styleSheet(
  worksheet:ExcelJS.Worksheet
){

  worksheet.views = [
    {
      state:"frozen",
      ySplit:1,
    },
  ];



  const header =
    worksheet.getRow(1);



  header.font = {
    bold:true,
    color:{
  argb:"FFFFFFFF",
},
  };



  header.fill = {
    type:"pattern",
    pattern:"solid",
    fgColor:{
  argb:"FF2563EB",
},
  };



  header.alignment = {
    horizontal:"center",
    vertical:"middle",
  };



  header.height = 22;



  header.eachCell(
    cell=>{

      cell.border = {
        top:{
          style:"thin",
        },
        bottom:{
          style:"thin",
        },
      };

    }
  );



  worksheet.autoFilter = {

    from:{
      row:1,
      column:1,
    },

    to:{
      row:1,
      column:
        worksheet.columnCount,
    },

  };




  worksheet.columns.forEach(
    column=>{

      let maxLength = 10;


      if (column.eachCell) {

  column.eachCell(
    {
      includeEmpty:true,
    },

    cell=>{

      const length =
        String(
          cell.value ?? ""
        ).length;


      if(length > maxLength){
        maxLength = length;
      }

    }
  );

}


      column.width =
        Math.min(
          Math.max(
            maxLength + 3,
            15
          ),
          45
        );


    }
  );


}

function addTable(
  worksheet: ExcelJS.Worksheet,
  headers:string[],
  rows:unknown[][]
){

  worksheet.addRow(headers);


  rows.forEach(
    row =>
      worksheet.addRow(row)
  );


  worksheet.autoFilter = {

    from:{
      row:1,
      column:1,
    },

    to:{
      row:
        rows.length + 1,

      column:
        headers.length,
    },

  };


  styleSheet(
    worksheet
  );

}

export async function buildExcel(
 report:ReportData
):Promise<Buffer>{



 const workbook =
 new ExcelJS.Workbook();



 workbook.creator =
 "TrafficSaaS";


 workbook.title =
 "SEO Intelligence Report";


 workbook.subject =
 "SEO Analytics Export";


 workbook.created =
 new Date();

/*
|--------------------------------------------------------------------------
| Executive Overview
|--------------------------------------------------------------------------
*/


const summary =
 workbook.addWorksheet(
  "Executive Overview"
);



summary.addRows([


[
"TrafficSaaS SEO Intelligence Report"
],


[],


[
"Informasi Website"
],


[
"Nama Project",
report.projectName,
],


[
"Website",
report.website,
],


[
"Periode Analisis",
report.period.label,
],


[
"Dibuat Pada",
report.generatedAt,
],


[],


[
"Kondisi SEO"
],


[
"SEO Health Score",
`${report.seoHealthScore.score}/100`,
],


[
"Status SEO",
report.seoHealthScore.status,
],


[
"Kondisi Bisnis",
report.summary.businessCondition,
],


[],


[
"Risiko Utama"
],


[
report.summary.mainRisk ?? 
report.businessImpact.risks[0] ??
"-",
],


[],


[
"Peluang Utama"
],


[
report.summary.mainOpportunity ??
"-",
],


[],


[
"Dampak Bisnis"
],


[
report.businessImpact.summary,
],


[],


[
"Rekomendasi Strategis AI"
],


[
report.summary.executiveRecommendation,
],


[],


[
"Ringkasan AI"
],


[
report.summary.overview,
],


]);




summary.mergeCells(
"A1:B1"
);



summary.getCell(
"A1"
).font={

bold:true,

size:16,

color:{
argb:"FFFFFFFF"
}

};



summary.getCell(
"A1"
).fill={

type:"pattern",

pattern:"solid",

fgColor:{
argb:"FF2563EB"
}

};



summary.getCell(
"A1"
).alignment={

horizontal:"center"

};




summary.columns=[

{
width:35,
},

{
width:100,
},

];




summary.eachRow(
(row,index)=>{

row.alignment={

vertical:"top",

wrapText:true,

};


if(index !== 1){

row.height=25;

}


}
);
 /*
 |--------------------------------------------------------------------------
 | Metrics
 |--------------------------------------------------------------------------
 */


 const metrics =
 workbook.addWorksheet(
 "Metrics"
 );


 addTable(

 metrics,


 [
  "Metric",
  "Current",
  "Previous",
  "Change",
 ],



 [

 [
 "Clicks",
 report.metrics.clicks.value,
 report.metrics.clicks.previousValue,
 formatPercent(report.metrics.clicks.change),
 ],


 [
 "Impressions",
 report.metrics.impressions.value,
 report.metrics.impressions.previousValue,
 formatPercent(report.metrics.impressions.change),
 ],


 [
 "Users",
 report.metrics.users.value,
 report.metrics.users.previousValue,
 formatPercent(report.metrics.users.change),
 ],


 [
 "Sessions",
 report.metrics.sessions.value,
 report.metrics.sessions.previousValue,
 formatPercent(report.metrics.sessions.change),
 ],


 [
 "Page Views",
 report.metrics.pageViews.value,
 report.metrics.pageViews.previousValue,
 formatPercent(report.metrics.pageViews.change),
 ],


 ]

 );


 /*
 |--------------------------------------------------------------------------
 | Keywords Intelligence
 |--------------------------------------------------------------------------
 */


 const keywords =
 workbook.addWorksheet(
 "Keywords"
 );


 addTable(

 keywords,

 [
 "Keyword",
 "Clicks",
 "Impressions",
 "CTR",
 "Score",
 "Opportunity",
 "Recommendation",
 ],


 report.keywordOpportunities
 .filter(
 item=>
 item.category !== "SENSITIVE"
 )
 .map(
 item=>[

 item.keyword,
 item.clicks,
 item.impressions,
 `${item.ctr}%`,
 item.score,
 item.opportunity,
 item.recommendation,

 ]
 )

 );








 /*
 |--------------------------------------------------------------------------
 | Content Opportunity
 |--------------------------------------------------------------------------
 */


 const pages =
 workbook.addWorksheet(
 "Pages"
 );


 addTable(

 pages,


 [
 "Page",
 "Clicks",
 "Impressions",
 "CTR",
 "Priority",
 "Issue",
 "Recommendation",
 ],



 report.contentOpportunities.map(
 item=>[

 item.page,
 item.clicks,
 item.impressions,
 `${item.ctr}%`,
 item.priority,
 item.issue,
 item.recommendation,

 ]
 )

 );







 /*
 |--------------------------------------------------------------------------
 | GSC Raw Data
 |--------------------------------------------------------------------------
 */
 const gsc =
 workbook.addWorksheet(
 "GSC History"
 );


 addTable(

 gsc,


 [
 "Date",
 "Clicks",
 "Impressions",
 "CTR",
 "Position",
 ],



 report.gscHistory.map(
 row=>[

 row.keys?.[0] ?? "",
 row.clicks ?? 0,
 row.impressions ?? 0,
 `${((row.ctr ?? 0)*100).toFixed(2)}%`,
 row.position ?? 0,

 ]
 )

 );

 /*
 |--------------------------------------------------------------------------
 | GA4 History
 |--------------------------------------------------------------------------
 */

const ga4 =
 workbook.addWorksheet(
 "GA4 History"
 );


addTable(

 ga4,


 [
 "Date",
 "Users",
 "Sessions",
 ],


 report.ga4History.map(
 row=>[

 row.dimensionValues?.[0]?.value ?? "",

 row.metricValues?.[0]?.value ?? 0,

 row.metricValues?.[1]?.value ?? 0,

 ]
 )

);
 /*
 |--------------------------------------------------------------------------
 | Acquisition
 |--------------------------------------------------------------------------
 */


 const acquisition =
 workbook.addWorksheet(
 "Acquisition"
 );


 addTable(

 acquisition,


 [
 "Channel",
 "Sessions",
 ],



 report.trafficAcquisition.map(
 item=>[

 item.channel,
 item.sessions,

 ]
 )

 );








 /*
 |--------------------------------------------------------------------------
 | Audience
 |--------------------------------------------------------------------------
 */


 const audience =
 workbook.addWorksheet(
 "Audience"
 );


 addTable(

 audience,

 [
 "Country",
 "Users",
 ],


 report.country.map(
 item=>[

 item.country,
 item.users,

 ]
 )

 );








 /*
 |--------------------------------------------------------------------------
 | Devices
 |--------------------------------------------------------------------------
 */


 const devices =
 workbook.addWorksheet(
 "Devices"
 );


 addTable(

 devices,


 [
 "Device",
 "Users",
 ],


 report.deviceCategory.map(
 item=>[

 item.device,
 item.users,

 ]
 )

 );








 /*
 |--------------------------------------------------------------------------
 | Browser
 |--------------------------------------------------------------------------
 */


 const browser =
 workbook.addWorksheet(
 "Browser"
 );


 addTable(

 browser,


 [
 "Browser",
 "Users",
 ],


 report.browser.map(
 item=>[

 item.browser,
 item.users,

 ]
 )

 );








 /*
 |--------------------------------------------------------------------------
 | Landing Pages
 |--------------------------------------------------------------------------
 */


 const landing =
 workbook.addWorksheet(
 "Landing Pages"
 );


 addTable(

 landing,


 [
 "Page",
 "Sessions",
 ],


 report.landingPages.map(
 item=>[

 item.page,
 item.sessions,

 ]
 )

 );

/*
|--------------------------------------------------------------------------
| AI Strategy Intelligence
|--------------------------------------------------------------------------
*/

const aiStrategy =
 workbook.addWorksheet(
 "AI Strategy"
 );


addTable(

 aiStrategy,


 [
 "Prioritas",
 "Kategori",
 "Masalah",
 "Dampak Bisnis",
 "Rekomendasi",
 ],



 [

 ...report.aiInsights.map(
 insight=>[

 insight.priority,

 "SEO Insight",

 insight.title,

 insight.impact,

 insight.recommendation,

 ]

 ),



 ...report.actionPlan.map(
 plan=>[

 plan.period,

 "Action Plan",

 plan.objective,

 plan.reason,

 plan.tasks.join(
 " | "
 ),

 ]

 )


 ]

);

 return Buffer.from(
  await workbook.xlsx.writeBuffer()
 );


}
