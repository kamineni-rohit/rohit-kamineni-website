import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import { FiX } from "react-icons/fi";

// Comprehensive skill categories
const skillCategories = {
  "Programming & Scripting": [
    "Python", "Java", "SQL", "R", "GoLang", "C++", "Shell Scripting", "JavaScript", "HTML", "CSS"
  ],
  "Cloud Platforms & DevOps": [
    "Google Cloud Platform (GCP)", "AWS", "Azure", "Kubernetes", "Docker", "CI/CD", "GitHub", "Git"
  ],
  "Big Data & ETL": [
    "PySpark", "Apache Spark", "Kafka", "Databricks", "Airflow", "Hadoop", "Hive", "dbt", "SparkSQL", "Dataflow", "BigQuery", "Glue Catalog", "Fivetran", "Integrate.io"
  ],
  "Databases & Storage": [
    "PostgreSQL", "Oracle", "MySQL", "MariaDB", "MongoDB", "Snowflake", "Google Cloud Storage (GCS)", "Amazon S3", "Redis", "Elasticsearch"
  ],
  "Machine Learning & MLOps": [
    "Scikit-learn", "TensorFlow", "PyTorch", "Keras", "Vertex AI", "Pandas", "NumPy", "Matplotlib", "Seaborn", "MLOps"
  ],
  "Visualization & Dashboards": [
    "Tableau", "Power BI", "Looker"
  ],
  "Frameworks & APIs": [
    "SpringBoot", "REST APIs", "Node.js", "Swagger", "Postman", "Microservices"
  ],
  "Analytics & Tools": [
    "Excel (Advanced)", "SAS", "JMP", "Google Sheets", "iCIMS", "Salesforce", "Slack", "JIRA", "Agile"
  ]
};

