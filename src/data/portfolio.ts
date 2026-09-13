// Central content store. Only verified facts from the resume and project brief live here.
// No invented companies, stats, certifications, or employment history.

export const profile = {
  name: "Ganesh S",
  role: "Data Analyst",
  subRole: "Product Support Engineer · Data Analytics",
  location: "Chennai, Tamil Nadu, India",
  tagline:
    "Turning data into decisions, dashboards into insights, and ideas into interactive experiences.",
  experienceYears: "1.5+",
  email: "2808ganesh@gmail.com",
  phone: "+91 8667707950",
  linkedin: "https://www.linkedin.com/in/ganesh200428",
  github: "https://github.com/ganesh200428",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Dashboards", href: "#dashboards" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const aboutFocusAreas = [
  "Data preparation",
  "Data cleaning",
  "Data validation",
  "SQL analysis",
  "Python-based analysis",
  "Excel reporting",
  "Power BI dashboards",
  "Tableau",
  "KPI reporting",
  "Client requirement analysis",
  "Dashboard troubleshooting",
  "Production support",
  "Data governance",
  "Automation",
  "AI integrations",
];

export const aboutStats = [
  { value: 1.5, suffix: "+", label: "Years of Experience" },
  { value: 20, suffix: "+", label: "Dashboard build" },
  { value: 100, suffix: "+", label: "Dashboard Pages Delivered" },
  { value: 6, suffix: "", label: "Business Domains Covered" },
];

export interface ExperienceItem {
  id: string;
  org: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "peninsular",
    org: "Peninsular Research Operation",
    role: "Data Analyst",
    period: "2025 - Present",
    location: "Chennai, India",
    summary:
      "Developing and maintaining interactive dashboards for KPI reporting and business insight across Finance, Healthcare, Construction, Sales, HRMS and Governance domains.",
    points: [
      "Worked on data preparation, validation, transformation and reporting for Finance, Healthcare, Construction, Sales, HRMS and Governance domains.",
      "Built and maintained 20+ interactive dashboards and 100+ dashboard pages, including DataMocha dashboards, from stakeholder requirements through production delivery.",
      "Gathered client and stakeholder requirements, understood reporting needs, and translated business requirements into structured dashboards and analytical outputs.",
      "Used SQL for data extraction, joins, aggregation, reconciliation and validation across multiple data sources.",
      "Used Python and Excel for data cleaning, analysis, recurring reporting and social media data processing.",
      "Performed data cleansing, transformation, validation, reconciliation and auditing to ensure accurate and reliable reporting.",
      "Developed analytics solutions for highway monitoring by combining financial, operational, GIS and compliance data to track project KPIs, progress and deviations.",
      "Supported Finance Analytics and workforce-related reporting with KPI tracking and business insights.",
      "Performed functional testing, issue investigation and production troubleshooting for dashboards and reporting workflows.",
      "Supported workflow-based business solutions and automation using Power Apps.",
      "Presented data insights, KPI trends and reporting outcomes to clients and senior stakeholders.",
    ],
  },
  {
    id: "vcodes",
    org: "VCodes",
    role: "Data Analyst Intern",
    period: "Mar 2025 - Jun 2025",
    location: "Chennai, India",
    summary:
      "Prepared, cleaned, transformed and validated business datasets to support recurring reporting and ETL activities.",
    points: [
      "Prepared, cleaned, transformed and validated datasets using SQL and Excel for recurring reporting.",
      "Developed Power BI dashboards and KPI reports using Power Query and data modeling.",
      "Supported ETL activities (extraction, transformation, validation) to prepare structured datasets for reporting.",
    ],
  },
];

export const education = [
  {
    institution: "University of Madras",
    degree: "Master of Computer Applications (MCA)",
    period: "2026 - Present",
  },
  {
    institution: "Hindustan College, Chennai",
    degree: "Bachelor of Science in Computer Science",
    period: "2022 - 2025",
  },
];

export interface SkillNode {
  name: string;
  category: "SQL & Data" | "Visualization" | "Analytics" | "Engineering" | "Cloud & AI" | "Development";
  description: string;
}

export const skillCategories: { key: SkillNode["category"]; color: string }[] = [
  { key: "SQL & Data", color: "#22d3ee" },
  { key: "Visualization", color: "#a78bfa" },
  { key: "Analytics", color: "#f472b6" },
  { key: "Engineering", color: "#34d399" },
  { key: "Cloud & AI", color: "#3b82f6" },
  { key: "Development", color: "#fb923c" },
];

