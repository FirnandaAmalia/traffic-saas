import type { ComponentProps } from "react";

import type { ExecutiveSummary } from "@/lib/ai/executive-summary";
import type { SEOHealthScore } from "@/lib/ai/seo-health-score";

import HealthScore from "./health-score";
import PerformanceSummary from "./performance-summary";
import AIInsightCard from "./ai-insight-card";
import QuickActions from "./quick-actions";
import GrowthOpportunities from "./growth-opportunities";


type GrowthOpportunityData =
  ComponentProps<
    typeof GrowthOpportunities
  >["data"];




interface ExecutiveDashboardProps {

  clicks: number;

  impressions: number;

  users: number;

  sessions: number;

  ctr: number;

  engagementRate: number;

  summary: ExecutiveSummary;

  healthScore: SEOHealthScore;

  growthOpportunities: GrowthOpportunityData;

}





export default function ExecutiveDashboard({

  clicks,

  impressions,

  users,

  sessions,

  ctr,

  engagementRate,

  summary,

  healthScore,

  growthOpportunities,

}: ExecutiveDashboardProps) {



return (

<section

className="
space-y-6
"

>


{/* HEALTH + PERFORMANCE */}


<div

className="
grid
items-start
gap-6
xl:grid-cols-12
"

>


<div

className="
xl:col-span-4
tour-health-score
"

>

<HealthScore

data={healthScore}

/>

</div>





<div

className="
xl:col-span-8
tour-performance
"

>

<PerformanceSummary

clicks={clicks}

impressions={impressions}

users={users}

sessions={sessions}

/>

</div>


</div>








{/* AI INSIGHT */}


<div

className="
tour-ai-insight
"

>

<AIInsightCard

summary={summary}

healthScore={healthScore}

/>

</div>







{/* GROWTH OPPORTUNITIES */}


<div

className="
tour-growth
"

>

<GrowthOpportunities

data={growthOpportunities}

/>

</div>








{/* QUICK ACTIONS */}


<div

className="
tour-actions
"

>

<QuickActions />

</div>





</section>

);


}