// Maps skill names to proper icon URLs
const getIconUrl = (skill) => {
  const sanitized = skill.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const known = {
    // Programming & Scripting
    python: "https://skillicons.dev/icons?i=python",
    java: "https://skillicons.dev/icons?i=java",
    sql: "https://skillicons.dev/icons?i=mysql",
    r: "https://skillicons.dev/icons?i=r",
    golang: "https://skillicons.dev/icons?i=go",
    c: "https://skillicons.dev/icons?i=cpp",
    shellscripting: "https://skillicons.dev/icons?i=bash",
    javascript: "https://skillicons.dev/icons?i=javascript",
    html: "https://skillicons.dev/icons?i=html",
    css: "https://skillicons.dev/icons?i=css",

    // Cloud Platforms & DevOps
    googlecloudplatformgcp: "https://skillicons.dev/icons?i=gcp",
    gcp: "https://skillicons.dev/icons?i=gcp",
    aws: "https://skillicons.dev/icons?i=aws",
    azure: "https://skillicons.dev/icons?i=azure",
    kubernetes: "https://skillicons.dev/icons?i=kubernetes",
    docker: "https://skillicons.dev/icons?i=docker",
    cicd: "https://skillicons.dev/icons?i=githubactions",
    github: "https://skillicons.dev/icons?i=github",
    git: "https://skillicons.dev/icons?i=git",

    // Big Data & ETL
    pyspark: "https://ui-avatars.com/api/?name=PS&background=E97627&color=fff&bold=true&format=svg&size=48",
    apachespark: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
    kafka: "https://skillicons.dev/icons?i=kafka",
    databricks: "https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png",
    airflow: "https://upload.wikimedia.org/wikipedia/commons/d/de/AirflowLogo.png",
    hadoop: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hadoop/hadoop-original.svg",
    hive: "https://ui-avatars.com/api/?name=HI&background=FDEE21&color=000&bold=true&format=svg&size=48",
    dbt: "https://seeklogo.com/images/D/dbt-logo-500AB0BAA7-seeklogo.com.png",
    sparksql: "https://ui-avatars.com/api/?name=SQ&background=E97627&color=fff&bold=true&format=svg&size=48",
    dataflow: "https://skillicons.dev/icons?i=gcp",
    bigquery: "https://ui-avatars.com/api/?name=BQ&background=4285F4&color=fff&bold=true&format=svg&size=48",
    gluecatalog: "https://skillicons.dev/icons?i=aws",
    fivetran: "https://ui-avatars.com/api/?name=FI&background=0073FF&color=fff&bold=true&format=svg&size=48",
    integrateio: "https://ui-avatars.com/api/?name=IN&background=4f46e5&color=fff&bold=true&format=svg&size=48",

    // Databases & Storage
    postgresql: "https://skillicons.dev/icons?i=postgresql",
    oracle: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg",
    mysql: "https://skillicons.dev/icons?i=mysql",
    mariadb: "https://ui-avatars.com/api/?name=MD&background=003545&color=fff&bold=true&format=svg&size=48",
    mongodb: "https://skillicons.dev/icons?i=mongodb",
    snowflake: "https://ui-avatars.com/api/?name=SF&background=29B5E8&color=fff&bold=true&format=svg&size=48",
    googlecloudstoragegcs: "https://skillicons.dev/icons?i=gcp",
    gcs: "https://skillicons.dev/icons?i=gcp",
    amazons3: "https://ui-avatars.com/api/?name=S3&background=569A31&color=fff&bold=true&format=svg&size=48",
    redis: "https://skillicons.dev/icons?i=redis",
    elasticsearch: "https://ui-avatars.com/api/?name=ES&background=FEC514&color=000&bold=true&format=svg&size=48",

    // Machine Learning & MLOps
    scikitlearn: "https://skillicons.dev/icons?i=sklearn",
    tensorflow: "https://skillicons.dev/icons?i=tensorflow",
    pytorch: "https://skillicons.dev/icons?i=pytorch",
    keras: "https://ui-avatars.com/api/?name=KE&background=D00000&color=fff&bold=true&format=svg&size=48",
    vertexai: "https://ui-avatars.com/api/?name=VE&background=4285F4&color=fff&bold=true&format=svg&size=48",
    pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    numpy: "https://ui-avatars.com/api/?name=NP&background=013243&color=4DABCF&bold=true&format=svg&size=48",
    matplotlib: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
    seaborn: "https://ui-avatars.com/api/?name=SB&background=3776AB&color=fff&bold=true&format=svg&size=48",
    mlops: "https://ui-avatars.com/api/?name=ML&background=1d6fba&color=fff&bold=true&format=svg&size=48",

    // Visualization & Dashboards
    tableau: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg",
    powerbi: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
    looker: "https://ui-avatars.com/api/?name=LO&background=4285F4&color=fff&bold=true&format=svg&size=48",

    // Frameworks & APIs
    springboot: "https://skillicons.dev/icons?i=spring",
    restapis: "https://ui-avatars.com/api/?name=RE&background=FF6C37&color=fff&bold=true&format=svg&size=48",
    nodejs: "https://skillicons.dev/icons?i=nodejs",
    swagger: "https://ui-avatars.com/api/?name=SW&background=85EA2D&color=000&bold=true&format=svg&size=48",
    postman: "https://skillicons.dev/icons?i=postman",
    microservices: "https://ui-avatars.com/api/?name=MS&background=1d6fba&color=fff&bold=true&format=svg&size=48",

    // Analytics & Tools
    exceladvanced: "https://ui-avatars.com/api/?name=EX&background=217346&color=fff&bold=true&format=svg&size=48",
    excel: "https://ui-avatars.com/api/?name=EX&background=217346&color=fff&bold=true&format=svg&size=48",
    sas: "https://ui-avatars.com/api/?name=SAS&background=1E4C7A&color=fff&bold=true&format=svg&size=48",
    jmp: "https://ui-avatars.com/api/?name=JMP&background=4f46e5&color=fff&bold=true&format=svg&size=48",
    googlesheets: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Google_Sheets_2020_Logo.svg",
    icims: "https://ui-avatars.com/api/?name=IC&background=1d6fba&color=fff&bold=true&format=svg&size=48",
    salesforce: "https://ui-avatars.com/api/?name=SA&background=00A1E0&color=fff&bold=true&format=svg&size=48",
    slack: "https://ui-avatars.com/api/?name=SL&background=4A154B&color=fff&bold=true&format=svg&size=48",
    jira: "https://ui-avatars.com/api/?name=JI&background=0052CC&color=fff&bold=true&format=svg&size=48",
    agile: "https://ui-avatars.com/api/?name=AG&background=00B8D4&color=fff&bold=true&format=svg&size=48"
  };

  if (known[sanitized]) return known[sanitized];
  // Fallback avatar
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.substring(0,2))}&background=e0e7ff&color=4f46e5&bold=true&format=svg&size=48`;
};

const SkillsModal = ({ onClose }) => {
  const modalRef = useRef();
  const transitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95) translateY(-20px)" },
    enter: { opacity: 1, transform: "scale(1) translateY(0px)" },
    leave: { opacity: 0, transform: "scale(0.95) translateY(20px)" },
    config: { tension: 280, friction: 25 },
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
          <animated.div
            style={style}
            ref={modalRef}
            className="bg-white w-full max-w-4xl rounded-xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-accent p-1 rounded-full hover:bg-slate-100 transition-colors duration-150 z-10"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-3xl font-semibold text-accent mb-8 text-center">
              Full Skillset
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skillCategories).map(([category, skills], idx) => (
                <div key={idx} className="bg-slate-50/80 p-6 rounded-lg border border-slate-200 shadow-sm">
                  <h4 className="text-xl font-semibold text-slate-700 mb-4 pb-2 border-b border-slate-200">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {skills.map((skill, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 hover:bg-slate-100/70 p-1.5 rounded-md transition-colors duration-150 ease-in-out">
                        <img
                          src={getIconUrl(skill)}
                          alt={`${skill} icon`}
                          className="w-6 h-6 object-contain rounded-sm flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.substring(0,2))}&background=e0e7ff&color=4f46e5&bold=true&format=svg&size=48`;
                          }}
                        />
                        <span className="text-base">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

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
    </div>
  );
};

export default SkillsModal;
