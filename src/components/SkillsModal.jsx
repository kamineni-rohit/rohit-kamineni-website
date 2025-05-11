import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import { FiX } from "react-icons/fi"; // Added for the close button

// Skill categories remain unchanged
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
    "SQL Warehouse", "MySQL", "PostgreSQL", "Google Cloud Storage (GCS)", "Amazon S3", "MongoDB", "Redis", "Elasticsearch", "MySQL Workbench"
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

// Maps a skill name to a possible icon source (static or generated)
const getIconUrl = (skill) => {
  const sanitized = skill.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const known = {
    python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", // Generic SQL
    golang: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    shellscripting: "https://skillicons.dev/icons?i=bash",
    javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    aws: "https://skillicons.dev/icons?i=aws",
    azure: "https://skillicons.dev/icons?i=azure",
    gcp: "https://skillicons.dev/icons?i=gcp",
    googlecloudplatformgcp: "https://skillicons.dev/icons?i=gcp", // Alias for GCP
    kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    cicd: "https://skillicons.dev/icons?i=githubactions", // Example for CI/CD
    apachespark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original-wordmark.svg", // More specific Spark icon
    hadoop: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg",
    databricks: "https://www.databricks.com/wp-content/uploads/2020/04/databricks-logo-small.png",
    bigquery: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", // GCP icon can represent BigQuery
    airflow: "https://iconduck.com/icons/27002/airflow.svg",
    gluecatalog: "https://skillicons.dev/icons?i=aws", // AWS icon for Glue
    fivetran: "https://www.fivetran.com/images/fivetran-logo-blue.svg",
    integrateio: "https://www.integrate.io/hubfs/website-assets/Integrate.io%20Logo%20Color.svg",
    sqlwarehouse: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg", // Example for SQL Warehouse
    mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    googlecloudstoragegcs: "https://skillicons.dev/icons?i=gcp", // GCP icon for GCS
    amazons3: "https://skillicons.dev/icons?i=aws", // AWS icon for S3
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    elasticsearch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
    mysqlworkbench: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", // MySQL for Workbench
    vertexai: "https://cloud.google.com/vertex-ai/images/vertex-ai-logo.svg",
    scikitlearn: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/1200px-Scikit_learn_logo_small.svg.png", // Scikit-learn logo
    mlpipelines: "https://skillicons.dev/icons?i=tensorflow", // Example: TensorFlow for ML Pipelines
    modeldeployment: "https://skillicons.dev/icons?i=docker", // Example: Docker for Model Deployment
    anomalydetection: "https://skillicons.dev/icons?i=grafana", // Example: Grafana for Anomaly Detection (visualization)
    tableau: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg",
    looker: "https://seeklogo.com/images/L/looker-logo-E783A39181-seeklogo.com.png", // Better Looker logo
    powerbi: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
    exceladvanced: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Microsoft_Office_Excel_%282019%29.svg/1200px-Microsoft_Office_Excel_%282019%29.svg.png",
    sasminer: "https://cdn.worldvectorlogo.com/logos/sas-2.svg",
    dbt: "https://avatars.githubusercontent.com/u/55843770?s=200&v=4",
    googlesheets: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Google_Sheets_logo_%282014-2020%29.svg/1200px-Google_Sheets_logo_%282014-2020%29.svg.png", // Google Sheets logo
    icims: "https://ui-avatars.com/api/?name=iC&background=1d6fba&color=fff&bold=true&format=png&size=32", // Shorter name for avatar
    salesforce: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    slack: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg"
  };

  if (known[sanitized]) return known[sanitized];
  // Fallback to a simpler avatar if no specific icon is found
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.substring(0,2))}&background=e0e7ff&color=4f46e5&bold=true&format=svg&size=32`;
};

const SkillsModal = ({ onClose }) => {
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
    // Updated backdrop overlay
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto">
      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            ref={modalRef}
            // Enhanced modal container styling
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
            <h3 className="text-3xl font-semibold text-accent mb-8 text-center">
              Full Skillset
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Adjusted gap */}
              {Object.entries(skillCategories).map(([category, skills], idx) => (
                // Enhanced category container
                <div key={idx} className="bg-slate-50/80 p-6 rounded-lg border border-slate-200 shadow-sm">
                  {/* Enhanced category title */}
                  <h4 className="text-xl font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-200">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {skills.map((skill, i) => (
                      // Enhanced skill item
                      <li key={i} className="flex items-center gap-3 text-slate-700 hover:bg-slate-100/70 p-1.5 rounded-md transition-colors duration-150 ease-in-out">
                        <img
                          src={getIconUrl(skill)}
                          alt={`${skill} icon`}
                          // Consistent icon styling
                          className="w-6 h-6 object-contain rounded-sm flex-shrink-0" 
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.substring(0,2))}&background=e0e7ff&color=4f46e5&bold=true&format=svg&size=32`;
                          }}
                        />
                        <span className="text-base">{skill}</span>
                      </li>
                    ))}
                  </ul>
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
          </animated.div>
        ) : null
      )}
      {/* Removed redundant backdrop div */}
    </div>
  );
};

export default SkillsModal;
