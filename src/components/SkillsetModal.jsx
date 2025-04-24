import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";

const SkillsetModal = ({ onClose }) => {
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

  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "Java", "SQL", "JavaScript", "R"]
    },
    {
      title: "Cloud & DevOps",
      skills: ["Google Cloud Platform (GCP)", "AWS", "Vertex AI", "Kubernetes", "Docker", "CI/CD", "GitHub Actions"]
    },
    {
      title: "Data Engineering",
      skills: ["Apache Airflow", "Databricks", "Fivetran", "Integrate.io", "BigQuery", "Glue Catalog", "Dataflow"]
    },
    {
      title: "Analytics & BI",
      skills: ["Tableau", "Looker", "SQL Warehouse", "Excel"]
    },
    {
      title: "Libraries & Frameworks",
      skills: ["Spring Boot", "PySpark", "Hadoop", "Scikit-learn", "Pandas", "NumPy"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "Salesforce", "ICIMS", "Radon", "Jira"]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            ref={modalRef}
            className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl transition"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-accent mb-6 text-center">
              Full Skillset
            </h3>

            <div className="space-y-6 text-left">
              {skillCategories.map((category, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-lg text-accent mb-2">
                    {category.title}
                  </h4>
                  <ul className="list-disc list-inside pl-4 text-black space-y-1">
                    {category.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={onClose}
                className="bg-accent text-white px-5 py-2 rounded hover:opacity-90 transition"
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

export default SkillsetModal;
