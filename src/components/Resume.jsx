import { useState, useEffect } from "react";
import { FiEye, FiDownload } from "react-icons/fi";
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
        <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
          Explore my resume for a detailed overview of my experience in data
          engineering, analytics, and machine learning, with a focus on cloud
          environments and impactful projects.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => setShowPreview(true)}
            className="bg-white border-2 border-accent text-accent font-medium px-6 py-3 rounded-md hover:bg-accent hover:text-white transition"
          >
            <FiEye className="inline-block mr-2" />
            View Resume
          </button>

          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition"
          >
            <FiDownload className="inline-block mr-2" />
            Download Resume
          </a>
        </div>
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            <b>Note:</b> The resume is in PDF format. Click the button above to
            download.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Resume;
