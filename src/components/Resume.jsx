'use client'

import { useState, useEffect } from "react";
import { FiX, FiEye, FiDownload } from "react-icons/fi";
import SectionBackground from "@/components/SectionBackground";
import circuitBg from "@/assets/backgrounds/CircuitPrimary.svg";

const Resume = () => {
  const [showPreview, setShowPreview] = useState(false);
  // Determine base path based on deployment environment
  const basePath = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'github'
    ? '/rohit-kamineni-website'
    : '';
  const RESUME_PATH = `${basePath}/Rohit_Kamineni_Resume.pdf`;

  useEffect(() => {
    document.body.style.overflow = showPreview ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showPreview]);

  return (
    <section id="resume" className="bg-white py-24 px-6 md:px-24 text-center relative overflow-hidden">
      <SectionBackground imageSrc={circuitBg} opacity={0.06} />

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-6">Resume</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
          Explore my resume for a detailed overview of my experience in data
          engineering, analytics, and machine learning, with a focus on cloud
          environments and impactful projects.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => setShowPreview(true)}
            className="bg-white border-2 border-accent text-accent font-medium px-6 py-2.5 rounded-lg hover:bg-accent hover:text-white transition-colors duration-150 flex items-center gap-2"
          >
            <FiEye />
            View Resume
          </button>

          <a
            href={RESUME_PATH}
            download="Rohit_Kamineni_Resume.pdf" // Added download attribute with a suggested filename
            target="_blank" // Opens download link in new tab, though download attribute usually triggers download directly
            rel="noopener noreferrer"
            className="bg-accent text-white font-medium px-6 py-2.5 rounded-lg hover:bg-accent/90 transition-colors duration-150 flex items-center gap-2"
          >
            <FiDownload />
            Download Resume
          </a>
        </div>

        {showPreview && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPreview(false)}
          >
            <button
              className="fixed top-6 right-6 z-[70] text-slate-400 hover:text-accent bg-white p-2 rounded-full hover:bg-slate-100 transition-colors duration-150 shadow-lg"
              onClick={() => setShowPreview(false)}
              title="Close"
            >
              <FiX size={24} />
            </button>

            <div
              className="relative max-w-5xl w-full h-[85vh] rounded-xl overflow-hidden shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={RESUME_PATH}
                title="Resume Preview"
                className="w-full h-full"
                style={{ backgroundColor: "white" }}
              />
            </div>
          </div>
        )}
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
