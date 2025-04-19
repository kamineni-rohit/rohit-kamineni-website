import { useEffect, useState } from "react";

const sectionIds = ['about', 'projects', 'education', 'certifications', 'resume', 'contact'];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.1 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-accent font-bold text-xl hover:opacity-80 transition">
          Home
        </a>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <div className={`md:flex md:space-x-6 font-medium text-gray-700 text-sm relative ${isOpen ? 'block' : 'hidden'}`}>
          {sectionIds.map(id => (
            <a
              key={id}
              href={`#${id}`}
              className={`block py-2 md:py-0 relative transition duration-300 capitalize ${
                activeSection === id ? "text-accent font-semibold" : "hover:text-accent"
              }`}
            >
              {id}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-300 ease-in-out ${
                  activeSection === id ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
