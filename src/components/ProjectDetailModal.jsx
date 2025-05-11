import React, { useEffect, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi"; // Added FiExternalLink for general links

const ProjectDetailModal = ({ project, onClose }) => {
  const modalRef = useRef();

  // Modal animation consistent with other modals
  const transitions = useTransition(!!project, {
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
    if (project) {
      document.body.style.overflow = 'hidden';
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [project, onClose]);

  if (!project) return null;

  const IconComponent = project.icon; // Get the icon from the project data

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto">
      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            ref={modalRef}
            className="bg-white w-full max-w-2xl rounded-xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative"
          >
            {/* Enhanced Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-accent p-1 rounded-full hover:bg-slate-100 transition-colors duration-150 z-10"
              aria-label="Close Modal"
            >
              <FiX size={24} />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col items-center mb-6 text-center">
              {IconComponent && (
                <div className="p-3 mb-3 rounded-full bg-accent/10 text-accent">
                   <IconComponent size={32} />
                </div>
              )}
              <h3 className="text-3xl font-semibold text-accent">
                {project.title}
              </h3>
            </div>
            
            {/* Project Description */}
            <div className="mb-6">
              <p className="text-slate-600 text-base leading-relaxed text-center sm:text-left">
                {project.desc}
              </p>
            </div>

            {/* Categories (Optional Display) */}
            {project.categories && project.categories.filter(cat => cat !== "All Projects").length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center sm:text-left">Categories</h4>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {project.categories.filter(cat => cat !== "All Projects").map(category => (
                    <span key={category} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* GitHub Link */}
            {project.github && (
              <div className="mb-8 text-center">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-lg transition-colors duration-150 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <FiGithub size={18} />
                  View on GitHub
                </a>
              </div>
            )}
             {!project.github && project.desc.toLowerCase().includes("currently compiling resources") && (
                 <div className="mb-8 text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700 italic">
                        This project is currently under development or resources are being compiled. Please check back later for the GitHub link!
                    </p>
                </div>
            )}


            {/* Bottom Close Button */}
            <div className="text-center pt-6 border-t border-slate-200">
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
    </div>
  );
};

export default ProjectDetailModal;
