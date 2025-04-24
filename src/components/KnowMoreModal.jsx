import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import nirmaanLogo from "../assets/nirmaan-logo.png"; // Ensure this path is correct

const professionalSummary = `Hi, I'm Rohit Kamineni! I'm driven by a passion for making education and technology accessible to everyone. My journey has taken me from leading STEM programs in local communities to collaborating with diverse teams on challenging projects. I thrive when I'm helping others grow, whether that's through mentoring, volunteering, or building solutions that make a difference. Let’s connect and create something impactful together!`;

const moreInfo = {
  "Languages I Speak": [
    "English – Native or bilingual",
    "Hindi – Full professional",
    "Telugu – Native or bilingual",
    "Tamil – Limited working"
  ],
  "Volunteering & Impact": [
    <>
      <img src={nirmaanLogo} alt="Nirmaan Logo" className="inline w-6 h-6 mr-2 align-middle" />
      Led STEM programs for students in orphanages via Nirmaan Organization
    </>,
    "Mentored school children at government schools to foster curiosity and confidence"
  ],
  "What Drives Me": [
    "I believe everyone deserves a fair shot at education and tech opportunities.",
    "I love collaborating with people from all backgrounds—especially when the stakes are high and the mission matters."
  ]
};

const highlights = [
  "React enthusiast & lifelong learner",
  "Enjoys hackathons and building with friends",
  "Always up for a good coffee chat"
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
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

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
            <h3 className="text-2xl font-bold text-accent mb-6 text-center">Know More About Me</h3>
            
            {/* Professional Summary */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">Professional Summary</h4>
              <p className="text-gray-700 text-base leading-relaxed">{professionalSummary}</p>
            </section>

            {/* Highlights */}
            <section className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">Highlights</h4>
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

            {/* More Info Sections */}
            <div className="space-y-6">
              {Object.entries(moreInfo).map(([category, list], idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-800 mb-2">{category}</h4>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="text-center mt-10 flex justify-center gap-6">
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
                  onMouseEnter={e => { e.currentTarget.style.color = brand; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#b0b0b0"; }}
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
    </div>
  );
};

export default KnowMoreModal;
