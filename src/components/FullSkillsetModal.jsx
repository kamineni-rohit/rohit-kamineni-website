import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";

const FullSkillsetModal = ({ onClose }) => {
  const modalRef = useRef();

  const transitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 250, friction: 20 },
  });

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[100] flex items-center justify-center px-4">
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

            <h3 className="text-2xl font-bold text-accent mb-6 text-center">Full Skillset</h3>

            <div className="space-y-6 text-gray-800 text-sm">
              <div>
                <h4 className="font-semibold text-accent mb-1">Programming & Scripting</h4>
                <ul className="list-disc pl-6 grid grid-cols-2 gap-2">
                  <li>Python</li>
                  <li>SQL</li>
                  <li>JavaScript</li>
                  <li>Shell/Bash</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-accent mb-1">Data Engineering</h4>
                <ul className="list-disc pl-6 grid grid-cols-2 gap-2">
                  <li>GCP (BigQuery, Cloud Functions, Dataflow)</li>
                  <li>AWS (S3, Lambda, Redshift)</li>
                  <li>Airflow</li>
                  <li>Kafka</li>
                  <li>dbt</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-accent mb-1">Analytics & ML</h4>
                <ul className="list-disc pl-6 grid grid-cols-2 gap-2">
                  <li>Looker</li>
                  <li>Tableau</li>
                  <li>Vertex AI</li>
                  <li>Pandas</li>
                  <li>Scikit-Learn</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-accent mb-1">DevOps & Tools</h4>
                <ul className="list-disc pl-6 grid grid-cols-2 gap-2">
                  <li>Kubernetes</li>
                  <li>Docker</li>
                  <li>GitHub Actions</li>
                  <li>Jenkins</li>
                </ul>
              </div>
            </div>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default FullSkillsetModal;
