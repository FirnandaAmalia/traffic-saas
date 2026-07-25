import type { ComponentProps } from "react";

import type {
  ExecutiveSummary,
} from "@/lib/ai/executive-summary";

import type {
  SEOHealthScore,
} from "@/lib/ai/seo-health-score";


import HealthScore from "./health-score";
import PerformanceSummary from "./performance-summary";
import AIInsightCard from "./ai-insight-card";
import QuickActions from "./quick-actions";
import GrowthOpportunities from "./growth-opportunities";


type GrowthOpportunityData =
  ComponentProps<typeof GrowthOpportunities>["data"];

interface ExecutiveDashboardProps {

  clicks:number;

  impressions:number;

  users:number;

  sessions:number;

  ctr:number;

  engagementRate:number;

  summary:ExecutiveSummary;

  healthScore:SEOHealthScore;

  growthOpportunities:GrowthOpportunityData;

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

}:ExecutiveDashboardProps){



return (


<section

className="
space-y-6
"

>





{/* TOP EXECUTIVE SUMMARY */}

<div

className="
grid
gap-6
xl:grid-cols-12
items-start
"

>





{/* HEALTH SCORE */}

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









{/* PERFORMANCE */}

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

<div className="tour-ai-insight">

<AIInsightCard

summary={summary}

healthScore={healthScore}

/>

</div>









{/* GROWTH OPPORTUNITY */}

<div className="tour-growth">


<GrowthOpportunities

data={growthOpportunities}

/>


</div>









{/* ACTION */}

<div className="tour-actions">


<QuickActions />


</div>







</section>


);


}