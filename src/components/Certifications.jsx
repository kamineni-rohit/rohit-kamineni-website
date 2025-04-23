import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import CertificationsModal from "./CertificationsModal";
import udemyLogo from "../assets/udemy.png";
import courseraLogo from "../assets/coursera.png";

const Certifications = () => {
  const [showModal, setShowModal] = useState(false);

  const udemyCerts = [
    {
      title: "Google Cloud Professional Data Engineer – GCP",
      link: "https://www.udemy.com/certificate/UC-2d40aeb3-7272-4aa2-b84c-bc4f47c8e070/",
    },
    {
      title: "MLOps with AWS",
      link: "",
    },
    {
      title: "Data Science using Python",
      link: "",
    },
  ];

  const courseraCerts = [
    {
      title: "Deep Learning Specialization",
      link: "https://www.coursera.org/account/accomplishments/specialization/FEA55B563E4G",
    },
  ];

  return (
    <section
      id="certifications"
      className="relative py-24 px-6 md:px-24 text-center bg-white overflow-hidden"
    >
      {/* Optional subtle background styling hook here */}
      {/* e.g., <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] opacity-10 z-0" /> */}

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-accent mb-4">Certifications</h2>
        <p className="text-gray-600 mb-8">
          <i>These are some of my most relevant certifications.</i>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center items-start">
          {/* Udemy Block */}
          <div className="text-left">
            <a href="https://www.udemy.com/user/rohit-kamineni-2/" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-3 mb-2 hover:opacity-80 transition">
                <img src={udemyLogo} alt="Udemy" className="h-6" />
                <span className="font-semibold text-gray-800">Udemy</span>
                <FaExternalLinkAlt className="text-gray-500 text-sm" />
              </div>
            </a>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
              {udemyCerts.map((cert, index) => (
                <li key={index}>
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-blue-700"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    cert.title
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Coursera Block */}
          <div className="text-left">
            <a href="https://www.coursera.org/" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-3 mb-2 hover:opacity-80 transition">
                <img src={courseraLogo} alt="Coursera" className="h-6" />
                <span className="font-semibold text-gray-800">Coursera</span>
                <FaExternalLinkAlt className="text-gray-500 text-sm" />
              </div>
            </a>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
              {courseraCerts.map((cert, index) => (
                <li key={index}>
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-blue-700"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    cert.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-10">
          <button
            onClick={() => setShowModal(true)}
            className="bg-accent text-white px-6 py-2 rounded hover:opacity-90 transition"
          >
            View Other Certifications
          </button>
        </div>

        {showModal && <CertificationsModal onClose={() => setShowModal(false)} />}
      </div>
    </section>
  );
};

export default Certifications;
