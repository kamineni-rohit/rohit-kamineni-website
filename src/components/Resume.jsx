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
            download="Rohit_Kamineni_Resume.pdf" // Added download attribute with a suggested filename
            target="_blank" // Opens download link in new tab, though download attribute usually triggers download directly
            rel="noopener noreferrer"
            className="bg-accent text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition-opacity duration-150 ease-in-out flex items-center gap-2" // Added flex, items-center, gap
          >
            <FiDownload className="inline-block" /> {/* Removed mr-2 */}
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
