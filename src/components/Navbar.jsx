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

  // ScrollSpy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (clickedSectionRef.current) {
          setActiveSection(clickedSectionRef.current);
          clickedSectionRef.current = null;
          return;
        }

        if (visible.length === 1) {
          setActiveSection(visible[0].target.id);
        } else if (visible.length > 1) {
          const sorted = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          const majorVisible = sorted.find(
            (entry) => entry.intersectionRatio > 0.6
          );
          setActiveSection(
            majorVisible?.target.id || sorted[0].target.id
          );
        }
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Transparent to white navbar transition
  useEffect(() => {
    const handleScroll = () => {
      const textTop = document
        .getElementById("hero-text")
        ?.getBoundingClientRect().top;

      setIsScrolled(textTop <= 70); // just before text starts
    };

    handleScroll(); // On load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    clickedSectionRef.current = id;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

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

        <div
          className={`md:flex md:space-x-6 font-medium text-gray-700 text-sm ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`block py-2 md:py-0 relative capitalize transition duration-300 group ${
                activeSection === id
                  ? "text-accent font-bold"
                  : "hover:text-accent"
              }`}
            >
              <span>{id}</span>
              {/* Hover underline effect */}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full ${
                  activeSection === id ? "w-full" : "w-0"
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
