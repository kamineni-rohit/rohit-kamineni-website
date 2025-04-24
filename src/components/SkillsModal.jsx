import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";

const skillCategories = {
  "Programming & Scripting": [
    "Python", "Java", "SQL", "GoLang", "Shell Scripting", "JavaScript"
  ],
  "Cloud Platforms & DevOps": [
    "Google Cloud Platform (GCP)", "AWS", "Azure", "Kubernetes", "CI/CD", "Docker", "GitHub", "Git"
  ],
  "Big Data & ETL": [
    "Apache Spark", "Hadoop", "Databricks", "BigQuery", "Airflow", "Glue Catalog", "Fivetran", "Integrate.io"
  ],
  "Databases & Storage": [
    "SQL Warehouse", "MySQL", "PostgreSQL", "Google Cloud Storage (GCS)", "Amazon S3", "MongoDB", "Redis", "Elasticsearch", "MySQL Workbench", "MongoDB"
  ],
  "Machine Learning & MLOps": [
    "Vertex AI", "Scikit-learn", "ML Pipelines", "Model Deployment", "Anomaly Detection"
  ],
  "Visualization & Dashboards": [
    "Tableau", "Looker", "Power BI"
  ],
  "Analytics & Tools": [
    "Excel (Advanced)", "SAS Miner", "dbt", "Google Sheets", "iCIMS", "Salesforce", "Slack", "JIRA"
  ]
};

const SkillsModal = ({ onClose }) => {
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
            className="bg-white w-full max-w-4xl rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl transition"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-accent mb-6 text-center">Full Skillset</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {Object.entries(skillCategories).map(([category, skills], idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-800 mb-2">{category}</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
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

export default SkillsModal;
