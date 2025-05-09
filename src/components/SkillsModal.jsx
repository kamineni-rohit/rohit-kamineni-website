import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";

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
    sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    golang: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    shellscripting: "https://skillicons.dev/icons?i=bash",
    javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    aws: "https://skillicons.dev/icons?i=aws",
    azure: "https://skillicons.dev/icons?i=azure",
    gcp: "https://skillicons.dev/icons?i=gcp",
    googlecloudplatformgcp: "https://skillicons.dev/icons?i=gcp",
    kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    cicd: "https://skillicons.dev/icons?i=githubactions",
    apachespark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
    hadoop: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hadoop/hadoop-original.svg",
    databricks: "https://www.databricks.com/wp-content/uploads/2020/04/databricks-logo-small.png", // Updated
    bigquery: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    airflow: "https://iconduck.com/icons/27002/airflow.svg",
    gluecatalog: "https://skillicons.dev/icons?i=aws",
    fivetran: "https://www.fivetran.com/images/fivetran-logo-blue.svg", // Updated
    integrateio: "https://www.integrate.io/hubfs/website-assets/Integrate.io%20Logo%20Color.svg", // Updated
    sqlwarehouse: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    googlecloudstoragegcs: "https://skillicons.dev/icons?i=gcp",
    amazons3: "https://skillicons.dev/icons?i=aws",
    mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    elasticsearch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
    mysqlworkbench: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    vertexai: "https://cloud.google.com/vertex-ai/images/vertex-ai-logo.svg", // Updated
    scikitlearn: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    mlpipelines: "https://skillicons.dev/icons?i=python",
    modeldeployment: "https://skillicons.dev/icons?i=python",
    anomalydetection: "https://skillicons.dev/icons?i=python",
    tableau: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg",
    looker: "https://cdn-icons-png.flaticon.com/512/5968/5968333.png",
    powerbi: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
    exceladvanced: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Microsoft_Office_Excel_%282019%29.svg/1200px-Microsoft_Office_Excel_%282019%29.svg.png", //Updated
    sasminer: "https://cdn.worldvectorlogo.com/logos/sas-2.svg",
    dbt: "https://avatars.githubusercontent.com/u/55843770?s=200&v=4", //Updated
    googlesheets: "https://skillicons.dev/icons?i=googlecloud",
    icims: "https://ui-avatars.com/api/?name=iCIMS&background=1d6fba&color=fff&bold=true&format=png&size=32",
    salesforce: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    slack: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg"
  };

  if (known[sanitized]) return known[sanitized];

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(skill)}&background=1d6fba&color=fff&bold=true&format=png&size=32`;
};

// Fallback icon for unknown skills
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
                <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-800 mb-3">{category}</h4>
                  <ul className="space-y-2">
                    {skills.map((skill, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-800 hover:scale-[1.02] transition-all duration-200">
                        <img
                          src={getIconUrl(skill)}
                          alt={skill}
                          className="w-6 h-6 object-contain rounded-sm border"
                          onError={(e) => {
                            // fallback to avatar if icon fails to load
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(skill)}&background=1d6fba&color=fff&bold=true&format=png&size=32`;
                          }}
                        />
                        <span>{skill}</span>
                      </li>
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
      <div className="fixed inset-0 -z-10 backdrop-blur-sm" onClick={onClose} />
    </div>
  );
};

export default SkillsModal;
