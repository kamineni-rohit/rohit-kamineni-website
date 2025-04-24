import { useState } from "react";
import profileImage from "../assets/IMG-20241206-WA0012.jpg";
import SectionBackground from "./SectionBackground";
import waveLineBg from "../assets/WaveLine.svg";
import ExperienceModal from "./ExperienceModal";
import SkillsModal from "./SkillsModal";
import KnowMoreModal from "./KnowMoreModal";
import { FiChevronDown } from "react-icons/fi";
import tcubeLogo from "../assets/tcube-logo.png";
import krogerLogo from "../assets/kroger-logo.png";

const About = () => {
  const [showExperience, setShowExperience] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      id="about"
      className="min-h-screen bg-gray-50 py-24 px-4 md:px-20 flex justify-center items-center relative overflow-hidden"
    >
      <SectionBackground imageSrc={waveLineBg} opacity={0.08} />

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-start gap-10">
        {/* Left Column */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Hi, I'm Rohit.</h2>
          <p className="text-gray-700 text-lg mb-10">
            I’m a versatile <strong>Data Engineer</strong>, <strong>Analyst</strong>, and <strong>Scientist</strong> with a strong track record of building end-to-end data solutions — from <strong>ingestion pipelines</strong> and <strong>transformation workflows</strong> to advanced <strong>ML model deployments</strong> and intuitive <strong>BI dashboards</strong>.
            <br /><br />
            With experience across <strong>GCP</strong>, <strong>AWS</strong>, and <strong>Kubernetes</strong>, I bridge engineering reliability with analytical depth and statistical rigor to solve business problems at scale.
          </p>

          {/* Timeline */}
          <div className="relative mt-8">
            <div className="grid grid-cols-[32px_1fr] gap-6">
              {/* Timeline Column */}
              <div className="flex flex-col items-center relative h-full">
                {/* Dot 1 */}
                <span className="w-3 h-3 rounded-full bg-accent z-10" />
                {/* Line 1 */}
                <div className="flex-1 w-1 bg-accent mt-1.5 mb-1.5" />
                {/* Dot 2 */}
                <span className="w-3 h-3 rounded-full bg-accent z-10" />
                {/* Line 2 */}
                <div className="flex-1 w-1 bg-accent mt-1.5 mb-1.5" />
                {/* Dot 3 */}
                <span className="w-3 h-3 rounded-full bg-accent z-10" />
                {/* Line 3 */}
                <div className="flex-1 w-1 bg-accent mt-1.5 mb-1.5" />
                {/* Dot 4 */}
                <span className="w-3 h-3 rounded-full bg-accent z-10" />
              </div>

              {/* Entries Column */}
              <div className="flex flex-col justify-between h-full gap-4">
                {/* Entry 1 */}
                <div className="flex flex-col justify-center min-h-[120px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-accent font-semibold text-sm">2019 – 2023</span>
                    <a
                      href="https://www.linkedin.com/company/kroger-technology-and-digital/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={krogerLogo} alt="Kroger" className="h-6 w-auto" />
                    </a>
                  </div>
                  <div className="text-lg font-bold">Data Engineer</div>
                  <div className="text-sm italic text-gray-600 mb-1">Kroger Technology & Digital</div>
                  <p className="text-sm text-gray-700">
                    Led scalable <strong>ETL pipelines</strong>, built <strong>real-time analytics</strong> on GCP, and implemented <strong>MLOps</strong> on Vertex AI.
                  </p>
                </div>
                {/* Entry 2 */}
                <div className="flex flex-col justify-center min-h-[120px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-accent font-semibold text-sm">2019</span>
                    <a
                      href="https://www.linkedin.com/company/kroger-technology-and-digital/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={krogerLogo} alt="Kroger" className="h-6 w-auto" />
                    </a>
                  </div>
                  <div className="text-lg font-bold">SDE – CX Web Products & Search</div>
                  <div className="text-sm italic text-gray-600 mb-1">Kroger Technology & Digital</div>
                  <p className="text-sm text-gray-700">
                    Built Products BFF for <strong>15M+</strong> daily requests; migrated APIs to a <strong>3-tier Kubernetes</strong> architecture.
                  </p>
                </div>
                {/* Entry 3 */}
                <div className="flex flex-col justify-center min-h-[120px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-accent font-semibold text-sm">2019</span>
                    <a
                      href="https://www.linkedin.com/company/tcube360/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={tcubeLogo} alt="Tcube" className="h-6 w-auto" />
                    </a>
                  </div>
                  <div className="text-lg font-bold">Data Engineer</div>
                  <div className="text-sm italic text-gray-600 mb-1">Tcube</div>
                  <p className="text-sm text-gray-700">
                    Designed <strong>Python/SQL</strong> pipelines for logistics data and enabled <strong>real-time KPI dashboards</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center gap-6 w-full md:w-auto">
          <img
            src={profileImage}
            alt="Rohit Kamineni"
            className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl shadow-lg mb-6"
          />
          <button
            onClick={() => setShowExperience(true)}
            className="bg-accent text-white px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            View Detailed Experience
          </button>
          <button
            onClick={() => setShowSkills(true)}
            className="bg-accent text-white px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Full Skillset
          </button>
          <button
            onClick={() => setShowMore(true)}
            className="bg-accent text-white px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Know More About Me
          </button>
        </div>
      </div>

      {/* Chevron */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-accent text-4xl cursor-pointer animate-bounce z-20">
        <FiChevronDown
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </div>

      {/* Modals */}
      {showExperience && <ExperienceModal onClose={() => setShowExperience(false)} />}
      {showSkills && <SkillsModal onClose={() => setShowSkills(false)} />}
      {showMore && <KnowMoreModal onClose={() => setShowMore(false)} />}
    </section>
  );
};

export default About;
