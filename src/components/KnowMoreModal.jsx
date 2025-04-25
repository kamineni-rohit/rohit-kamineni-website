import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaChessKnight,
  FaMusic,
  FaUtensils,
  FaDog,
  FaCat,
  FaDice,
  FaPlane,
  FaFilm,
  FaCode,
  FaUsers,
  FaCar,
  FaBaseballBatBall
} from "react-icons/fa6";
import { MdHiking } from "react-icons/md";
import { RiRunFill } from 'react-icons/ri';
import nirmaanLogo from "../assets/nirmaan-logo.png"; // Ensure this path is correct
import snookerImg from "../assets/snooker.png"; // Import the snooker image

const KnowMoreModal = ({ onClose }) => {
  const modalRef = useRef();
  const transitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: { duration: 200 }, // Consistent with ExperienceModal.jsx
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

  const professionalSummary = `
Hey, I'm Rohit Kamineni, a Data Engineer passionate about building data solutions.
I architect scalable data and machine learning systems with a focus on automation and real-time analytics.
My goal is to empower decision-making and drive positive change.
I'm driven by turning complex information into compelling stories and building impactful solutions.
`;

  const highlights = [
    "Data Engineer with 4+ years of experience",
    "Data enthusiast & lifelong learner",
    "Passionate about building scalable data and machine learning solutions",
    "Experienced in cloud-native enterprise environments (GCP, Databricks, Airflow, Vertex AI)",
    "Strong focus on automation, real-time analytics, and data-driven decision-making",
    "Proven ability to transform business processes",
    "Loves collaborating with diverse teams on challenging projects",
    "Dedicated to making education and technology accessible to everyone",
    "Enjoys hackathons and building with friends",
    "Always up for a good coffee chat",
  ];

  const moreInfo = {
    "Languages I Speak": [
      "English – Native or bilingual",
      "Telugu – Native or bilingual",
      "Hindi – Full professional",
      "Tamil – Limited working"
    ],
    "Volunteering & Impact": [
      <>
        <img
          src={nirmaanLogo}
          alt="Nirmaan Logo"
          className="inline w-12 h-12 mr-4 align-middle"
        />
        From 2010 to 2012, I led STEM programs for students in orphanages through the Nirmaan Organization.  This involved designing and delivering interactive sessions aimed at sparking curiosity, building confidence, and making science fun and accessible.
      </>,
    ],
    "What Drives Me": [
      "I believe everyone deserves a fair shot at education and tech opportunities.",
      "I'm all about collaborating with people from all backgrounds—especially when the stakes are high and the mission matters.",
      "I'm driven by the desire to use technology to solve real-world problems and create positive change."
    ]
  };

  const hobbies = [
    { label: "Formula 1", icon: <FaCar />, color: "#1d6fba" },
    { label: "Cue Sports", icon: <img src={snookerImg} alt="Snooker" style={{ width: '24px', height: '24px' }} />, color: "#1d6fba" },
    { label: "Cricket", icon: <FaBaseballBatBall />, color: "#1d6fba" },
    { label: "Chess", icon: <FaChessKnight />, color: "#1d6fba" },
    { label: "Cooking", icon: <FaUtensils />, color: "#1d6fba" },
    { label: "Travel", icon: <FaPlane />, color: "#1d6fba" },
    { label: "Music", icon: <FaMusic />, color: "#1d6fba" },
    { label: "Movies", icon: <FaFilm />, color: "#1d6fba" },
    { label: "Hiking", icon: <MdHiking />, color: "#1d6fba" },
    { label: "Cats", icon: <FaCat />, color: "#1d6fba" },
    { label: "Dogs", icon: <FaDog />, color: "#1d6fba" },
    { label: "Tech", icon: <FaCode />, color: "#1d6fba" },
    { label: "Board Games", icon: <FaDice />, color: "#1d6fba" },
    { label: "Fitness", icon: <RiRunFill />, color: "#1d6fba" },
    { label: "Learning", icon: <FaUsers />, color: "#1d6fba" },
  ];

  const socials = [
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/rohit_kamineni/",
      label: "Instagram",
      brand: "#E4405F"
    },
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/rohit.kamineni.01/",
      label: "Facebook",
      brand: "#1877F3"
    },
    {
      icon: <FaXTwitter />,
      url: "https://x.com/rohit_kamineni",
      label: "X",
      brand: "#000000"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            ref={modalRef}
            className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl transition"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-accent mb-6 text-center">
              Know More About Me
            </h3>

            {/* Professional Summary */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                Professional Summary
              </h4>
              <p className="text-gray-700 text-base leading-relaxed">
                {professionalSummary}
              </p>
            </section>

            {/* Volunteering & Impact */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                Volunteering & Impact
              </h4>
              <div className="flex items-start gap-4">
                <img
                  src={nirmaanLogo}
                  alt="Nirmaan Logo"
                  className="w-16 h-16 mt-1"
                />
                <p className="text-gray-700 text-base leading-relaxed">
                  From 2010 to 2012, I led STEM programs for students in orphanages through the Nirmaan Organization. This involved designing and delivering interactive sessions aimed at sparking curiosity, building confidence, and making science fun and accessible.
                </p>
              </div>
            </section>

            {/* Hobbies and Interests */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                Hobbies & Interests
              </h4>
              <ul className="flex flex-wrap gap-3 text-sm">
                {hobbies.map((hobby, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 transition text-gray-700"
                    style={{ color: hobby.color }}
                  >
                    {hobby.icon}
                    {hobby.label}
                  </li>
                ))}
              </ul>
            </section>

            {/* What Drives Me */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                What Drives Me
              </h4>
              <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
                {moreInfo["What Drives Me"].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Languages I Speak */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                Languages I Speak
              </h4>
              <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
                {moreInfo["Languages I Speak"].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Highlights */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                Highlights
              </h4>
              <ul className="flex flex-wrap gap-2">
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Social Icons */}
            <div className="text-center mt-10 flex justify-center gap-6">
              <p className="text-gray-700 italic">
                Connect with me on my socials!
              </p>
              {socials.map(({ icon, url, label, brand }, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition transform hover:scale-110"
                  style={{
                    color: "#b0b0b0",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = brand;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#b0b0b0";
                  }}
                >
                  <span className="text-3xl">{icon}</span>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={onClose}
                className="bg-accent text-white px-6 py-2 rounded hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </animated.div>
        ) : null
      )}
      <div className="fixed inset-0 -z-10 backdrop-blur-sm" onClick={onClose} />
    </div>
  );
};

export default KnowMoreModal;
