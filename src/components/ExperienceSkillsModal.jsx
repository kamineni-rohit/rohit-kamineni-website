import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import tcubeLogo from "../assets/tcube-logo.png";
import krogerLogo from "../assets/kroger-logo.png";
import cumiLogo from "../assets/cumi-logo.png";
import jerseystemLogo from "../assets/jerseystem-logo.png";
import uconnLogo from "../assets/uconn-health-logo.png";
import anandaLogo from "../assets/ananda-logo.png";

const ExperienceSkillsModal = ({ onClose }) => {
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
            className="bg-white w-full max-w-5xl rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl transition"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-accent mb-6 text-center">
              Detailed Experience & Skills
            </h3>

            <div className="space-y-8 text-left">
              {/* Kroger */}
              <div className="relative pl-6 border-l-4 border-accent">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={krogerLogo} alt="Kroger" className="h-6 w-6" />
                    <div className="text-lg font-bold">Data Engineer</div>
                  </div>
                  <div className="text-sm italic text-gray-600 mb-1">
                    Kroger Technology & Digital | Aug 2019 – Jun 2023
                  </div>
                  <ul className="text-gray-700 list-disc pl-4 space-y-1">
                    <li>Built and optimized <strong>ETL pipelines</strong> using PySpark, Databricks, Airflow</li>
                    <li>Implemented CI/CD with <strong>Vertex AI</strong> reducing model drift and deployment time</li>
                    <li>Architected GCP-based frameworks using Kafka, REST APIs, GCS, and BigQuery</li>
                    <li>Used <strong>Tableau</strong> and BigQuery for advanced BI dashboards</li>
                  </ul>
                  <p className="mt-1 text-sm text-gray-600">
                    Skills: <strong>GCP, Databricks, PySpark, BigQuery, Airflow, Vertex AI, Tableau</strong>
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src={krogerLogo} alt="Kroger" className="h-6 w-6" />
                    <div className="text-lg font-bold">Software Development Engineer</div>
                  </div>
                  <div className="text-sm italic text-gray-600 mb-1">
                    Kroger Technology & Digital | Aug 2019 – Dec 2019
                  </div>
                  <ul className="text-gray-700 list-disc pl-4 space-y-1">
                    <li>Built Spring Boot microservices for 15M+ daily API requests</li>
                    <li>Led 3-tier migration to <strong>Kubernetes</strong> and improved observability</li>
                  </ul>
                  <p className="mt-1 text-sm text-gray-600">
                    Skills: <strong>Spring Boot, GitHub Actions, Kubernetes, Git, Java</strong>
                  </p>
                </div>
              </div>

              {/* JerseySTEM */}
              <div className="relative pl-6 border-l-4 border-accent">
                <div className="flex items-center gap-2 mb-1">
                  <img src={jerseystemLogo} alt="JerseySTEM" className="h-6 w-6" />
                  <div className="text-lg font-bold">Data Engineer Intern</div>
                </div>
                <div className="text-sm italic text-gray-600 mb-1">
                  JerseySTEM | Mar 2025 – Present
                </div>
                <ul className="text-gray-700 list-disc pl-4 space-y-1">
                  <li>Built data pipelines using Integrate.io and Fivetran</li>
                  <li>Created dashboards using Looker and SQL Warehouse</li>
                  <li>Improved accuracy of ETL reports by 40%</li>
                </ul>
                <p className="mt-1 text-sm text-gray-600">
                  Skills: <strong>Looker, SQL, Fivetran, Excel</strong>
                </p>
              </div>

              {/* More items can be added here the same way */}
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

export default ExperienceSkillsModal;
