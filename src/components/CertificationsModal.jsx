import React, { useEffect, useRef } from "react";
 
import { useTransition, animated } from "@react-spring/web";
import { FiX } from "react-icons/fi"; // Import the FiX icon
import udemyLogo from "@/assets/logos/udemy.png";
import courseraLogo from "@/assets/logos/coursera.png";

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

  // Updated react-spring transition to match other modals
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

  // Common section title classes (similar to other modals)
  const sectionSubTitleClasses = "text-xl font-semibold text-slate-700 mb-3"; // For Udemy/Coursera titles

  return (
    // Updated backdrop overlay
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto">
      {transitions((style, item) =>
        item ? (
          // Enhanced modal container styling: p-8, shadow-2xl
          <animated.div 
            style={style} 
            ref={modalRef} 
            className="bg-white w-full max-w-3xl rounded-xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            {/* Enhanced Close Button (already updated in the provided version) */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-accent p-1 rounded-full hover:bg-slate-100 transition-colors duration-150 z-10"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
            
            {/* Enhanced Main Title */}
            <h3 className="text-3xl font-semibold text-accent mb-8 text-center">Other Certifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left"> {/* Adjusted gap */}
              {/* UDEMY */}
              <div>
                <div className={`flex items-center gap-3 ${sectionSubTitleClasses}`}> {/* Applied common subtitle class */}
                  <img src={udemyLogo.src || udemyLogo} alt="Udemy" className="h-8 w-auto object-contain" /> {/* Kept original logo size */}
                  <span>Udemy</span>
                </div>
                <ul className="list-disc pl-10 text-slate-600 space-y-2.5 text-base"> {/* Adjusted list style */}
                  {otherUdemyCerts.map((cert, idx) => (
                    <li key={idx}>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-accent hover:underline transition-colors duration-150" // Consistent link hover
                      >
                        {cert.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COURSERA */}
              <div>
                <div className={`flex items-center gap-3 ${sectionSubTitleClasses}`}> {/* Applied common subtitle class */}
                  <img src={courseraLogo.src || courseraLogo} alt="Coursera" className="h-8 w-auto object-contain" /> {/* Kept original logo size */}
                  <span>Coursera</span>
                </div>
                <p className="pl-10 text-slate-500 italic">More coming soon...</p> {/* Adjusted text color */}
              </div>
            </div>

            {/* Enhanced Horizontal Rule */}
            <hr className="my-8 border-slate-200" /> 

            <div className="text-center">
              {/* Enhanced "Currently working on" title */}
              <h4 className={`${sectionSubTitleClasses} justify-center mb-2`}>Certifications I'm currently working on...</h4>
              <p className="italic text-slate-500">Stay tuned for updates!</p> {/* Adjusted text color */}
            </div>

            {/* Enhanced Bottom Close Button */}
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
      {/* Removed redundant backdrop div as it's handled by the main wrapper now */}
    </div>
  );
};

export default CertificationsModal;
