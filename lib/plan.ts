export const PLANS = {

  FREE: "FREE",

  PRO: "PRO",

} as const;



export type Plan =
  typeof PLANS[keyof typeof PLANS];



export function isFree(
  plan: Plan
){

  return plan === PLANS.FREE;

}



export function isPro(
  plan: Plan
){

  return plan === PLANS.PRO;

}