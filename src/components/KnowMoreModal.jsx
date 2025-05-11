import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import { FiX } from "react-icons/fi"; // Added for the close button
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
  FaBaseballBatBall,
  FaCamera,
  FaMotorcycle,
  FaMugSaucer
} from "react-icons/fa6";
import { MdHiking } from "react-icons/md";
import { RiRunFill } from 'react-icons/ri';
import nirmaanLogo from "../assets/logos/nirmaan-logo.png";
import snookerImg from "../assets/icons/snooker.png";

const KnowMoreModal = ({ onClose }) => {
  const modalRef = useRef();
  // Updated react-spring transition to match ContactFormModal
  const transitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95) translateY(-20px)" },
    enter: { opacity: 1, transform: "scale(1) translateY(0px)" },
    leave: { opacity: 0, transform: "scale(0.95) translateY(20px)" },
    config: { tension: 280, friction: 25 }, // Matching config
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden'; // Lock scroll
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = 'unset'; // Unlock scroll
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const professionalSummary = `Hey! I'm Rohit Kamineni — part data engineer, part problem-solver, part “how-can-we-make-this-better” kind of guy.  
I’m the kind of person who gets excited about clean architecture and clean code (equally). Beyond code, I’m a mentor, an educator, and a huge believer in tech for good. Whether I’m building, presenting, or mentoring, my goal stays the same: make an impact, and make it easy for others to do the same. Oh, and I’m always down for a deep dive into market structure or a quick round of chess in between SQL queries 😄

Over the past 4+ years, I’ve led data engineering efforts at Kroger, architecting production-grade data lakes on GCP, deploying MLOps frameworks on Vertex AI, and building real-time analytics pipelines using Airflow, Kafka, BigQuery, and dbt. My work has driven wins in personalization, scalability, and decision intelligence — from automated loyalty model retraining to empowering 50+ managers with dashboards they actually use.

I’ve thrived in cloud-native enterprise environments and love bridging the technical with the strategic. Whether it’s optimizing a pipeline or mentoring interns through their first build, I’m here for work that matters and people who care.
`;

  const highlights = [
    "Data Profesional with 4+ years of experience",
    "Data enthusiast & lifelong learner",
    "Passionate about building scalable data and machine learning solutions",
    "Experienced in cloud-native enterprise environments (GCP, Databricks, Airflow, Vertex AI)",
    "Strong focus on automation, real-time analytics, and data-driven decision-making",
    "Proven ability to transform business processes",
    "Loves collaborating with diverse teams on challenging projects",
    "Dedicated to making education and technology accessible to everyone",
    "Enjoys hackathons and building with friends",
    "Always up for a good coffee chat"
  ];

  const moreInfo = {
    "Languages I Speak": [
      "English – Native or bilingual",
      "Telugu – Native or bilingual",
      "Hindi – Full professional",
      "Tamil – Limited working"
    ],
    "Volunteering & Impact": [ // Content is now directly in the JSX for this section
    ],
    "What Drives Me": [
      "I believe everyone deserves a fair shot at education and tech opportunities.",
      "I'm all about collaborating with people from all backgrounds—especially when the stakes are high and the mission matters.",
      "I'm driven by the desire to use technology to solve real-world problems and create positive change."
    ]
  };

  const hobbies = [
    { label: "Formula 1", icon: <FaCar size="1.1em"/>, color: "text-accent" },
    { label: "Cue Sports", icon: <img src={snookerImg} alt="Snooker" className="w-[1.1em] h-[1.1em]" />, color: "text-accent" },
    { label: "Cricket", icon: <FaBaseballBatBall size="1.1em"/>, color: "text-accent" },
    { label: "Photography", icon: <FaCamera size="1.1em"/>, color: "text-accent" },
    { label: "Bikes & Cars", icon: <FaMotorcycle size="1.1em"/>, color: "text-accent" },
    { label: "Coffee", icon: <FaMugSaucer size="1.1em"/>, color: "text-accent" },
    { label: "Cafes", icon: <FaMugSaucer size="1.1em"/>, color: "text-accent" },
    { label: "Chess", icon: <FaChessKnight size="1.1em"/>, color: "text-accent" },
    { label: "Cooking", icon: <FaUtensils size="1.1em"/>, color: "text-accent" },
    { label: "Travel", icon: <FaPlane size="1.1em"/>, color: "text-accent" },
    { label: "Music", icon: <FaMusic size="1.1em"/>, color: "text-accent" },
    { label: "Movies", icon: <FaFilm size="1.1em"/>, color: "text-accent" },
    { label: "Hiking", icon: <MdHiking size="1.1em"/>, color: "text-accent" },
    { label: "Cats", icon: <FaCat size="1.1em"/>, color: "text-accent" },
    { label: "Dogs", icon: <FaDog size="1.1em"/>, color: "text-accent" },
    { label: "Tech", icon: <FaCode size="1.1em"/>, color: "text-accent" },
    { label: "Board Games", icon: <FaDice size="1.1em"/>, color: "text-accent" },
    { label: "Fitness", icon: <RiRunFill size="1.1em"/>, color: "text-accent" },
    { label: "Learning", icon: <FaUsers size="1.1em"/>, color: "text-accent" }
  ];

  const socials = [
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/rohit_kamineni/",
      label: "Instagram",
    },
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/rohit.kamineni.01/",
      label: "Facebook",
    },
    {
      icon: <FaXTwitter />,
      url: "https://x.com/rohit_kamineni",
      label: "X",
    }
  ];

  // Common section styles
  const sectionSpacing = "mb-8"; // Increased spacing between sections
  const sectionTitleClasses = "text-xl font-semibold text-slate-700 mb-4"; // Enhanced section titles
  const paragraphClasses = "text-slate-600 text-base leading-relaxed";
  const listClasses = "list-disc pl-5 text-slate-600 text-base space-y-2 leading-relaxed";


  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto">
      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            ref={modalRef}
            // Increased padding and shadow, consistent max-width
            className="bg-white w-full max-w-4xl rounded-xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative"
          >
            {/* Enhanced Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-accent p-1 rounded-full hover:bg-slate-100 transition-colors duration-150 z-10"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
            {/* Enhanced Main Title */}
            <h3 className="text-3xl font-semibold text-accent mb-6 text-center"> 
              A Little More About Me
            </h3>

            {/* Professional Summary */}
            <section className={sectionSpacing}>
              <h4 className={sectionTitleClasses}>
                Professional Snapshot
              </h4>
              <p className={`${paragraphClasses} whitespace-pre-line`}>
                {professionalSummary}
              </p>
            </section>

            {/* Hobbies and Interests - MOVED HERE */}
            <section className={sectionSpacing}>
              <h4 className={sectionTitleClasses}>
                Hobbies & Interests
              </h4>
              <ul className="flex flex-wrap gap-3">
                {hobbies.map((hobby, i) => (
                  <li
                    key={i}
                    // Enhanced hobby tags
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-150 text-sm font-medium ${hobby.color || 'text-accent'}`}
                  >
                    {React.cloneElement(hobby.icon, { className: `h-4 w-4 ${hobby.icon.type === 'img' ? '' : 'mr-0.5'}` })} {/* Ensure icon size consistency */}
                    {hobby.label}
                  </li>
                ))}
              </ul>
            </section>

            {/* Volunteering & Impact - NOW AFTER HOBBIES */}
            <section className={sectionSpacing}>
              <h4 className={sectionTitleClasses}>
                Volunteering & Impact
              </h4>
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                <img
                  src={nirmaanLogo}
                  alt="Nirmaan Logo"
                  className="w-12 h-12 mt-1 flex-shrink-0" // Resized logo
                />
                <p className={paragraphClasses}>
                  From 2016 to 2018, I dedicated time to leading STEM education programs for underprivileged students through the Nirmaan Organization. My role involved designing and delivering interactive sessions aimed at sparking curiosity in science and technology, building confidence, and making learning both fun and accessible.
                </p>
              </div>
            </section>

            {/* What Drives Me */}
            <section className={sectionSpacing}>
              <h4 className={sectionTitleClasses}>
                What Drives Me
              </h4>
              <ul className={listClasses}>
                {moreInfo["What Drives Me"].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Languages I Speak */}
            <section className={sectionSpacing}>
              <h4 className={sectionTitleClasses}>
                Languages I Speak
              </h4>
              <ul className={listClasses}>
                {moreInfo["Languages I Speak"].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Highlights */}
            <section className={sectionSpacing}>
              <h4 className={sectionTitleClasses}>
                Highlights
              </h4>
              <ul className="flex flex-wrap gap-2.5">
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    // Enhanced highlight tags
                    className="bg-accent/10 text-accent px-3.5 py-1.5 rounded-full text-sm font-medium hover:bg-accent/20 transition-colors duration-150"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Social Icons */}
            <div className="text-center mt-10 flex flex-col items-center gap-4">
              <p className={`${paragraphClasses} italic`}>
                Connect with me on my socials!
              </p>
              <div className="flex justify-center gap-6">
                {socials.map(({ icon, url, label }, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    // Enhanced social icons
                    className="text-slate-500 hover:text-accent transition-all duration-200 ease-in-out transform hover:scale-110"
                  >
                    <span className="text-3xl">{icon}</span>
                  </a>
                ))}
              </div>
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
    </div>
  );
};

export default KnowMoreModal;
