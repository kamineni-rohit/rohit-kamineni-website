import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import udemyLogo from "../assets/udemy.png";
import courseraLogo from "../assets/coursera.png";

const CertificationsModal = ({ onClose }) => {
  const modalRef = useRef();

  const otherUdemyCerts = [
    {
      title: "The Web Developer Bootcamp",
      link: "https://www.udemy.com/certificate/UC-2d40aeb3-7272-4aa2-b84c-bc4f47c8e070/",
    },
    {
      title: "Data Structures and Algorithms: Deep Dive Using Java",
      link: "https://www.udemy.com/certificate/UC-891e6d29-6aff-4e1b-ab7f-c06913e46e3c/",
    },
    {
      title: "Learn Spring & Spring Boot – 10x Productive Java Development",
      link: "https://www.udemy.com/certificate/UC-efadf239-76a0-42ad-96f4-4a0352fd6d9d/",
    },
  ];

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
          <animated.div style={style} ref={modalRef} className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl transition"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-accent mb-6 text-center">Other Certifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              {/* UDEMY */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img src={udemyLogo} alt="Udemy" className="h-8 w-auto" />
                  <span className="font-semibold text-gray-800 text-lg">Udemy</span>
                </div>
                <ul className="list-disc pl-10 text-black space-y-2">
                  {otherUdemyCerts.map((cert, idx) => (
                    <li key={idx}>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-700 transition"
                      >
                        {cert.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COURSERA */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img src={courseraLogo} alt="Coursera" className="h-8 w-auto" />
                  <span className="font-semibold text-gray-800 text-lg">Coursera</span>
                </div>
                <p className="pl-10 text-black italic">Coming soon...</p>
              </div>
            </div>

            <hr className="my-6" />

            <div className="text-center">
              <h4 className="font-semibold text-accent text-lg mb-2">Certifications I'm currently working on</h4>
              <p className="italic text-black">Coming soon...</p>
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

export default CertificationsModal;
