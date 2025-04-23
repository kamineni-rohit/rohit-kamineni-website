import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import SectionBackground from "./SectionBackground";
import circuitBg from "../assets/CircuitPrimary.svg";

const Resume = () => {
  const [showPreview, setShowPreview] = useState(false);
  const RESUME_PATH = `${import.meta.env.BASE_URL}Rohit_Kamineni_Resume.pdf`;

  useEffect(() => {
    document.body.style.overflow = showPreview ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showPreview]);

  return (
    <section id="resume" className="bg-white py-20 px-6 md:px-24 text-center relative overflow-hidden">
      <SectionBackground imageSrc={circuitBg} opacity={0.06} />

      <div className="relative z-5">
        <h2 className="text-3xl font-bold text-accent mb-6">Resume</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Download my resume to see a detailed breakdown of my experience in data engineering,
          analytics, and machine learning across cloud environments.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => setShowPreview(true)}
            className="bg-white border-2 border-accent text-accent font-medium px-6 py-3 rounded-md hover:bg-accent hover:text-white transition"
          >
            View Resume
          </button>

          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition"
          >
            Download Resume
          </a>
        </div>

        {showPreview && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
            onClick={() => setShowPreview(false)}
          >
            <button
              className="fixed top-6 right-6 z-[60] text-white bg-gray-800 p-2 rounded-full hover:bg-red-600 transition"
              onClick={() => setShowPreview(false)}
              title="Close"
            >
              <FiX size={20} />
            </button>

            <div
              className="relative max-w-6xl w-full h-[90vh] rounded-lg overflow-hidden shadow-xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-full overflow-y-scroll snap-y snap-mandatory"
                style={{ scrollBehavior: "smooth" }}
              >
                <iframe
                  src={RESUME_PATH}
                  title="Resume Preview"
                  className="w-full h-full snap-start"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Resume;
