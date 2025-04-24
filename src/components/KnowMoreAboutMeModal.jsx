import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";

const KnowMoreAboutMeModal = ({ onClose }) => {
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

            <h3 className="text-2xl font-bold text-accent mb-6 text-center">Know More About Me</h3>

            <div className="space-y-6 text-gray-800 text-sm">
              <div>
                <h4 className="font-semibold text-accent mb-1">Languages</h4>
                <p>English, Hindi, Telugu</p>
              </div>

              <div>
                <h4 className="font-semibold text-accent mb-1">Volunteering</h4>
                <p>
                  COVID Aid Volunteer – Helped migrant workers with resources and vaccination access.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-accent mb-1">Interests</h4>
                <p>
                  Reading about economic history, writing blogs on data, and
                  experimenting with productivity systems.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-accent mb-1">Fun Fact</h4>
                <p>
                  My favorite debugging snack is masala Maggi. Works every time!
                </p>
              </div>
            </div>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default KnowMoreAboutMeModal;
