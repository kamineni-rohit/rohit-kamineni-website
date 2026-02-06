import React, { useEffect, useRef } from "react";
 
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
    "PySpark", "Apache Spark", "Kafka", "Databricks", "Airflow", "Informatica", "Hadoop", "Hive", "dbt", "SparkSQL", "Dataflow", "BigQuery", "Glue Catalog", "Fivetran", "Integrate.io"
  ],
  "Databases & Storage": [
    "PostgreSQL", "Oracle", "DB2", "MySQL", "MariaDB", "MongoDB", "Snowflake", "Google Cloud Storage (GCS)", "Amazon S3", "Redis", "Elasticsearch"
  ],
  "Machine Learning & MLOps": [
    "Scikit-learn", "TensorFlow", "PyTorch", "Keras", "Vertex AI", "Pandas", "NumPy", "Matplotlib", "Seaborn", "MLOps"
  ],
  "Visualization & Dashboards": [
    "Tableau", "Power BI", "Looker", "Qlik"
  ],
  "Frameworks & APIs": [
    "SpringBoot", "REST APIs", "Node.js", "Swagger", "Postman", "Microservices"
  ],
  "Analytics & Tools": [
    "Excel (Advanced)", "SAS", "JMP", "Google Sheets", "DBeaver", "Toad", "PyCharm", "iCIMS", "Salesforce", "Slack", "JIRA", "Agile"
  ]
};

// Maps skill names to proper icon URLs - using devicon CDN for consistency
const getIconUrl = (skill) => {
  const sanitized = skill.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const devicon = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
  const known = {
    // Programming & Scripting
    python: `${devicon}/python/python-original.svg`,
    java: `${devicon}/java/java-original.svg`,
    sql: `${devicon}/azuresqldatabase/azuresqldatabase-original.svg`,
    r: `${devicon}/r/r-original.svg`,
    golang: `${devicon}/go/go-original.svg`,
    c: `${devicon}/cplusplus/cplusplus-original.svg`,
    shellscripting: `${devicon}/bash/bash-original.svg`,
    javascript: `${devicon}/javascript/javascript-original.svg`,
    html: `${devicon}/html5/html5-original.svg`,
    css: `${devicon}/css3/css3-original.svg`,

    // Cloud Platforms & DevOps
    googlecloudplatformgcp: `${devicon}/googlecloud/googlecloud-original.svg`,
    gcp: `${devicon}/googlecloud/googlecloud-original.svg`,
    aws: `${devicon}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    azure: `${devicon}/azure/azure-original.svg`,
    kubernetes: `${devicon}/kubernetes/kubernetes-original.svg`,
    docker: `${devicon}/docker/docker-original.svg`,
    cicd: `${devicon}/githubactions/githubactions-original.svg`,
    github: `${devicon}/github/github-original.svg`,
    git: `${devicon}/git/git-original.svg`,

    // Big Data & ETL
    pyspark: `${devicon}/apachespark/apachespark-original.svg`,
    apachespark: `${devicon}/apachespark/apachespark-original.svg`,
    kafka: `${devicon}/apachekafka/apachekafka-original.svg`,
    databricks: `${devicon}/databricks/databricks-original.svg`,
    airflow: `${devicon}/apacheairflow/apacheairflow-original.svg`,
    hadoop: `${devicon}/hadoop/hadoop-original.svg`,
    hive: `${devicon}/apachehive/apachehive-original.svg`,
    dbt: `${devicon}/dbt/dbt-original.svg`,
    sparksql: `${devicon}/apachespark/apachespark-original.svg`,
    dataflow: `${devicon}/googlecloud/googlecloud-original.svg`,
    bigquery: `${devicon}/googlecloud/googlecloud-original.svg`,
    gluecatalog: `${devicon}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    fivetran: `${devicon}/fivetran/fivetran-original.svg`,
    informatica: `${devicon}/informatica/informatica-original.svg`,
    integrateio: `${devicon}/apacheairflow/apacheairflow-original.svg`,

    // Databases & Storage
    postgresql: `${devicon}/postgresql/postgresql-original.svg`,
    oracle: `${devicon}/oracle/oracle-original.svg`,
    mysql: `${devicon}/mysql/mysql-original.svg`,
    mariadb: `${devicon}/mariadb/mariadb-original.svg`,
    mongodb: `${devicon}/mongodb/mongodb-original.svg`,
    snowflake: `${devicon}/snowflake/snowflake-original.svg`,
    googlecloudstoragegcs: `${devicon}/googlecloud/googlecloud-original.svg`,
    gcs: `${devicon}/googlecloud/googlecloud-original.svg`,
    amazons3: `${devicon}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
    redis: `${devicon}/redis/redis-original.svg`,
    db2: `${devicon}/db2/db2-original.svg`,
    elasticsearch: `${devicon}/elasticsearch/elasticsearch-original.svg`,

    // Machine Learning & MLOps
    scikitlearn: `${devicon}/scikitlearn/scikitlearn-original.svg`,
    tensorflow: `${devicon}/tensorflow/tensorflow-original.svg`,
    pytorch: `${devicon}/pytorch/pytorch-original.svg`,
    keras: `${devicon}/keras/keras-original.svg`,
    vertexai: `${devicon}/googlecloud/googlecloud-original.svg`,
    pandas: `${devicon}/pandas/pandas-original.svg`,
    numpy: `${devicon}/numpy/numpy-original.svg`,
    matplotlib: `${devicon}/matplotlib/matplotlib-original.svg`,
    seaborn: `${devicon}/python/python-original.svg`,
    mlops: `${devicon}/mlflow/mlflow-original.svg`,

    // Visualization & Dashboards
    tableau: `${devicon}/tableau/tableau-original.svg`,
    powerbi: `${devicon}/powerbi/powerbi-original.svg`,
    looker: `${devicon}/googlecloud/googlecloud-original.svg`,
    qlik: `${devicon}/qlik/qlik-original.svg`,

    // Frameworks & APIs
    springboot: `${devicon}/spring/spring-original.svg`,
    restapis: `${devicon}/fastapi/fastapi-original.svg`,
    nodejs: `${devicon}/nodejs/nodejs-original.svg`,
    swagger: `${devicon}/swagger/swagger-original.svg`,
    postman: `${devicon}/postman/postman-original.svg`,
    microservices: `${devicon}/kubernetes/kubernetes-original.svg`,

    // Analytics & Tools
    exceladvanced: `${devicon}/excel/excel-original.svg`,
    excel: `${devicon}/excel/excel-original.svg`,
    sas: `${devicon}/sas/sas-original.svg`,
    jmp: `${devicon}/sas/sas-original.svg`,
    googlesheets: `${devicon}/google/google-original.svg`,
    dbeaver: `${devicon}/dbeaver/dbeaver-original.svg`,
    toad: `${devicon}/oracle/oracle-original.svg`,
    pycharm: `${devicon}/pycharm/pycharm-original.svg`,
    icims: `${devicon}/linkedin/linkedin-original.svg`,
    salesforce: `${devicon}/salesforce/salesforce-original.svg`,
    slack: `${devicon}/slack/slack-original.svg`,
    jira: `${devicon}/jira/jira-original.svg`,
    agile: `${devicon}/trello/trello-original.svg`
  };

  if (known[sanitized]) return known[sanitized];
  // Fallback to devicon placeholder style
  return `${devicon}/devicon/devicon-original.svg`;
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
          <animated.div style={style}>
            <div
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
            <h3 className="text-3xl font-semibold text-accent mb-6 text-center">
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
            </div>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default SkillsModal;
