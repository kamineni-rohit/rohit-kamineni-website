import React, { useEffect, useRef } from "react";
 
import { useTransition, animated } from "@react-spring/web";
import { FiX } from "react-icons/fi"; // Added for the close button
import krogerLogo from "@/assets/logos/kroger-logo.png";
import tcubeLogo from "@/assets/logos/tcube-logo.png";
import uconnLogo from "@/assets/logos/uconn-health-logo.png";
import cumiLogo from "@/assets/logos/cumi-logo.png";
import anandaLogo from "@/assets/logos/ananda-logo.png";
import jerseystemLogo from "@/assets/logos/jerseystem-logo.png";
import uconnDiningLogo from "@/assets/logos/uconn-dining-logo.png";
import zopSmartLogo from "@/assets/logos/zopsmart-logo1.png";
import rnInfusionLogo from "@/assets/logos/rn-infusion-logo.png";

const experience = [
  {
    org: "RN Infusion",
    link: "https://www.linkedin.com/company/rn-infusion",
    title: "Data and Business Insights Analyst",
    date: "Aug 2025 – Present",
    location: "Malvern, PA",
    logo: rnInfusionLogo,
    bullets: [
      "Designed centralized cloud data platform for EMR, scheduling, and billing systems.",
      "Digitized historical and active clinical records into secure, compliant, queryable datasets.",
      "Built real-time BI dashboards for scheduling, patient outcomes, inventory usage, and revenue cycle metrics.",
      "Automated reporting and implemented data governance workflows, improving accuracy and reducing manual work.",
      "Ensured HIPAA compliance by maintaining secure access, audit logs, and proper documentation.",
      "Supported business growth through forecasting, trend analysis, and referral insights across multi-county operations."
    ],
    skills: ["Healthcare Analytics", "EMR", "EHR", "HIPAA Compliance", "BI Dashboards", "Data Governance", "Cloud Platforms", "SQL", "Python", "Power BI", "Excel"]
  },
  {
    org: "JerseySTEM",
    link: "https://www.linkedin.com/company/jerseystem/posts/?feedView=all",
    title: "Data Engineer",
    date: "Mar 2025 – Jul 2025",
    location: "Remote | Hartford, CT",
    logo: jerseystemLogo,
    bullets: [
      "Engineered ETL pipelines using Integrate.io + Fivetran for multi-tool data ingestion.",
      "Automated Looker and SQL Warehouse dashboards to visualize KPIs and engagement metrics.",
      "Optimized workflows with Excel and SQL, improving data accuracy by 40%.",
      "Integrated iCIMS + Salesforce data for recruitment analytics and lifecycle tracking.",
      "Led centralized data engineering strategy using GitHub and agile practices."
    ],
    skills: ["Integrate.io", "Fivetran", "Looker", "SQL Warehouse", "Excel", "Salesforce", "GitHub", "Agile"]
  },
  {
    org: "Ananda",
    link: "https://www.linkedin.com/company/ananda777/",
    title: "Technology Consultant Intern",
    date: "Aug 2024 – Dec 2024",
    location: "Hartford, CT",
    logo: anandaLogo,
    bullets: [
      "Built and evaluated AI models to improve chatbot interactions and user engagement.",
      "Analyzed crypto trading signals for strategy optimization using predictive analytics.",
      "Transformed analytical insights into AI roadmap contributions.",
      "Merged signal analytics with bot systems for strategic integration."
    ],
    skills: ["AI Models", "Chatbots", "Crypto Analytics", "Predictive Modeling", "Strategic Roadmap"]
  },
  {
    org: "UConn Health",
    link: "https://www.linkedin.com/company/uconnhealth/posts/?feedView=all",
    title: "Peer Counselor",
    date: "Jun 2024 – Dec 2024",
    location: "Farmington, CT",
    logo: uconnLogo,
    bullets: [
      "Mentored high school students in healthcare careers.",
      "Led field trips and academic engagement programs.",
      "Facilitated a supportive and educational experience for participants."
    ],
    skills: ["Mentoring", "Leadership", "Student Engagement", "Career Guidance"]
  },
  {
    org: "University of Connecticut, Dining Services",
    link: "https://www.linkedin.com/school/university-of-connecticut/posts/?feedView=all",
    title: "Student Employee",
    date: "Oct 2023 – Sep 2024",
    location: "Storrs, CT",
    logo: uconnDiningLogo,
    bullets: [
      "Managed multiple dining stations ensuring cleanliness and service quality.",
      "Delivered high-level customer service under fast-paced conditions.",
      "Helped maintain hygiene and contributed to smooth operational workflow."
    ],
    skills: ["Customer Service", "Multitasking", "Operations", "Hygiene Standards"]
  },
  {
    org: "Kroger Technology & Digital",
    consultingOrg: "ZopSmart", 
    consultingOrgLink: "https://www.linkedin.com/company/zopsmart/posts/?feedView=all",
    link: "https://www.linkedin.com/company/kroger-technology-and-digital/",
    title: "Data Engineer",
    date: "Aug 2019 – Jun 2023",
    location: "Bangalore, India",
    logo: krogerLogo,
    bullets: [
      "Built ETL pipelines using PySpark, Databricks, Airflow handling 2TB+ data/day.",
      "Developed Kafka + REST + GCS frameworks for sub-minute analytics in BigQuery.",
      "Led MLOps deployment via Vertex AI; reduced model drift by 18%.",
      "Created scalable lakes with GCS/Dataflow; reduced failures 30%.",
      "Saved 60+ eng hrs/month with reusable dbt + SQL models and automated reports.",
      "Built Tableau dashboards to empower 50+ category managers."
    ],
    skills: ["Python", "SQL", "PySpark", "Databricks", "Airflow", "Kafka", "Vertex AI", "BigQuery", "dbt", "Tableau", "GCP", "AWS", "PowerBI", "Looker", "GitHub", "Git", "JIRA", "Agile"]
  },
  {
    org: "Kroger Technology & Digital",
    consultingOrg: "ZopSmart", 
    link: "https://www.linkedin.com/company/kroger-technology-and-digital/",
    consultingOrgLink: "https://www.linkedin.com/company/zopsmart/posts/?feedView=all",
    title: "Software Development Engineer",
    date: "Aug 2019 – Dec 2019",
    location: "Bangalore, India",
    logo: krogerLogo,
    bullets: [
      "Scaled SpringBoot-based Products BFF microservice (15M+ requests/day).",
      "Migrated legacy services to 3-tier Kubernetes architecture with observability.",
      "Led framework development for Kafka and annotation processing in Java.",
      "Documented system design and onboarded new developers."
    ],
    skills: ["Java", "SpringBoot", "Kubernetes", "Kafka", "Documentation", "Postman", "Swagger", "log4j", "JUnit", "Mockito", "GitHub", "Git", "JIRA", "Agile", "Docker"]
  },
  {
    org: "Tcube",
    link: "https://www.linkedin.com/company/tcube360/",
    title: "Data Engineer",
    date: "Jan 2019 – Jun 2019",
    location: "Hyderabad, India",
    logo: tcubeLogo,
    bullets: [
      "Built Python + SQL pipelines to aggregate logistics data.",
      "Enabled real-time KPI dashboards with ERP integrations.",
      "Improved data quality and operational reporting for logistics."
    ],
    skills: ["Python", "SQL", "ERP Integration", "Logistics", "KPI Dashboards"]
  },
  {
    org: "Carborundum Universal Limited (CUMI)",
    link: "https://www.linkedin.com/company/cumi-1954/",
    title: "Summer Intern",
    date: "May 2017 – Jul 2017",
    location: "Chennai, India",
    logo: cumiLogo,
    bullets: [
      "Built Arduino-GPS alert system for hazard detection and safety alerts.",
      "Presented senior-level implementation roadmap for factory-wide adoption.",
      "Improved response time for safety interventions."
    ],
    skills: ["Arduino", "GPS", "IoT", "Hazard Detection", "Safety Systems"]
  }
];

