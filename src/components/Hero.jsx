import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white relative">
      {/* Everything wrapped in #hero-text for navbar scroll transition targeting */}
      <div id="hero-text" className="flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-accent">
          Rohit Kamineni
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
          👋 Data Engineer | Analyst | Scientist — I specialize in building
          real-time pipelines, analytical dashboards, and scalable ML systems that
          drive business transformation.
        </p>

        <div className="flex space-x-6 mt-6 text-2xl text-gray-600">
          <a href="https://github.com/kamineni-rohit" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/rohit-kamineni" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
        </div>

        <div className="flex space-x-4 mt-8">
          <button className="px-6 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-white transition rounded">
            Resume
          </button>
          <button className="px-6 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-white transition rounded">
            Contact
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-10 text-accent text-4xl cursor-pointer animate-bounce"
        onClick={scrollToAbout}
      >
        <FiChevronDown />
      </div>
    </section>
  );
};

export default Hero;
