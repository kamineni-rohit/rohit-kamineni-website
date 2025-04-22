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
  const [isOpen, setIsOpen] = useState(false);
  const clickedSectionRef = useRef(null);
  const dropdownRef = useRef(null);

  // Scroll-based logic
  useEffect(() => {
    const handleScroll = () => {
      const heroText = document.getElementById("hero-text");
      if (heroText) {
        const rect = heroText.getBoundingClientRect();
        // Trigger background transition just *before* the title hits the nav
        setIsScrolled(rect.top <= 140);
        if (rect.top > 140) {
          setActiveSection("");
          return;
        }
      }

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

      const contact = sections.find((s) => s.id === "contact");
      if (contact) {
        setActiveSection("contact");
        return;
      }

      const resume = sections.find((s) => s.id === "resume");
      if (resume && !contact) {
        setActiveSection("resume");
        return;
      }

      const sorted = sections.sort((a, b) => a.rect.top - b.rect.top);
      setActiveSection(sorted[0].id);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const resetClick = () => {
      clickedSectionRef.current = null;
    };
    window.addEventListener("scroll", resetClick);
    return () => window.removeEventListener("scroll", resetClick);
  }, []);

  const handleNavClick = (id) => {
    clickedSectionRef.current = id;
    setActiveSection(id);
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

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

        {/* Desktop Nav */}
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
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full ${
                  activeSection === id ? "w-0" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="md:hidden bg-white shadow-md px-6 pb-4 pt-2 space-y-2"
        >
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`block w-full text-left capitalize transition duration-300 group ${
                activeSection === id
                  ? "text-accent font-bold"
                  : "text-gray-700 hover:text-accent"
              }`}
            >
              <span className="relative">
                {id}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full ${
                    activeSection === id ? "w-0" : "w-0"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
