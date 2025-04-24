import { useState } from "react";
import profileImage from "../assets/IMG-20241206-WA0012.jpg";
import SectionBackground from "./SectionBackground";
import waveLineBg from "../assets/WaveLine.svg";
import ExperienceModal from "./ExperienceModal";
import SkillsModal from "./SkillsModal";
import KnowMoreModal from "./KnowMoreModal";
import { FiChevronDown, FiBriefcase, FiCode, FiUsers } from "react-icons/fi";
import tcubeLogo from "../assets/tcube-logo.png";
import krogerLogo from "../assets/kroger-logo.png";

const About = () => {
  const [showExperience, setShowExperience] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const timelineItems = [
    {
      date: "2019 – 2023",
      title: "Data Engineer",
      org: "Kroger Technology & Digital",
      icon: <FiCode className="text-accent" />,
      logo: krogerLogo,
      desc: "Led scalable ETL pipelines, built real-time analytics on GCP, and implemented MLOps on Vertex AI.",
    },
    {
      date: "2019",
      title: "SDE – CX Web Products & Search",
      org: "Kroger Technology & Digital",
      icon: <FiCode className="text-accent" />,
      logo: krogerLogo,
      desc: "Built Products BFF for 15M+ daily requests; migrated APIs to a 3-tier Kubernetes architecture.",
    },
    {
      date: "2019",
      title: "Data Engineer",
      org: "Tcube",
      icon: <FiCode className="text-accent" />,
      logo: tcubeLogo,
      desc: "Designed Python/SQL pipelines for logistics data and enabled real-time KPI dashboards.",
    },
  ];

  return (
    <section id="about" className="min-h-screen bg-gray-50 py-24 px-6 md:px-20 flex justify-center relative overflow-hidden">
      <SectionBackground imageSrc={waveLineBg} opacity={0.08} />

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Hi, I'm Rohit.</h2>
            <p className="text-gray-700 text-lg mb-6">
              I’m a versatile Data Engineer, Analyst, and Scientist with a strong track record of building end-to-end data solutions — from ingestion pipelines and transformation workflows to advanced ML model deployments and intuitive BI dashboards.
              <br /><br />
              With experience across GCP, AWS, and Kubernetes, I bridge engineering reliability with analytical depth and statistical rigor to solve business problems at scale.
            </p>
          </div>

          <div className="w-full space-y-8">
            <div className="relative pl-6 border-l-4 border-accent">
              {timelineItems.map((item, index) => (
                <div key={index} className="mb-6 relative">
                  <div className="absolute -left-[28px] top-1 bg-accent text-white rounded-full p-1">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-3 mb-1">
                    <img src={item.logo} alt={item.org} className="h-5 w-5" />
                    <div className="text-accent font-semibold">{item.date}</div>
                  </div>
                  <div className="text-lg font-bold">{item.title}</div>
                  <div className="text-sm italic text-gray-600 mb-1">{item.org}</div>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <img
            src={profileImage}
            alt="Rohit Kamineni"
            className="w-96 h-96 object-cover rounded-2xl shadow-lg"
          />
          <button
            className="bg-accent text-white px-6 py-2 rounded-md hover:opacity-90 transition"
            onClick={() => setShowExperience(true)}
          >
            View Detailed Experience
          </button>
          <button
            className="bg-accent text-white px-6 py-2 rounded-md hover:opacity-90 transition"
            onClick={() => setShowSkills(true)}
          >
            Full Skillset
          </button>
          <button
            className="bg-accent text-white px-6 py-2 rounded-md hover:opacity-90 transition"
            onClick={() => setShowMore(true)}
          >
            Know More About Me
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-accent text-4xl cursor-pointer animate-bounce">
        <FiChevronDown onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} />
      </div>

      {showExperience && <ExperienceModal onClose={() => setShowExperience(false)} />}
      {showSkills && <SkillsModal onClose={() => setShowSkills(false)} />}
      {showMore && <KnowMoreModal onClose={() => setShowMore(false)} />}
    </section>
  );
};

export default About;
