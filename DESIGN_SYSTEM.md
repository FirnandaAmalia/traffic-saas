# TrafficSaaS Design System

Version: 1.0

---

# 1. Product Identity

## Brand Position

TrafficSaaS is a professional SEO intelligence platform that helps businesses, marketers, and agencies understand website performance and make data-driven optimization decisions.

The interface should communicate:

- Trust
- Accuracy
- Professionalism
- Simplicity
- Data intelligence


The product should feel like:

✅ Enterprise SaaS  
✅ SEO analytics platform  
✅ Professional business tool  


Avoid looking like:

❌ AI experiment  
❌ Landing page template  
❌ Futuristic demo app  


---

# 2. Visual Direction


## Design Principles


### Clean

Prioritize information hierarchy.

Users should immediately understand:

- What happened
- Why it happened
- What action should be taken


### Data First

The interface should prioritize:

- Metrics
- Charts
- Reports
- Recommendations


### Professional

Use a restrained visual style.

Avoid excessive decoration.


---

# 3. Color System


## Primary Brand Color


Primary Blue:

```
#2563EB
```

Tailwind:

```
blue-600
```


Usage:

- Primary buttons
- Active navigation
- Important links
- Main actions


Hover:

```
blue-700
```


---

## Background


Application background:

```
#F8FAFC
```

Tailwind:

```
slate-50
```


Card background:

```
#FFFFFF
```

Tailwind:

```
white
```


---

## Text Colors


Primary:

```
slate-900
```

Usage:

- Heading
- Important information


Secondary:

```
slate-600
```

Usage:

- Description
- Supporting text


Muted:

```
slate-400
```

Usage:

- Placeholder
- Metadata


---

# 4. Status Colors


## Success

```
emerald-600
```

Usage:

- Active subscription
- Successful payment
- Positive growth


## Warning

```
amber-500
```

Usage:

- Pending
- Attention required


## Error

```
red-600
```

Usage:

- Failed request
- Error state



---

# 5. Typography


## Page Title


Use:

```tsx
text-3xl
font-bold
tracking-tight
```

Example:

```
Dashboard Overview
```


---

## Section Title


Use:

```tsx
text-xl
font-bold
```

Example:

```
SEO Performance
```


---

## Card Title


Use:

```tsx
text-sm
font-semibold
```


---

## Body Text


Default:

```tsx
text-sm
text-slate-600
```


Description:

```tsx
text-xs
text-slate-500
```


---

# 6. Font Weight Rules


Recommended:

```
font-medium
font-semibold
font-bold
```


Use:

```
font-black
```

only for:

- Revenue number
- KPI value
- Hero metric


Avoid making every heading bold-black.


---

# 7. Layout System


## Container


Main content:

```tsx
max-w-7xl
mx-auto
px-6
```


---

## Spacing


Small:

```
gap-2
```

Normal:

```
gap-4
```

Large:

```
gap-6
```

Section:

```
space-y-8
```


Maintain consistent spacing.


---

# 8. Card System


## Standard Card


Use:

```tsx
rounded-2xl
border
border-slate-200
bg-white
shadow-sm
```


Example:

- Analytics card
- Recommendation card
- Feature card


---

## Premium Card


Allowed:

```tsx
rounded-3xl
border
shadow-md
```


Use for:

- Pricing
- Important upgrade section


---

## Avoid


Do not overuse:

```
shadow-2xl
blur effects
glowing backgrounds
floating animations
```


---

# 9. Button System


## Primary Button


```tsx
bg-blue-600
text-white
rounded-xl
hover:bg-blue-700
```


Usage:

- Upgrade
- Generate report
- Connect integration


---

## Secondary Button


```tsx
border
border-slate-200
bg-white
text-slate-700
rounded-xl
```


Usage:

- Cancel
- Secondary action


---

## Danger Button


```tsx
bg-red-600
text-white
```


Usage:

- Delete
- Remove


---

# 10. Icon Rules


Use:

```
lucide-react
```


Sizes:


Small:

```
h-4 w-4
```


Default:

```
h-5 w-5
```


Large:

```
h-6 w-6
```


---

Avoid:

- Emoji icons
- Random illustrations
- Decorative icons without purpose


Example:


Bad:

```
✨ AI Magic Report
```


Good:

```
AI Report
```

with icon.


---

# 11. AI Feature Guidelines


AI is a feature, not the entire brand.


Use:

```
AI SEO Consultant
AI Insights
AI Recommendations
```


Avoid:

```
Magic AI
Super AI Engine
AI Revolution
AI Power Mode
```


Avoid excessive:

- purple gradients
- sparkles
- glowing effects


AI features should feel:

- Reliable
- Analytical
- Professional


---

# 12. Badge Guidelines


Use badges only when meaningful.


Allowed:

```
PRO
NEW
Recommended
Connected
Pending
```


Avoid:

```
✨ AI Suggested
🔥 Trending
🚀 Powerful
```


---

# 13. Dashboard Design Rules


Dashboard hierarchy:


```
Overview

↓

Performance Data

↓

Insight

↓

Recommendation

↓

Action
```


Every section should answer:


## What happened?

Example:

Traffic decreased 20%


## Why?

Example:

Organic impressions declined


## What next?

Example:

Optimize declining pages


---

# 14. Recommendation Card Rules


Structure:


```
Icon

Title

Problem

Recommendation

Action Button
```


Example:


Title:

```
Optimize Keywords
```


Description:

```
Keywords with high impressions but low CTR need optimization.
```


CTA:

```
View Keywords
```


---

# 15. Pricing Page Rules


Pricing should communicate trust.


Structure:


```
Plan Name

Price

Description

Features

CTA
```


Avoid:

- Too many gradients
- Excessive badges
- Large animations


Recommended:


Free:

```
Start exploring SEO insights
```


Pro:

```
Advanced SEO analytics for agencies and businesses
```


---

# 16. Billing Flow Rules


User journey:


```
Pricing

↓

Upgrade Button

↓

Payment Creation

↓

Payment Upload

↓

Admin Verification

↓

PRO Activated
```


Every step must have:

- Loading state
- Error handling
- Success feedback


---

# 17. Animation Rules


Allowed:


Hover:

```tsx
transition
hover:shadow-md
hover:-translate-y-1
```


Avoid:


- Continuous floating
- Excessive motion
- Large transitions


Animations should support usability.


---

# 18. Empty State Rules


Every empty state should include:


```
Icon

Title

Description

Action
```


Example:


```
No projects yet

Connect your first website to start SEO analysis.

Create Project
```


---

# 19. Error State Rules


Errors must be:


- Clear
- Human readable
- Actionable


Bad:

```
Something went wrong
```


Good:

```
Google Search Console connection failed.
Reconnect your account.
```


---

# 20. Code Consistency


Before creating a component, check:


```
components/ui
components/dashboard
components/billing
components/layout
```


Reuse existing:

- Button
- Card
- Badge
- Dialog
- Input


Avoid duplicate components.


---

# 21. Final UI Checklist


Before merging:


## Visual

- [ ] Uses TrafficSaaS color palette
- [ ] No excessive gradients
- [ ] No unnecessary emojis
- [ ] Typography consistent
- [ ] Spacing consistent


## UX

- [ ] User understands the purpose
- [ ] Clear next action
- [ ] Loading state exists
- [ ] Error state exists
- [ ] Empty state exists


## Product Feel


The final result should feel like:


```
Professional SEO SaaS Platform
```


Not:


```
AI generated dashboard template
```