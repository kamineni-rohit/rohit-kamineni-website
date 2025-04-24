import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";

const MoreAboutMeModal = ({ onClose }) => {
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
            <h3 className="text-2xl font-bold text-accent mb-6 text-center">
              More About Me
            </h3>

            <div className="space-y-6 text-left text-black">
              <div>
                <h4 className="font-semibold text-lg text-accent mb-2">Languages Spoken</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>English – Native or bilingual proficiency</li>
                  <li>Hindi – Full professional proficiency</li>
                  <li>Tamil – Limited working proficiency</li>
                  <li>Telugu – Native or bilingual proficiency</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-accent mb-2">Volunteering</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>
                    <strong>Student Volunteer</strong> – Nirmaan Organization
                    <br />
                    Led STEM programs for orphans and mentored students at a government school.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-accent mb-2">Personal Interests</h4>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>Captain of the College Snooker Team — led team to 3 national-level wins</li>
                  <li>Actively engaged in mentorship and hackathons</li>
                  <li>Enthusiastic about optimizing systems — both technical and organizational</li>
                </ul>
              </div>
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

export default MoreAboutMeModal;
