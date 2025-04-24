import { useState } from "react";
import profileImage from "../assets/IMG-20241206-WA0012.jpg";
import { FiChevronDown } from "react-icons/fi";
import SectionBackground from "./SectionBackground";
import waveLineBg from "../assets/WaveLine.svg";
import ExperienceSkillsModal from "./ExperienceSkillsModal";
import SkillsetModal from "./SkillsetModal";
import MoreAboutMeModal from "./MoreAboutMeModal";

const About = () => {
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showSkillsetModal, setShowSkillsetModal] = useState(false);
  const [showMoreAboutMeModal, setShowMoreAboutMeModal] = useState(false);

  return (
    <section
      id="about"
      className="min-h-screen bg-gray-50 py-24 px-6 md:px-20 flex justify-center relative overflow-hidden"
    >
      <SectionBackground imageSrc={waveLineBg} opacity={0.08} />

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Hi, I'm Rohit.</h2>
            <p className="text-gray-700 text-lg mb-6">
              I’m a versatile Data Engineer, Analyst, and Scientist with a strong
              track record of building end-to-end data solutions — from ingestion
              pipelines and transformation workflows to advanced ML model
              deployments and intuitive BI dashboards.
              <br />
              <br />
              With experience across <strong>GCP</strong>, <strong>AWS</strong>, and <strong>Kubernetes</strong>, 
              I bridge engineering reliability with analytical depth and statistical rigor
              to solve business problems at scale.
            </p>
          </div>

          {/* Timeline */}
          <div className="w-full space-y-8 relative pl-6 border-l-4 border-accent">
            <div className="mb-4">
              <div className="text-accent font-semibold">2019 – 2023</div>
              <div className="text-lg font-bold">Data Engineer</div>
              <div className="text-sm italic text-gray-600 mb-1">
                Kroger Technology & Digital
              </div>
              <p className="text-gray-700">
                Led scalable <strong>ETL pipelines</strong>, built real-time analytics on <strong>GCP</strong>,
                and implemented <strong>MLOps</strong> on <strong>Vertex AI</strong>.
              </p>
            </div>
            <div className="mb-4">
              <div className="text-accent font-semibold">2019</div>
              <div className="text-lg font-bold">Software Development Engineer</div>
              <div className="text-sm italic text-gray-600 mb-1">
                Kroger Technology & Digital
              </div>
              <p className="text-gray-700">
                Built Products BFF for 15M+ daily requests; migrated to a 3-tier
                <strong> Kubernetes</strong> architecture and added <strong>observability</strong> for SLA tracking.
              </p>
            </div>
            <div>
              <div className="text-accent font-semibold">2019</div>
              <div className="text-lg font-bold">Data Engineer</div>
              <div className="text-sm italic text-gray-600 mb-1">Tcube</div>
              <p className="text-gray-700">
                Designed <strong>Python</strong>/<strong>SQL</strong> pipelines for logistics data and enabled
                real-time <strong>KPI dashboards</strong>.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => setShowExperienceModal(true)}
              className="bg-accent text-white px-6 py-2 rounded hover:opacity-90 transition"
            >
              View Detailed Experience
            </button>
            <button
              onClick={() => setShowSkillsetModal(true)}
              className="bg-accent text-white px-6 py-2 rounded hover:opacity-90 transition"
            >
              Full Skillset
            </button>
            <button
              onClick={() => setShowMoreAboutMeModal(true)}
              className="bg-accent text-white px-6 py-2 rounded hover:opacity-90 transition"
            >
              Know More About Me
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center items-start">
          <img
            src={profileImage}
            alt="Rohit Kamineni"
            className="w-96 h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-accent text-4xl cursor-pointer animate-bounce"
        onClick={() =>
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <FiChevronDown />
      </div>

      {/* Modals */}
      {showExperienceModal && (
        <ExperienceSkillsModal onClose={() => setShowExperienceModal(false)} />
      )}
      {showSkillsetModal && (
        <SkillsetModal onClose={() => setShowSkillsetModal(false)} />
      )}
      {showMoreAboutMeModal && (
        <MoreAboutMeModal onClose={() => setShowMoreAboutMeModal(false)} />
      )}
    </section>
  );
};

export default About;
