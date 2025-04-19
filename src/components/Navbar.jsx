import { useEffect, useRef, useState } from "react";

const sectionIds = [
  "about",
  "projects",
  "education",
  "certifications",
  "resume",
  "contact",
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const clickedSectionRef = useRef(null);

  // Scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const heroBottom = document
        .getElementById("hero-text")
        ?.getBoundingClientRect().bottom;

      // Navbar background transition
      setIsScrolled(heroBottom <= 120);

      // Stop section highlighting at top (hero)
      if (heroBottom && heroBottom > 120) {
        setActiveSection("");
        return;
      }

      // Override with click until next scroll
      if (clickedSectionRef.current) return;

      const sections = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          const rect = el?.getBoundingClientRect();
          if (!rect) return null;

          const height = window.innerHeight;
          const visibleHeight = Math.min(rect.bottom, height) - Math.max(rect.top, 0);
          const ratio = visibleHeight / rect.height;

          return {
            id,
            rect,
            visibleRatio: ratio,
          };
        })
        .filter(Boolean)
        .filter((s) => s.visibleRatio > 0.3);

      if (sections.length === 0) {
        setActiveSection("");
        return;
      }

      // Resume > Contact when scrolling up
      const contact = sections.find((s) => s.id === "contact");
      const resume = sections.find((s) => s.id === "resume");
      if (resume && !contact) {
        setActiveSection("resume");
        return;
      }

      // Otherwise highlight the highest visible section (except contact override)
      const sorted = sections.sort((a, b) => a.rect.top - b.rect.top);
      setActiveSection(sorted[0].id);
    };

    handleScroll(); // On load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    clickedSectionRef.current = id;
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleReset = () => {
      clickedSectionRef.current = null;
    };
    window.addEventListener("scroll", handleReset);
    return () => window.removeEventListener("scroll", handleReset);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#"
          className="text-accent font-bold text-xl hover:opacity-80 transition"
        >
          Home
        </a>
        <div className="space-x-6 font-medium text-gray-700 text-sm hidden md:flex">
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`relative capitalize transition duration-300 group ${
                activeSection === id
                  ? "text-accent font-bold"
                  : "hover:text-accent"
              }`}
            >
              <span>{id}</span>
              {/* Hover underline animation only */}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full ${
                  activeSection === id ? "w-0" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
