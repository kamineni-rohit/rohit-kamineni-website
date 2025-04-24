// Updated About.jsx with timeline redesign and modal triggers
import profileImage from "../assets/IMG-20241206-WA0012.jpg";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import SectionBackground from "./SectionBackground";
import ExperienceModal from "./DetailedExperienceModal";
import SkillsetModal from "./FullSkillsetModal";
import MoreAboutMeModal from "./KnowMoreAboutMeModal";
import waveLineBg from "../assets/WaveLine.svg";
import { FaGraduationCap, FaChalkboardTeacher, FaTrophy } from "react-icons/fa";

const About = () => {
  const [showExperience, setShowExperience] = useState(false);
  const [showSkillset, setShowSkillset] = useState(false);
  const [showMoreAbout, setShowMoreAbout] = useState(false);

  return (
    <section
      id="about"
      className="min-h-screen bg-gray-50 py-24 px-6 md:px-20 flex justify-center relative overflow-hidden"
    >
      <SectionBackground imageSrc={waveLineBg} opacity={0.08} />
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Hi, I'm Rohit.</h2>
            <p className="text-gray-700 text-lg mb-6">
              I’m a versatile Data Engineer, Analyst, and Scientist with a strong
              track record of building end-to-end data solutions — from ingestion
              pipelines and transformation workflows to advanced ML model
              deployments and intuitive BI dashboards.
              <br />
              <br />
              With experience across GCP, AWS, and Kubernetes, I bridge
              engineering reliability with analytical depth and statistical rigor
              to solve business problems at scale.
            </p>
          </div>
          <div className="w-full space-y-10 pl-6 border-l-4 border-accent relative">
            <div className="absolute top-0 left-[-9px] w-4 h-4 bg-accent rounded-full"></div>
            <div>
              <div className="text-accent font-semibold">2019 – 2023</div>
              <div className="text-lg font-bold">Data Engineer</div>
              <div className="text-sm italic text-gray-600 mb-1">Kroger Technology & Digital</div>
              <p className="text-gray-700">
                Led scalable <strong>ETL pipelines</strong>, built <strong>real-time analytics</strong> on GCP,
                and implemented <strong>MLOps</strong> on Vertex AI.
              </p>
            </div>
            <div>
              <div className="text-accent font-semibold">2019</div>
              <div className="text-lg font-bold">SDE – CX Web Products & Search</div>
              <div className="text-sm italic text-gray-600 mb-1">Kroger Technology & Digital</div>
              <p className="text-gray-700">
                Built Products BFF for 15M+ daily requests; migrated APIs to a 3-tier <strong>Kubernetes</strong> architecture.
              </p>
            </div>
            <div>
              <div className="text-accent font-semibold">2019</div>
              <div className="text-lg font-bold">Data Engineer</div>
              <div className="text-sm italic text-gray-600 mb-1">Tcube</div>
              <p className="text-gray-700">
                Designed <strong>Python/SQL</strong> pipelines for logistics data and enabled real-time <strong>KPI dashboards</strong>.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            src={profileImage}
            alt="Rohit Kamineni"
            className="w-96 h-96 object-cover rounded-2xl shadow-lg"
          />
          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              onClick={() => setShowExperience(true)}
              className="bg-accent text-white py-2 px-4 rounded hover:opacity-90 transition"
            >
              View Detailed Experience
            </button>
            <button
              onClick={() => setShowSkillset(true)}
              className="bg-accent text-white py-2 px-4 rounded hover:opacity-90 transition"
            >
              Full Skillset
            </button>
            <button
              onClick={() => setShowMoreAbout(true)}
              className="bg-accent text-white py-2 px-4 rounded hover:opacity-90 transition"
            >
              Know More About Me
            </button>
          </div>
        </div>
      </div>

      {showExperience && <ExperienceModal onClose={() => setShowExperience(false)} />}
      {showSkillset && <SkillsetModal onClose={() => setShowSkillset(false)} />}
      {showMoreAbout && <MoreAboutMeModal onClose={() => setShowMoreAbout(false)} />}

      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-accent text-4xl cursor-pointer animate-bounce"
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
      >
        <FiChevronDown />
      </div>
    </section>
  );
};

export default About;
