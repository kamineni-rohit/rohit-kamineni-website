import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import krogerLogo from "../assets/kroger-logo.png";
import tcubeLogo from "../assets/tcube-logo.png";
import uconnLogo from "../assets/uconn-health-logo.png";
import cumiLogo from "../assets/cumi-logo.png";
import anandaLogo from "../assets/ananda-logo.png";
import jerseystemLogo from "../assets/jerseystem-logo.png";

const experience = [
  {
    org: "JerseySTEM",
    title: "Data Engineer",
    date: "Mar 2025 – Present",
    location: "Remote | Hartford, CT",
    logo: jerseystemLogo,
    bullets: [
      "Built ETL pipelines using Integrate.io + Fivetran and automated dashboards with Looker + SQL Warehouse.",
      "Integrated iCIMS + Salesforce for funnel analysis, improved report accuracy by 40%, led data engineering strategy.",
    ],
  },
  {
    org: "Ananda",
    title: "Technology Consultant Intern",
    date: "Aug 2024 – Dec 2024",
    location: "Hartford, CT",
    logo: anandaLogo,
    bullets: [
      "Implemented AI models for chatbot optimization; analyzed crypto signals for predictive strategies.",
      "Translated data insights into strategic recommendations and integrated signals into bot responses.",
    ],
  },
  {
    org: "UConn Health",
    title: "Peer Counselor",
    date: "Jun 2024 – Dec 2024",
    location: "Farmington, CT",
    logo: uconnLogo,
    bullets: [
      "Mentored high school students exploring health careers; led field trips and educational activities.",
    ],
  },
  {
    org: "Kroger Technology & Digital",
    title: "Data Engineer",
    date: "Aug 2019 – Jun 2023",
    location: "Bangalore, India",
    logo: krogerLogo,
    bullets: [
      "Built PySpark ETL pipelines (2TB+/day), deployed MLOps on Vertex AI, and improved personalization by 23%.",
      "Created scalable data lakes on GCP, used Kafka + BigQuery, cut model drift 18%, saved 60+ engineer hrs/month.",
    ],
  },
  {
    org: "Kroger Technology & Digital",
    title: "SDE",
    date: "Aug 2019 – Dec 2019",
    location: "Bangalore, India",
    logo: krogerLogo,
    bullets: [
      "Built and scaled 'Products BFF' SpringBoot microservice (15M+ daily requests).",
      "Migrated systems to 3-tier Kubernetes, authored internal documentation.",
    ],
  },
  {
    org: "Tcube",
    title: "Data Engineer",
    date: "Jan 2019 – Jun 2019",
    location: "Hyderabad, India",
    logo: tcubeLogo,
    bullets: [
      "Built Python/SQL pipelines for logistics aggregation, partnered with ERP consultants for real-time KPIs.",
    ],
  },
  {
    org: "CUMI",
    title: "Summer Intern",
    date: "May 2017 – Jul 2017",
    location: "Chennai, India",
    logo: cumiLogo,
    bullets: [
      "Developed Arduino-GPS alert system, demonstrated executive-scale solution, and reduced hazard response latency.",
    ],
  },
];

const ExperienceModal = ({ onClose }) => {
  const modalRef = useRef();
  const transitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 220, friction: 20 },
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
                  <img src={exp.logo} alt={exp.org} className="w-10 h-10 object-contain mt-1 bg-white rounded" />
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <p className="text-gray-600 italic text-sm">{exp.org} | {exp.location}</p>
                    <p className="text-sm text-gray-500 mb-1">{exp.date}</p>
                    <ul className="list-disc pl-5 text-gray-800 text-sm space-y-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
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
    </div>
  );
};

export default ExperienceModal;
