import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import krogerLogo from "../assets/logos/kroger-logo.png";
import tcubeLogo from "../assets/logos/tcube-logo.png";
import uconnLogo from "../assets/logos/uconn-health-logo.png";
import cumiLogo from "../assets/logos/cumi-logo.png";
import anandaLogo from "../assets/logos/ananda-logo.png";
import jerseystemLogo from "../assets/logos/jerseystem-logo.png";
import uconnDiningLogo from "../assets/logos/uconn-dining-logo.png";
import zopSmartLogo from "../assets/logos/zopsmart-logo1.png"; // Import ZopSmart logo

const experience = [
  {
    org: "JerseySTEM",
    link: "https://www.linkedin.com/company/jerseystem/posts/?feedView=all",
    title: "Data Engineer",
    date: "Mar 2025 – Present",
    location: "Remote | Hartford, CT",
    logo: jerseystemLogo,
    bullets: [
      "Engineered ETL pipelines using Integrate.io + Fivetran for multi-tool data ingestion.",
      "Automated Looker and SQL Warehouse dashboards to visualize KPIs and engagement metrics.",
      "Optimized workflows with Excel and SQL, improving data accuracy by 40%.",
      "Integrated iCIMS + Salesforce data for recruitment analytics and lifecycle tracking.",
      "Led centralized data engineering strategy using GitHub and agile practices."
    ],
    skills: ["Integrate.io", "Fivetran", "Looker", "SQL Warehouse", "Excel", "Salesforce", "GitHub"]
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
    org: (
      <>
        Kroger Technology & Digital
      </>
    ),
    consultingOrg: "ZopSmart", // Add a new field for the consulting org
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
    org: (
      <>
        Kroger Technology & Digital
      </>
    ),
    consultingOrg: "ZopSmart", // Add a new field for the consulting org
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
  const transitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 220, friction: 20 }
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            ref={modalRef}
            className="bg-white w-full max-w-4xl rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-scroll"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl transition"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-accent mb-6 text-center">
              Experience Timeline
            </h3>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="flex items-start gap-4 border-l-4 border-accent pl-4 relative">
                  <div>
                    <a href={exp.link} target="_blank" rel="noreferrer" className="block">
                      <img src={exp.logo} alt={exp.org} className="w-10 h-10 object-contain bg-white rounded" />
                    </a>
                    {exp.consultingOrg && (
                      <a href={exp.consultingOrgLink} target="_blank" rel="noreferrer" className="block mt-1">
                        <img
                          src={zopSmartLogo}
                          alt={exp.consultingOrg}
                          className="w-8 h-8 object-contain bg-white rounded"
                        />
                      </a>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <p className="text-gray-600 italic text-sm">
                      {exp.org} {exp.consultingOrg && `| Consulting through ${exp.consultingOrg}`} | {exp.location}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">{exp.date}</p>
                    <ul className="list-disc pl-5 text-gray-800 text-sm space-y-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    <div className="pt-2 text-xs text-gray-500">
                      <strong>Skills:</strong> {exp.skills.join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={onClose}
                className="bg-accent text-white px-6 py-2 rounded hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </animated.div>
        ) : null
      )}
      <div className="fixed inset-0 -z-10 backdrop-blur-sm" onClick={onClose} />
    </div>
  );
};

export default ExperienceModal;