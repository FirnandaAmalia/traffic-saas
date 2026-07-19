import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
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


  page:{
    padding:40,
    fontSize:11,
    fontFamily:"Helvetica",
    backgroundColor:"#FFFFFF",
  },


  coverTitle:{
    fontSize:32,
    fontWeight:"bold",
    marginBottom:10,
  },


  coverSubtitle:{
    fontSize:16,
    color:"#64748B",
    marginBottom:30,
  },



  heading:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:14,
  },



  subHeading:{
    fontSize:13,
    fontWeight:"bold",
    marginBottom:8,
  },



  text:{
    fontSize:11,
    lineHeight:1.5,
  },



  label:{
    fontSize:10,
    color:"#64748B",
  },



  value:{
    fontSize:13,
    fontWeight:"bold",
  },



  section:{
    marginBottom:25,
  },



  cardGrid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
  },



  card:{
    width:"48%",
    border:"1 solid #E2E8F0",
    borderRadius:10,
    padding:15,
    marginBottom:12,
  },



  cardTitle:{
    fontSize:10,
    color:"#64748B",
  },



  cardValue:{
    fontSize:20,
    fontWeight:"bold",
    marginTop:5,
  },



  cardChange:{
    marginTop:5,
    fontSize:10,
  },



  scoreBox:{
    border:"1 solid #CBD5E1",
    borderRadius:12,
    padding:20,
    marginBottom:20,
  },



  score:{
    fontSize:36,
    fontWeight:"bold",
  },



  priorityHigh:{
    color:"#DC2626",
  },


  priorityMedium:{
    color:"#D97706",
  },


  priorityLow:{
    color:"#16A34A",
  },



  table:{
    border:"1 solid #E2E8F0",
  },



  tableHeader:{
    flexDirection:"row",
    backgroundColor:"#F8FAFC",
  },



  tableRow:{
    flexDirection:"row",
    borderBottom:"1 solid #E2E8F0",
  },



  cell:{
    padding:7,
    fontSize:10,
  },



  cellLarge:{
    width:"55%",
  },



  cellSmall:{
    width:"22%",
    textAlign:"right",
  },



  chart:{
    width:"100%",
    height:220,
  },



  bullet:{
    marginBottom:8,
    lineHeight:1.5,
  },

  insightCard:{
  border:"1 solid #E2E8F0",
  borderRadius:10,
  padding:15,
  marginBottom:12,
},


priority:{
  fontSize:10,
  fontWeight:"bold",
  marginBottom:6,
},


insightTitle:{
  fontSize:13,
  fontWeight:"bold",
  marginBottom:6,
},


insightText:{
  fontSize:10,
  lineHeight:1.5,
  marginBottom:5,
},

actionCard:{
border:"1 solid #E2E8F0",
borderRadius:10,
padding:15,
marginBottom:12,
},


actionTitle:{
fontSize:13,
fontWeight:"bold",
marginBottom:8,
},


actionItem:{
fontSize:10,
marginBottom:5,
},


recommendationBox:{
border:"1 solid #CBD5E1",
borderRadius:12,
padding:15,
marginTop:10,
},


chartTitle:{
fontSize:12,
fontWeight:"bold",
marginBottom:10,
},


smallText:{
fontSize:10,
color:"#64748B",
},

summaryBox:{
  border:"1 solid #CBD5E1",
  borderRadius:12,
  padding:18,
  marginTop:15,
},

businessBox:{
  border:"1 solid #E2E8F0",
  borderRadius:12,
  padding:18,
  marginTop:12,
},

businessTitle:{
  fontSize:14,
  fontWeight:"bold",
  marginBottom:10,
},

businessText:{
  fontSize:11,
  lineHeight:1.6,
},

coverInfo:{
  fontSize:12,
  marginTop:6,
},

sectionDescription:{
  fontSize:10,
  color:"#64748B",
  marginBottom:15,
},

summaryTitle:{
  fontSize:14,
  fontWeight:"bold",
  marginBottom:10,
},


summaryText:{
  fontSize:11,
  lineHeight:1.6,
  marginBottom:12,
},


priorityItem:{
  fontSize:10,
  lineHeight:1.5,
  marginBottom:8,
},

keywordCard:{
  border:"1 solid #E2E8F0",
  borderRadius:10,
  padding:15,
  marginBottom:12,
},


keywordHeader:{
  fontSize:13,
  fontWeight:"bold",
  marginBottom:8,
},


keywordMetric:{
  fontSize:10,
  marginBottom:5,
},


