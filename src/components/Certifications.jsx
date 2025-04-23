import { useState } from "react";
import CertificationsModal from "./CertificationsModal";
import udemyLogo from "../assets/udemy.png";
import courseraLogo from "../assets/coursera.png";
import polygonBg from "../assets/PolygonLuminary.svg";

const Certifications = () => {
  const [showModal, setShowModal] = useState(false);

  const udemyCerts = [
    { title: "Google Cloud Professional Data Engineer – GCP", link: "" },
    { title: "MLOps with AWS", link: "" },
    { title: "Data Science using Python", link: "" },
  ];

  const courseraCerts = [
    {
      title: "Deep Learning Specialization",
      link: "https://www.coursera.org/account/accomplishments/specialization/FEA55B563E4G",
    },
    {
      title: "Machine Learning Operations (MLOps)",
      link: "https://www.coursera.org/account/accomplishments/verify/XKM58LZ44LS3",
    },
  ];

  return (
    <section
      id="certifications"
      className="relative py-24 px-6 md:px-24 text-center bg-white overflow-hidden"
    >
      {/* Subtle polygon background with top/bottom fade */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.08,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <img
          src={polygonBg}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-accent mb-4">Certifications</h2>
        <p className="text-gray-600 italic mb-8">
          These are some of my most relevant certifications.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start justify-center text-left">
          {/* UDEMY */}
          <div className="pl-6">
            <a
              href="https://www.udemy.com/user/rohit-kamineni-2/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 mb-3 hover:opacity-80 transition"
            >
              <img src={udemyLogo} alt="Udemy" className="h-8 w-auto" />
              <span className="font-semibold text-gray-800 text-lg">Udemy</span>
            </a>
            <ul className="list-disc pl-10 text-black space-y-2 mt-4">
              {udemyCerts.map((cert, index) => (
                <li key={index} className="leading-snug">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-700 transition"
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

          {/* COURSERA */}
          <div className="pl-6">
            <a
              href="https://www.coursera.org/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 mb-3 hover:opacity-80 transition"
            >
              <img src={courseraLogo} alt="Coursera" className="h-8 w-auto" />
              <span className="font-semibold text-gray-800 text-lg">Coursera</span>
            </a>
            <ul className="list-disc pl-7 text-black space-y-2 mt-4">
              {courseraCerts.map((cert, index) => (
                <li key={index} className="leading-snug">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-700 transition"
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

        {/* Modal Trigger */}
        <div className="mt-11">
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
