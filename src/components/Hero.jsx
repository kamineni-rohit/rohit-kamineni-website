import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaFolder, FaEnvelope } from "react-icons/fa"; // Import icons
import { SiKaggle, SiMedium } from "react-icons/si";
import { FiChevronDown } from "react-icons/fi";
import ContactFormModal from "./ContactFormModal";
import ParticlesBackground from "./ParticlesBackground";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center px-4">
      <ParticlesBackground />

      <div id="hero-text" className="relative z-20 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide text-accent">
          Rohit Kamineni
        </h1>

        {/* Modern and Elevated Separator */}
        <div className="flex items-center justify-center w-64 my-4">
          <div className="h-[2px] bg-gradient-to-r from-gray-300 to-accent w-20 opacity-70 rounded-full"></div>
          <span className="text-accent text-xl px-3 font-semibold">
            &lt;&gt;
          </span>
          <div className="h-[2px] bg-gradient-to-r from-accent to-gray-300 w-20 opacity-70 rounded-full"></div>
        </div>

        <p className="mt-2 max-w-xl sm:max-w-2xl text-base sm:text-lg text-gray-700 leading-relaxed">
          👋 Data Engineer | Analyst | Scientist — I specialize in building
          real-time pipelines, analytical dashboards, and scalable ML systems that
          drive business transformation.
        </p>

        <div className="flex space-x-6 mt-8 text-3xl text-gray-600">
          <a
            href="https://linkedin.com/in/rohit-kamineni"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0077B5]" // LinkedIn blue
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/kamineni-rohit"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black"
          >
            <FaGithub />
          </a>
          <a
            href="https://medium.com/@kaminenirohit1"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#00ab6c]" // Medium green
          >
            <SiMedium />
          </a>
          <a
            href="https://www.kaggle.com/rohitkamineni"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#20beff]" // Kaggle blue
          >
            <SiKaggle />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-10 space-y-4 sm:space-y-0">
          <button
            onClick={scrollToProjects}
            className="px-6 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-white transition rounded flex items-center" // Added flex and items-center
          >
            <FaFolder className="mr-2" /> {/* Add icon here, margin-right for spacing */}
            Portfolio
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-white transition rounded flex items-center" // Added flex and items-center
          >
            <FaEnvelope className="mr-2" />
            Reach Out to Me
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-10 text-accent text-4xl cursor-pointer animate-bounce z-20"
        onClick={scrollToAbout}
      >
        <FiChevronDown />
      </div>

      {showModal && <ContactFormModal onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default Hero;
