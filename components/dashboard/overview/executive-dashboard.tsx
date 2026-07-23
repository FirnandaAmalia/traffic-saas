import HealthScore from "./health-score";
import PerformanceSummary from "./performance-summary";
import AIInsightCard from "./ai-insight-card";
import QuickActions from "./quick-actions";
import GrowthOpportunities from "./growth-opportunities";

interface ExecutiveDashboardProps {

clicks:number;

impressions:number;

users:number;

sessions:number;

ctr:number;

engagementRate:number;

summary:any;


healthScore:any;


growthOpportunities:any[];


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

<AIInsightCard

summary={summary}

healthScore={healthScore}

/>

{/* GROWTH OPPORTUNITY */}
<GrowthOpportunities
data={growthOpportunities}
/>

{/* ACTION */}
<QuickActions />





</section>


);


}