export const skills: SkillNode[] = [
  { name: "Advanced SQL", category: "SQL & Data", description: "Complex queries, joins, aggregation and reconciliation." },
  { name: "Snowflake", category: "SQL & Data", description: "Cloud data warehousing and analytics." },
  { name: "MySQL", category: "SQL & Data", description: "Relational database querying & design." },
  { name: "MongoDB", category: "SQL & Data", description: "Document-based data storage." },
  { name: "Query Optimization", category: "SQL & Data", description: "Improving query performance at scale." },
  { name: "Data Extraction & Validation", category: "SQL & Data", description: "Sourcing and validating data for reporting." },

  { name: "Power BI (DAX)", category: "Visualization", description: "Interactive dashboards & DAX measures." },
  { name: "Tableau", category: "Visualization", description: "KPI dashboards and visual analytics." },
  { name: "Looker Studio", category: "Visualization", description: "Cloud-based reporting and dashboards." },
  { name: "Excel", category: "Visualization", description: "Executive KPI dashboards & data storytelling." },

  { name: "KPI Development", category: "Analytics", description: "Designing metrics that drive decisions." },
  { name: "Hypothesis Testing", category: "Analytics", description: "Validating assumptions with data." },
  { name: "Trend & Pattern Analysis", category: "Analytics", description: "Spotting signals in historical data." },
  { name: "Insight Generation", category: "Analytics", description: "Turning analysis into actionable insight." },
  { name: "Executive Reporting", category: "Analytics", description: "Communicating findings to leadership." },

  { name: "Python", category: "Engineering", description: "Data analysis, automation and scripting." },
  { name: "Pandas", category: "Engineering", description: "Data wrangling and transformation in Python." },
  { name: "ETL Pipelines", category: "Engineering", description: "Extract, transform, load workflows." },
  { name: "Apache Airflow", category: "Engineering", description: "Workflow orchestration & scheduling." },
  { name: "Data Cleaning", category: "Engineering", description: "Preparing raw data for analysis." },
  { name: "Web Scraping APIs", category: "Engineering", description: "Extracting data from external sources." },

  { name: "Azure Cloud", category: "Cloud & AI", description: "Cloud platform for data & AI workloads." },
  { name: "Azure OpenAI", category: "Cloud & AI", description: "Enterprise generative AI integration." },
  { name: "RAG", category: "Cloud & AI", description: "Retrieval-augmented generation for AI apps." },
  { name: "AI Agent Integration", category: "Cloud & AI", description: "Building autonomous AI-driven workflows." },
  { name: "REST APIs", category: "Cloud & AI", description: "Integrating external services and data." },

  { name: "Astro", category: "Development", description: "Content-driven, fast web framework." },
  { name: "React", category: "Development", description: "Interactive component-driven UI." },
  { name: "TypeScript", category: "Development", description: "Type-safe application development." },
  { name: "Tailwind CSS", category: "Development", description: "Utility-first styling system." },
];

export interface DashboardPreview {
  name: string;
  category: "Finance" | "Healthcare" | "Construction" | "Sales" | "HRMS" | "Governance";
  description: string;
  accent: string;
}

export const dashboards: DashboardPreview[] = [
  { name: "Finance Analytics Workspace", category: "Finance", description: "Workforce-related KPI reporting and financial insight tracking.", accent: "#22d3ee" },
  { name: "Healthcare KPI Suite", category: "Healthcare", description: "Operational KPI monitoring across healthcare reporting workflows.", accent: "#34d399" },
  { name: "Highway Monitoring (Construction)", category: "Construction", description: "Financial, operational, GIS & compliance KPIs across districts.", accent: "#f97316" },
  { name: "Sales Performance Dashboard", category: "Sales", description: "Pipeline, targets and performance tracking for sales teams.", accent: "#a78bfa" },
  { name: "HRMS Reporting Suite", category: "HRMS", description: "Workforce reporting and HR KPI dashboards.", accent: "#f472b6" },
  { name: "Finance Workspace (AI-Powered)", category: "Finance", description: "Natural language querying, executive KPI dashboards, and role-based reporting.", accent: "#60a5fa" },
];

export const certifications = [
  { name: "Power BI Certification", issuer: "Python, MySQL and Power BI · Besant Technologies", icon: "chart" as const },
  { name: "Claude Code 101", issuer: "Anthropic", icon: "code" as const },
  { name: "Excel Automation using AI", issuer: "Office Master", icon: "grid" as const },
  { name: "AI Tools and ChatGPT Workshop", issuer: "be10x", icon: "sparkles" as const },
];

export const dataStorySteps = [
  "Raw Data",
  "Clean",
  "Transform",
  "Analyze",
  "Visualize",
  "Insight",
  "Decision",
];

export const tnJobMarketStats = [
  { label: "Openings", value: "523" },
  { label: "Districts", value: "12" },
  { label: "Sectors", value: "10" },
  { label: "Fresher Opportunities", value: "24%" },
  { label: "Avg. Salary", value: "₹17,813/mo" },
];

export const highwayMonitorStats = [
  { label: "Project Value", value: "$443M" },
  { label: "Road Length", value: "765 km" },
  { label: "Districts", value: "3" },
];

export interface GithubProject {
  name: string;
  repo: string;
  description: string;
}

// Additional portfolio projects, grounded only in the repo names supplied; no invented stats or tech.
export const githubProjects: GithubProject[] = [
  {
    name: "Employee Advocacy Productivity Analytics System",
    repo: "Employee-Advocacy-Productivity-Analytics-System",
    description: "Analytics system exploring employee advocacy activity and its relationship to workplace productivity.",
  },
  {
    name: "BikeShare Demand Analysis",
    repo: "BikeShare_Demand_Analysis",
    description: "Exploratory analysis of bike-share demand patterns and usage trends.",
  },
  {
    name: "Retail Sales Prediction Analytics System",
    repo: "Retail-Sales-Prediction-Analytics-System",
    description: "Predictive analytics system for forecasting retail sales from historical data.",
  },
  {
    name: "OpenSub Analytics",
    repo: "OpenSub-Analytics",
    description: "Analytics project exploring open subtitle datasets for text and usage insights.",
  },
];