keywordTableTitle:{
  fontSize:13,
  fontWeight:"bold",
  marginBottom:10,
},


badgeHigh:{
  fontSize:10,
  fontWeight:"bold",
  color:"#DC2626",
},


badgeMedium:{
  fontSize:10,
  fontWeight:"bold",
  color:"#D97706",
},


badgeLow:{
  fontSize:10,
  fontWeight:"bold",
  color:"#16A34A",
},

businessMetric:{
fontSize:11,
marginBottom:8,
},


riskBox:{
border:"1 solid #FECACA",
borderRadius:10,
padding:15,
marginTop:10,
},


successBox:{
border:"1 solid #BBF7D0",
borderRadius:10,
padding:15,
marginTop:10,
},


roadmapTitle:{
fontSize:14,
fontWeight:"bold",
marginBottom:8,
},


keywordMeta:{
fontSize:9,
color:"#64748B",
marginBottom:5,
},

});

/*
|--------------------------------------------------------------------------
| Reusable Table Component
|--------------------------------------------------------------------------
*/


function Table({
  headers,
  rows,
}:{
  headers:string[];
  rows:string[][];
}){


  return (

    <View style={styles.table}>


      <View style={styles.tableHeader}>


        {
          headers.map(
            (item,index)=>(

              <Text
                key={index}
                style={[
                  styles.cell,
                  index === 0
                    ? styles.cellLarge
                    : styles.cellSmall
                ]}
              >

                {item}

              </Text>

            )
          )
        }


      </View>





      {
        rows.map(
          (row,index)=>(

            <View
              key={index}
              style={styles.tableRow}
            >


              {
                row.map(
                  (cell,i)=>(

                    <Text
                      key={i}
                      style={[
                        styles.cell,
                        i === 0
                          ? styles.cellLarge
                          : styles.cellSmall
                      ]}
                    >

                      {cell}

                    </Text>

                  )
                )
              }


            </View>

          )
        )
      }



    </View>

  );

}

function ActionPlanCard({
period,
objective,
reason,
tasks,
}:{
period:string;
objective:string;
reason:string;
tasks:string[];
}){

return (

<View style={styles.actionCard}>

<Text style={styles.smallText}>
Mengapa ini penting:
</Text>

<Text style={styles.actionItem}>
{reason}
</Text>

<Text style={styles.actionTitle}>
{period}
</Text>


<Text>
{objective}
</Text>


<View
style={{
marginTop:8
}}
>

{
tasks.map(
(task,index)=>(

<Text
key={index}
style={styles.actionItem}
>
• {task}
</Text>

))
}

</View>


</View>

);

}

function KeywordOpportunityCard({
keyword,
clicks,
impressions,
ctr,
opportunity,
recommendation,
}:{
keyword:string;
clicks:number;
impressions:number;
ctr:number;
opportunity:
"HIGH"
|
"MEDIUM"
|
"LOW";
recommendation:string;
}){


return (

<View style={styles.keywordCard}>


<Text style={styles.keywordHeader}>
{keyword}
</Text>



<Text style={styles.keywordMeta}>
Peluang Keyword Organik
</Text>


<Text style={styles.keywordMetric}>
Klik:
{" "}
{clicks.toLocaleString()}
</Text>


<Text style={styles.keywordMetric}>
Tampilan:
{" "}
{impressions.toLocaleString()}
</Text>


<Text style={styles.keywordMetric}>
CTR:
{" "}
{ctr}%
</Text>



<Text
style={
opportunity==="HIGH"
?
styles.badgeHigh
:
opportunity==="MEDIUM"
?
styles.badgeMedium
:
styles.badgeLow
}
>

{
opportunity === "HIGH"
?
"PELUANG TINGGI"
:
opportunity === "MEDIUM"
?
"PELUANG MENENGAH"
:
"MONITOR"
}

</Text>



<Text
style={{
marginTop:8,
fontSize:10,
lineHeight:1.5
}}
>

Strategi:
{" "}
{recommendation}

</Text>



</View>

);

}

/*
|--------------------------------------------------------------------------
| PDF Builder
|--------------------------------------------------------------------------
*/
function translateMetric(
title:string
){

const map:any={

"Clicks":
"Klik Organik",

"Impressions":
"Tampilan Google",

"Users":
"Pengguna",

"Sessions":
"Sesi Kunjungan",

"Page Views":
"Halaman Dilihat",

"Engagement Rate":
"Tingkat Interaksi",

};


return map[title] ?? title;

}

