import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";

const DetailedExperienceModal = ({ onClose }) => {
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
            className="bg-white w-full max-w-4xl rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
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

            <div className="space-y-8 border-l-4 border-accent pl-6">
              <div>
                <div className="text-accent font-semibold">Jul 2019 – Jun 2023</div>
                <div className="text-lg font-bold">Data Engineer – Kroger</div>
                <p className="text-gray-700">
                  • Built real-time analytics with GCP + Looker.<br />
                  • Led MLOps pipeline migration to Vertex AI.<br />
                  • Delivered on-call automation systems and alert workflows.
                </p>
              </div>

              <div>
                <div className="text-accent font-semibold">Aug 2019 – Apr 2020</div>
                <div className="text-lg font-bold">SDE – Kroger</div>
                <p className="text-gray-700">
                  • Developed GraphQL APIs for Products BFF (15M+ daily requests).<br />
                  • Designed 3-tier migration to on-prem Kubernetes.<br />
                  • Built CI/CD pipelines and performed production rollbacks.
                </p>
              </div>

              <div>
                <div className="text-accent font-semibold">2019</div>
                <div className="text-lg font-bold">Data Engineer – Tcube</div>
                <p className="text-gray-700">
                  • Built Python & SQL pipelines for logistics & operations.<br />
                  • Developed automated daily dashboards with KPI insights.
                </p>
              </div>
            </div>

            <hr className="my-6" />

            <div>
              <h4 className="text-xl font-semibold text-accent mb-4">Skill Categories</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-800 list-disc pl-6">
                <li>GCP, AWS</li>
                <li>Kubernetes</li>
                <li>Airflow, Kafka</li>
                <li>Looker, BigQuery</li>
                <li>Vertex AI</li>
                <li>CI/CD, GitHub Actions</li>
              </ul>
            </div>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default DetailedExperienceModal;
