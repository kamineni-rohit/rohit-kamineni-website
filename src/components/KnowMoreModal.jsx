import React, { useEffect, useRef } from "react";
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
  FaGamepad,
  FaCode,
  FaUsers,
  FaTrophy,
} from "react-icons/fa6";
import { MdPool, MdHiking } from "react-icons/md";
import { RiRunFill } from 'react-icons/ri';
//import { SiPoolTable } from 'react-icons/si'; // Removed SiPoolTable
import { GiGamepad } from 'react-icons/gi'; // Using GiGamePad as alternative
import nirmaanLogo from "../assets/nirmaan-logo.png";

const KnowMoreModal = ({ onClose }) => {
  const modalRef = useRef();
  const transitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 220, friction: 20 },
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.body.classList.add('overflow-hidden');
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const professionalSummary = `
Hey there, I'm Rohit Kamineni! I'm that data enthusiast who gets a kick out of turning complex information into compelling stories and building things that make a real difference. My journey has taken me through architecting data systems, diving deep into machine learning, and leading teams to deliver some seriously cool stuff across various industries. I'm all about tackling challenging projects and I'm always up for learning something new.

But beyond the tech, what really drives me is empowering others and building bridges. Whether it's mentoring a student, volunteering in my community, or collaborating with a team to solve a tricky problem, I'm all about using my skills to create opportunities and build connections. I believe in the power of technology to connect people and make the world a better place, and I'm always looking for new ways to contribute to that vision. So, if you're passionate about innovation, collaboration, and making a real impact, let's connect!
`;

  const highlights = [
    "React enthusiast & lifelong learner",
    "Enjoys hackathons and building with friends",
    "Loves a good coffee chat",
    "Passionate about distributed systems and cloud technologies",
    "Experienced in leading cross-functional teams",
    "Strong advocate for data-driven decision making",
    "Dedicated to continuous learning and growth",
    "Enjoys sharing knowledge and mentoring others",
    "Proven ability to translate complex data challenges into scalable solutions",
    "Focused on delivering solutions that are both technically sound and business-aware",
  ];

  const moreInfo = {
    "Languages I Speak": [
      "English – Native or bilingual",
      "Hindi – Full professional",
      "Telugu – Native or bilingual",
      "Tamil – Limited working",
    ],
    "Volunteering & Impact": [
      <>
        <img src={nirmaanLogo} alt="Nirmaan Logo" className="inline w-6 h-6 mr-2 align-middle" />
        Led STEM programs for students in orphanages via Nirmaan Organization, sparking curiosity, building confidence, and making science fun.
      </>,
    ],
    "What Drives Me": [
      "I believe everyone deserves a fair shot at education and tech opportunities.",
      "I'm all about collaborating with people from all backgrounds, especially when the stakes are high and the mission matters.",
      "I'm driven by the desire to use technology to solve real-world problems and create positive change.",
    ],
  };

  const hobbies = [
    { label: "Formula 1", icon: <FaGamepad /> },
    { label: "Cue Sports", icon: <GiGamepad /> }, // Changed to GiGamePad
    { label: "Cricket", icon: <FaGamepad /> },
    { label: "Chess", icon: <FaChessKnight /> },
    { label: "Cooking", icon: <FaUtensils /> },
    { label: "Travel", icon: <FaPlane /> },
    { label: "Music", icon: <FaMusic /> },
    { label: "Movies", icon: <FaFilm /> },
    { label: "Hiking", icon: <MdHiking /> },
    { label: "Cats", icon: <FaCat /> },
    { label: "Dogs", icon: <FaDog /> },
    { label: "Tech", icon: <FaCode /> },
    { label: "Board Games", icon: <FaDice /> },
    { label: "Fitness", icon: <RiRunFill /> },
    { label: "Learning", icon: <FaUsers/>},
    { label: "Winning", icon: <FaTrophy/>}
  ];

  const renderIcon = (icon, defaultClass = "text-lg text-accent") => {
        if (!icon) return null;
        if (React.isValidElement(icon)) {
            return React.cloneElement(icon, { className: `${defaultClass} ${icon.props.className || ''}` });
        }
        return null;
    };

  const socials = [
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/rohit_kamineni/",
      label: "Instagram",
      brand: "#E4405F",
    },
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/rohit.kamineni.01/",
      label: "Facebook",
      brand: "#1877F3",
    },
    {
      icon: <FaXTwitter />,
      url: "https://x.com/rohit_kamineni",
      label: "X",
      brand: "#000000",
    },
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

            {/* Summary */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">Professional Summary</h4>
              <p className="text-gray-700 text-base leading-relaxed">{professionalSummary}</p>
            </section>

            {/* Highlights */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">Highlights</h4>
              <ul className="flex flex-wrap gap-2">
                {highlights.map((item, i) => (
                  <li key={i} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">{item}</li>
                ))}
              </ul>
            </section>

            {/* More Info Sections */}
            <div className="space-y-6">
              {Object.entries(moreInfo).map(([title, items], idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Hobbies */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Hobbies & Interests</h4>
                <ul className="flex flex-wrap gap-3 text-sm">
                  {hobbies.map((hobby, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 border px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 transition text-gray-700"
                    >
                      {renderIcon(hobby.icon)}
                      {hobby.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Socials */}
            <div className="text-center mt-10 flex justify-center gap-6">
              {socials.map(({ icon, url, label, brand }, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition transform hover:scale-110"
                  style={{ color: "#b0b0b0" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = brand; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#b0b0b0"; }}
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

