import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";

const moreInfo = {
  Languages: [
    "English – Native or bilingual",
    "Hindi – Full professional",
    "Telugu – Native or bilingual",
    "Tamil – Limited working"
  ],
  Volunteering: [
    "Led STEM programs for students in orphanages via Nirmaan Organization",
    "Mentored school children at government schools to foster curiosity and confidence"
  ],
  Insights: [
    "Strong advocate for equity in education and technology access",
    "Comfortable collaborating across cultures and departments in high-stakes environments"
  ]
};

const KnowMoreModal = ({ onClose }) => {
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
            className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl transition"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-accent mb-6 text-center">Know More About Me</h3>
            <div className="space-y-6">
              {Object.entries(moreInfo).map(([category, list], idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-800 mb-2">{category}</h4>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {list.map((item, i) => (
                      <li key={i}>{item}</li>
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

export default KnowMoreModal;