export function buildPDFDocument(
  report:ReportData
){


  const clicksChart =
    buildLineChartUrl(
      "Organic Clicks",
      buildClicksChartData(
        report.gscHistory
      )
    );



  const usersChart =
    buildLineChartUrl(
      "Users",
      buildUsersChartData(
        report.ga4History
      )
    );

    const visibleKeywordOpportunities =
  report.keywordOpportunities
    .filter(
      (item) =>
        item.category !== "SENSITIVE"
    )
    .sort(
      (a,b)=>{

        const priority = {
          HIGH:3,
          MEDIUM:2,
          LOW:1,
        };

        return (
          priority[b.opportunity]
          -
          priority[a.opportunity]
        );

      }
    );

    const commercialKeywordOpportunities =
report.keywordOpportunities
.filter(
(item)=>
item.category === "COMMERCIAL"
)
.sort(
(a,b)=>
b.score - a.score
);

  return (

    <Document>


      {/* ======================================================
PAGE 1
PREMIUM COVER
====================================================== */}


<Page
 size="A4"
 style={styles.page}
 wrap
>

  <Text
fixed
style={{
position:"absolute",
bottom:20,
left:40,
fontSize:9,
color:"#94A3B8"
}}
>
TrafficSaaS AI SEO Engine • Confidential Report
</Text>


<View
  style={{
    marginTop:80,
  }}
>


<Text style={styles.coverTitle}>
TrafficSaaS
</Text>


<Text style={styles.coverSubtitle}>
Laporan Analisis SEO & Pertumbuhan Website
</Text>



<View
  style={{
    marginTop:40,
    marginBottom:40,
  }}
>

<Text style={styles.label}>
Disiapkan untuk
</Text>


<Text
  style={{
    fontSize:22,
    fontWeight:"bold",
    marginTop:8,
  }}
>
{report.projectName}
</Text>


<Text
  style={{
    fontSize:12,
    marginTop:6,
  }}
>
{report.website}
</Text>


</View>





<View
style={{
  borderTop:"1 solid #E2E8F0",
  paddingTop:20,
}}
>

<Text style={styles.label}>
Periode Analisis
</Text>

<Text style={styles.value}>
{report.period.label}
</Text>



<Text
style={{
  marginTop:5,
  fontSize:11,
}}
>
{report.period.startDate}
{" - "}
{report.period.endDate}
</Text>



</View>






<View
style={{
  marginTop:80,
}}
>

<Text
style={{
fontSize:12,
color:"#64748B",
}}
>
Dibuat oleh
</Text>

<Text
style={{
  fontSize:14,
  fontWeight:"bold",
  marginTop:5,
}}
>
TrafficSaaS AI SEO Engine
</Text>

<Text
style={{
  fontSize:10,
  marginTop:20,
  color:"#94A3B8",
}}
>
Laporan Analisis Bisnis
</Text>



</View>





</View>


</Page>


{/* ======================================================
PAGE 2
EXECUTIVE DASHBOARD
====================================================== */}


<Page
  size="A4"
  style={styles.page}
>

<Text style={styles.heading}>
Dashboard Performa SEO
</Text>

<Text
style={{
  fontSize:11,
  color:"#64748B",
  marginBottom:20,
}}
>Ringkasan kondisi website, pertumbuhan traffic, visibilitas Google, dan peluang peningkatan bisnis berdasarkan data terbaru.
</Text>

{/* SEO HEALTH SCORE */}

<View style={styles.scoreBox}>

<Text style={styles.subHeading}>
SEO Health Score
</Text>



<Text style={styles.score}>
{report.seoHealthScore.score}/100
</Text>



<Text
style={{
  fontSize:12,
  marginTop:5,
}}
>
Status:
{" "}
{report.seoHealthScore.status}
</Text>



<View
style={{
  marginTop:20,
}}
>

<Text style={styles.text}>
Pertumbuhan Traffic:
{" "}
{report.seoHealthScore.trafficScore}/100
</Text>


<Text style={styles.text}>
Performa Konten:
{" "}
{report.seoHealthScore.contentScore}/100
</Text>


<Text style={styles.text}>
Visibilitas Google:
{" "}
{report.seoHealthScore.visibilityScore}/100
</Text>


<Text style={styles.text}>
Interaksi Pengguna:
{" "}
{report.seoHealthScore.engagementScore}/100
</Text>


</View>


</View>





{/* KPI CARDS */}

<Text style={styles.subHeading}>
Performance Overview
</Text>



<View style={styles.cardGrid}>


{
Object.values(report.metrics)
.map(
(metric)=>(


<View
key={translateMetric(metric.title)}
style={styles.card}
>


<Text style={styles.cardTitle}>
{translateMetric(metric.title)}
</Text>


<Text style={styles.cardValue}>
{
formatMetric(
metric.title,
metric.value
)
}
</Text>

<Text style={styles.cardChange}>

{
metric.change === null
?
"Belum ada pembanding"
:
formatChange(metric.change)
}

</Text>

</View>


)

)
}



</View>


{/* BUSINESS SUMMARY */}

<View
style={styles.summaryBox}
wrap={false}
>

<Text style={styles.summaryTitle}>
AI Business Summary
</Text>


<Text style={styles.summaryText}>
{report.summary.overview}
</Text>


<Text style={styles.summaryTitle}>
Prioritas Pertumbuhan Berikutnya
</Text>


{
report.summary.recommendations.map(
(item,index)=>(

<Text
key={index}
style={styles.priorityItem}
>
{index + 1}. {item}
</Text>

))
}


</View>

{/* BUSINESS DIAGNOSIS */}

<View
style={styles.summaryBox}
wrap={false}
>

<Text style={styles.summaryTitle}>
Business Diagnosis
</Text>

<View
style={styles.businessBox}
wrap={false}
>

<Text style={styles.businessTitle}>
Dampak Terhadap Bisnis
</Text>


<Text style={styles.businessText}>

{
report.trafficDiagnosis.weaknesses.length > 0

?

"Penurunan performa organik dapat mengurangi peluang mendapatkan pengunjung potensial dari Google. Fokus utama adalah mempertahankan halaman yang sudah memiliki potensi traffic dan memperbaiki area yang mengalami penurunan."

:

"Performa SEO berjalan stabil. Fokus berikutnya adalah memperbesar jangkauan keyword dan meningkatkan kontribusi traffic terhadap pertumbuhan bisnis."

}

</Text>

</View>

<Text style={styles.summaryText}>
{report.trafficDiagnosis.situation}
</Text>



<Text style={styles.summaryTitle}>
Current Strength
</Text>


{
report.trafficDiagnosis.strengths.map(
(item,index)=>(

<Text
key={index}
style={styles.priorityItem}
>
✓ {item}
</Text>

))
}



<Text style={styles.summaryTitle}>
Risk Area
</Text>


{
report.trafficDiagnosis.weaknesses.map(
(item,index)=>(

<Text
key={index}
style={styles.priorityItem}
>
⚠ {item}
</Text>

))
}



<Text style={styles.summaryTitle}>
Business Focus
</Text>


{
report.trafficDiagnosis.focus.map(
(item,index)=>(

<Text
key={index}
style={styles.priorityItem}
>
→ {item}
</Text>

))
}

</View>


</Page>

{/* ======================================================
PAGE BUSINESS IMPACT
====================================================== */}


<Page
size="A4"
style={styles.page}
>


<Text style={styles.heading}>
Business Impact Analysis
</Text>


<Text style={styles.sectionDescription}>
Analisis hubungan performa SEO terhadap peluang pertumbuhan bisnis.
</Text>



<View style={styles.businessBox}>


<Text style={styles.businessTitle}>
Kondisi Bisnis
</Text>


<Text style={styles.businessText}>
{report.summary.businessCondition}
</Text>


</View>



<View style={styles.riskBox}>


<Text style={styles.businessTitle}>
Risiko Utama
</Text>


<Text style={styles.businessText}>
{report.summary.mainRisk}
</Text>


</View>




<View style={styles.successBox}>


<Text style={styles.businessTitle}>
Peluang Pertumbuhan
</Text>


<Text style={styles.businessText}>
{report.summary.mainOpportunity}
</Text>


</View>



</Page>

{/* ======================================================
PAGE 3
AI SEO ANALYSIS
====================================================== */}


<Page
size="A4"
style={styles.page}
>

<Text style={styles.heading}>
Analisis AI & Rekomendasi Strategi SEO
</Text>


<Text
style={{
fontSize:11,
color:"#64748B",
marginBottom:20,
}}
>
Analisis otomatis berdasarkan perubahan traffic,
performa halaman, keyword, dan perilaku pengguna.
</Text>

{
report.aiInsights.map(
(insight,index)=>(


<View
key={index}
style={styles.insightCard}
>


<Text
style={[
styles.priority,
insight.priority==="HIGH"
?
{
color:"#DC2626"
}
:
insight.priority==="MEDIUM"
?
{
color:"#D97706"
}
:
{
color:"#16A34A"
}
]}
>

{insight.priority === "HIGH"
?
"PRIORITAS TINGGI"
:
insight.priority === "MEDIUM"
?
"PRIORITAS MENENGAH"
:
"PRIORITAS RENDAH"
}

</Text>

<Text style={styles.insightTitle}>
{insight.title}
</Text>

<Text style={styles.insightText}>

<Text
style={{
fontWeight:"bold"
}}
>
Dampak:
</Text>

{" "}
{insight.impact}

</Text>




<Text style={styles.insightText}>

<Text style={{
fontWeight:"bold"
}}>
Analisis:
</Text>

{" "}
{insight.description}

</Text>




<Text style={styles.insightText}>

<Text style={{
fontWeight:"bold"
}}>
Rekomendasi:
</Text>

{" "}
{insight.recommendation}

</Text>



</View>


)

)
}



</Page>

{/* ======================================================
PAGE 4
30 DAYS SEO ROADMAP
====================================================== */}
<Page
size="A4"
style={styles.page}
wrap
>

<Text style={styles.heading}>
Rencana Optimasi SEO 30 Hari
</Text>

<Text style={styles.sectionDescription}>
Prioritas tindakan berdasarkan dampak bisnis dan peluang traffic terbesar.
</Text>

<Text style={styles.smallText}>
Rencana implementasi berdasarkan peluang terbesar yang ditemukan oleh sistem AI.
</Text>


{
report.actionPlan.map(
(plan,index)=>(

<ActionPlanCard

key={index}

period={plan.period}

objective={plan.objective}

reason={plan.reason}

tasks={plan.tasks}

/>

))
}


</Page>

<Page
size="A4"
style={styles.page}
wrap
>

<Text style={styles.heading}>
SEO Opportunity Intelligence
</Text>


{
report.opportunities.map(
(item,index)=>(

<View
key={index}
style={styles.insightCard}
>


<Text style={styles.priority}>
{item.priority} PRIORITY
</Text>


<Text style={styles.insightTitle}>
{item.title}
</Text>


<Text style={styles.insightText}>
Impact:
{" "}
{item.impact}
</Text>


<Text style={styles.insightText}>
{item.description}
</Text>


<Text style={styles.insightText}>
Recommendation:
{" "}
{item.recommendation}
</Text>


</View>

))
}


</Page>

{/* ======================================================
PAGE 5
SEO Opportunity Intelligence
====================================================== */}

<Page
size="A4"
style={styles.page}
wrap
>


<Text style={styles.heading}>
Keyword Intelligence
</Text>


<Text style={styles.smallText}>
Analisis keyword berdasarkan Google Search Console untuk menemukan peluang peningkatan traffic organik.
</Text>



<Text
style={{
marginTop:15,
fontSize:13,
fontWeight:"bold",
}}
>
Top Keyword Opportunities
</Text>



{
  commercialKeywordOpportunities.length === 0

  ?

  <Text style={styles.text}>
    Belum ditemukan keyword dengan peluang komersial tinggi.

Namun sistem merekomendasikan:
- Evaluasi keyword dengan impression tinggi
- Optimasi halaman dengan CTR rendah
- Perkuat relevansi konten terhadap search intent pengguna
  </Text>

  :

  commercialKeywordOpportunities
  .slice(0,8)
    .map(
      (item,index)=>(

        <KeywordOpportunityCard

          key={index}

          keyword={ item.displayKeyword ?? item.keyword}

          clicks={item.clicks}

          impressions={item.impressions}

          ctr={item.ctr}

          opportunity={item.opportunity}

          recommendation={
            item.recommendation
          }

        />

      )
    )
}
</Page>

<Page
size="A4"
style={styles.page}
wrap
>

<Text style={styles.heading}>
Data Appendix
</Text>


<Text style={styles.smallText}>
Ringkasan data pendukung dari Google Search Console dan Google Analytics.
</Text>


<Text style={styles.summaryTitle}>
Total Keyword Dianalisis
</Text>


<Text style={styles.score}>
{
report.keywordOpportunities.length
}
</Text>



<Text style={styles.summaryTitle}>
Total Halaman Dianalisis
</Text>


<Text style={styles.score}>
{
report.contentOpportunities.length
}
</Text>



</Page>

    </Document>

  );

}