const ExperienceModal = ({ onClose }) => {
  const modalRef = useRef();
  // Updated react-spring transition
  const transitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95) translateY(-20px)" },
    enter: { opacity: 1, transform: "scale(1) translateY(0px)" },
    leave: { opacity: 0, transform: "scale(0.95) translateY(20px)" },
    config: { tension: 280, friction: 25 }, // Matching config
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto">
      {transitions((style, item) =>
        item ? (
          <animated.div style={style}>
            <div
              ref={modalRef}
              className="bg-white w-full max-w-4xl rounded-xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative"
            >
              {/* Enhanced Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-slate-400 hover:text-accent p-1 rounded-full hover:bg-slate-100 transition-colors duration-150 z-10"
                aria-label="Close"
              >
                <FiX size={24} />
              </button>
              {/* Enhanced Main Title */}
              <h3 className="text-3xl font-semibold text-accent mb-6 text-center">
                Experience Timeline
              </h3>
            <div className="space-y-8"> {/* Increased spacing between experience items */}
              {experience.map((exp, idx) => (
                // Enhanced styling for each experience item container
                <div key={idx} className="flex flex-col sm:flex-row items-start gap-x-6 gap-y-4 p-6 bg-slate-50/70 rounded-lg shadow-sm relative border-l-4 border-accent">
                  {/* Logo Column */}
                  <div className="flex-shrink-0 w-16 flex flex-col items-center gap-2">
                    <a href={exp.link} target="_blank" rel="noreferrer" className="block transition-transform hover:scale-105">
                      <img
                        src={exp.logo.src || exp.logo}
                        alt={`${exp.org} logo`}
                        className="w-16 h-16 object-contain bg-white p-1 rounded-md shadow-md"
                      />
                    </a>
                    {exp.consultingOrg && exp.consultingOrgLink && (
                      <a href={exp.consultingOrgLink} target="_blank" rel="noreferrer" className="block transition-transform hover:scale-105">
                        <img
                          src={zopSmartLogo.src || zopSmartLogo} // Assuming zopSmartLogo is correctly imported for consulting org
                          alt={`${exp.consultingOrg} logo`}
                          className="w-12 h-12 object-contain bg-white p-1 rounded-md shadow-sm"
                        />
                      </a>
                    )}
                  </div>
                  
                  {/* Details Column */}
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xl font-semibold text-slate-800">{exp.title}</h4>
                    <p className="text-slate-600 text-sm">
                      <span className="font-medium">{typeof exp.org === 'string' ? exp.org : <>{exp.org}</>}</span>
                      {exp.consultingOrg && <span className="text-slate-500"> (Consulting via {exp.consultingOrg})</span>}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 items-center">
                      <span>{exp.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{exp.location}</span>
                    </div>
                    
                    <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1.5 pt-1 leading-relaxed">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="pt-3">
                        <p className="text-xs text-slate-500 font-medium mb-1.5">Key Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="bg-accent/10 text-accent px-2.5 py-0.5 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
              {/* Enhanced Bottom Close Button */}
              <div className="text-center mt-10 pt-6 border-t border-slate-200">
                <button
                  onClick={onClose}
                  className="bg-accent text-white px-8 py-2.5 rounded-lg hover:bg-accent/90 transition-colors duration-150 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.01]"
                >
                  Close
                </button>
              </div>
            </div>
          </animated.div>
        ) : null
      )}
      {/* Removed redundant backdrop div as it's handled by the main wrapper */}
    </div>
  );
};

export default ExperienceModal;
