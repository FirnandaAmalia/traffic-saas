import type {
  ReportData,
} from "./report-types";



function escapeCSV(
  value: unknown
): string {

  const text =
    String(value ?? "");


  if (
    text.includes(",") ||
    text.includes("\"") ||
    text.includes("\n")
  ) {

    return `"${text.replace(
      /"/g,
      '""'
    )}"`;

  }


  return text;

}



function addSection(
  rows: unknown[][],
  title:string
){

  rows.push([]);

  rows.push([
    `=== ${title} ===`
  ]);

}




function addRows(
  rows:unknown[][],
  data:unknown[][]
){

  data.forEach(
    item =>
      rows.push(item)
  );

}




function formatPercent(
 value:number|null
){

  if(value === null){
    return "-";
  }

  return `${value}%`;

}




export function buildCSV(
  report: ReportData
): string {


  const rows:
    unknown[][] = [];



  /*
  |--------------------------------------------------------------------------
  | REPORT INFO
  |--------------------------------------------------------------------------
  */


  rows.push([

    "TrafficSaaS SEO Intelligence Report"

  ]);


  rows.push([

    "Project",
    report.projectName

  ]);


  rows.push([

    "Website",
    report.website

  ]);


  rows.push([

    "Period",
    report.period.label

  ]);



  /*
  |--------------------------------------------------------------------------
  | SUMMARY METRICS
  |--------------------------------------------------------------------------
  */


  addSection(
    rows,
    "SUMMARY METRICS"
  );


  addRows(
    rows,
    [

      [
        "Metric",
        "Current",
        "Previous",
        "Change"
      ],


      [
        "Clicks",

        report.metrics.clicks.value,

        report.metrics.clicks.previousValue,

        formatPercent(
          report.metrics.clicks.change
        ),

      ],


      [
        "Impressions",

        report.metrics.impressions.value,

        report.metrics.impressions.previousValue,

        formatPercent(
          report.metrics.impressions.change
        ),

      ],



      [
        "Users",

        report.metrics.users.value,

        report.metrics.users.previousValue,

        formatPercent(
          report.metrics.users.change
        ),

      ],



      [
        "Sessions",

        report.metrics.sessions.value,

        report.metrics.sessions.previousValue,

        formatPercent(
          report.metrics.sessions.change
        ),

      ],


      [
        "Page Views",

        report.metrics.pageViews.value,

        report.metrics.pageViews.previousValue,

        formatPercent(
          report.metrics.pageViews.change
        ),

      ],


      [
        "Engagement Rate",

        `${(
          report.metrics.engagementRate.value * 100
        ).toFixed(2)}%`,

        `${(
          report.metrics.engagementRate.previousValue * 100
        ).toFixed(2)}%`,

        formatPercent(
          report.metrics.engagementRate.change
        ),

      ],

    ]
  );


/*
|--------------------------------------------------------------------------
| KEYWORD INTELLIGENCE
|--------------------------------------------------------------------------
*/


addSection(
  rows,
  "KEYWORD INTELLIGENCE"
);


addRows(
 rows,

 [

 [
  "Keyword",
  "Category",
  "Intent",
  "Business Value",
  "Visibility",
  "Clicks",
  "Impressions",
  "CTR",
  "Score",
  "Opportunity",
  "Reason",
  "Recommendation"
 ],


 ...report.keywordOpportunities.map(
 item=>[

  item.keyword,

  item.category,

  item.intent,

  item.businessValue,

  item.visibilityStatus,

  item.clicks,

  item.impressions,

  `${item.ctr}%`,

  item.score,

  item.opportunity,

  item.reason,

  item.recommendation,

 ]

 )

 ]

);

/*
|--------------------------------------------------------------------------
| CONTENT INTELLIGENCE
|--------------------------------------------------------------------------
*/


addSection(
 rows,
 "CONTENT INTELLIGENCE"
);


addRows(
 rows,

 [

 [
  "Page",
  "Clicks",
  "Impressions",
  "CTR",
  "Score",
  "Priority",
  "Issue",
  "Impact",
  "Recommendation"
 ],


 ...report.contentOpportunities.map(
 item=>[

 item.page,

 item.clicks,

 item.impressions,

 `${item.ctr}%`,

 item.score,

 item.priority,

 item.issue,

 item.impact,

 item.recommendation,

 ]

 )

 ]

);

/*
|--------------------------------------------------------------------------
| AI STRATEGY
|--------------------------------------------------------------------------
*/


addSection(
 rows,
 "AI STRATEGY"
);


addRows(
 rows,

 [

 [
  "Priority",
  "Type",
  "Title",
  "Impact",
  "Recommendation"
 ],



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

  /*
  |--------------------------------------------------------------------------
  | TRAFFIC SOURCE
  |--------------------------------------------------------------------------
  */


  addSection(
    rows,
    "TRAFFIC ACQUISITION"
  );


  rows.push([

    "Channel",
    "Sessions"

  ]);


  report.trafficAcquisition.forEach(
    item => {

      rows.push([

        item.channel,

        item.sessions,

      ]);

    }
  );




  /*
  |--------------------------------------------------------------------------
  | COUNTRY
  |--------------------------------------------------------------------------
  */


  addSection(
    rows,
    "COUNTRY"
  );


  rows.push([

    "Country",
    "Users"

  ]);


  report.country.forEach(
    item=>{

      rows.push([

        item.country,

        item.users,

      ]);

    }
  );




  /*
  |--------------------------------------------------------------------------
  | DEVICE
  |--------------------------------------------------------------------------
  */


  addSection(
    rows,
    "DEVICE CATEGORY"
  );


  rows.push([

    "Device",
    "Users"

  ]);


  report.deviceCategory.forEach(
    item=>{

      rows.push([

        item.device,

        item.users,

      ]);

    }
  );




  /*
  |--------------------------------------------------------------------------
  | LANDING PAGES
  |--------------------------------------------------------------------------
  */


  addSection(
    rows,
    "LANDING PAGES"
  );


  rows.push([

    "Page",
    "Sessions"

  ]);


  report.landingPages.forEach(
    item=>{

      rows.push([

        item.page,

        item.sessions,

      ]);

    }
  );





  /*
  |--------------------------------------------------------------------------
  | EVENTS
  |--------------------------------------------------------------------------
  */


  addSection(
    rows,
    "EVENTS"
  );


  rows.push([

    "Event",
    "Count"

  ]);


  report.topEvents.forEach(
    item=>{

      rows.push([

        item.event,

        item.count,

      ]);

    }
  );





  const csv =

    rows

      .map(
        row =>

          row
            .map(
              escapeCSV
            )
            .join(",")

      )

      .join("\n");




  return (
    "\uFEFF" +
    csv
  );

}