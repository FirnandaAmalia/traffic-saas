import { prisma } from "./prisma";

import type {
  ReportData,
} from "./export/report-types";



export async function getReportsByProject(
  projectId:string
){

  return prisma.report.findMany({

    where:{
      projectId,
    },

    orderBy:{
      createdAt:"desc",
    },

    include:{
      summary:true,
      metrics:true,
      keywords:true,
      insights:true,
      actions:true,
    },

  });

}





export async function createReport({

  projectId,

  title,

  period,

  fileUrl,

  data,

}:{

  projectId:string;

  title:string;

  period:string;

  fileUrl?:string;

  data?:ReportData;

}){


  return prisma.report.create({

    data:{


      projectId,


      title,


      period,


      fileUrl,



      seoScore:
        data?.seoHealthScore.score,


      seoStatus:
        data?.seoHealthScore.status,



      /*
      |--------------------------------------------------------------------------
      | Summary
      |--------------------------------------------------------------------------
      */


      summary:

        data

        ?

        {

          create:{

            overview:
              data.summary.overview,


            businessCondition:
              data.summary.businessCondition,


            mainRisk:
              data.summary.mainRisk,


            mainOpportunity:
              data.summary.mainOpportunity,

          }

        }

        :

        undefined,





      /*
      |--------------------------------------------------------------------------
      | Metrics
      |--------------------------------------------------------------------------
      */


      metrics:

      data

      ?

      {

        create:[

          {
            name:"Clicks",

            category:"GSC",

            current:
              data.metrics.clicks.value,

            previous:
              data.metrics.clicks.previousValue,

            change:
              data.metrics.clicks.change,

          },


          {
            name:"Impressions",

            category:"GSC",

            current:
              data.metrics.impressions.value,

            previous:
              data.metrics.impressions.previousValue,

            change:
              data.metrics.impressions.change,

          },


          {
            name:"Users",

            category:"GA4",

            current:
              data.metrics.users.value,

            previous:
              data.metrics.users.previousValue,

            change:
              data.metrics.users.change,

          },


          {
            name:"Sessions",

            category:"GA4",

            current:
              data.metrics.sessions.value,

            previous:
              data.metrics.sessions.previousValue,

            change:
              data.metrics.sessions.change,

          },


          {
            name:"Page Views",

            category:"GA4",

            current:
              data.metrics.pageViews.value,

            previous:
              data.metrics.pageViews.previousValue,

            change:
              data.metrics.pageViews.change,

          },


        ]

      }

      :

      undefined,





      /*
      |--------------------------------------------------------------------------
      | Keywords
      |--------------------------------------------------------------------------
      */


      keywords:

      data

      ?

      {

        create:

        data.keywordOpportunities
        .filter(
          item =>
          item.category !== "SENSITIVE"
        )
        .map(

          item=>(

          {

            keyword:
              item.keyword,


            clicks:
              item.clicks,


            impressions:
              item.impressions,


            ctr:
              item.ctr,


            score:
              item.score,


            category:
              item.category,


            intent:
              item.intent,


            businessValue:
              item.businessValue,


            opportunity:
              item.opportunity,


            recommendation:
              item.recommendation,


          }

          )

        )

      }

      :

      undefined,





      /*
      |--------------------------------------------------------------------------
      | AI Insights
      |--------------------------------------------------------------------------
      */


      insights:

      data

      ?

      {

        create:

        data.aiInsights.map(

          item=>(

          {

            title:
              item.title,


            description:
              item.description,


            priority:
              item.priority,


            impact:
              item.impact,


            recommendation:
              item.recommendation,


          }

          )

        )

      }

      :

      undefined,





      /*
      |--------------------------------------------------------------------------
      | Action Plan
      |--------------------------------------------------------------------------
      */


      actions:

      data

      ?

      {

        create:

        data.actionPlan.map(

          item=>(

          {

            period:
              item.period,


            objective:
              item.objective,


            reason:
              item.reason,


            tasks:
              JSON.stringify(
                item.tasks
              ),


          }

          )

        )

      }

      :

      undefined,



    },

  });


}





export async function deleteReport(
  reportId:string
){

  return prisma.report.delete({

    where:{
      id:reportId,
    },

  });

}