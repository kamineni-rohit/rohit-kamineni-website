import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiClipboard, FiGrid } from "react-icons/fi"; 
// Other Fi icons are now primarily sourced from projectsData.js, 
// but keep them if getProjectIcon has complex fallback logic beyond project.icon

// Import data from your new data file
import { projectCategories, projectsData } from "../data/projectsData.js"; 

import SectionBackground from "./SectionBackground"; 
import hexagonBg from "../assets/backgrounds/Hexagon.svg"; 
import ProjectDetailModal from "./ProjectDetailModal"; // Import the new modal

// --- Constants ---
const INITIAL_PROJECTS_TO_SHOW = 8; 

// --- Helper Function to Get Icon ---
// This function will primarily be used if a project object in projectsData *doesn't* have an 'icon' property.
// Given your projectsData.js, all projects have an icon, so this is more of a robust fallback.
const getProjectIcon = (project) => {
  if (project && project.icon) { // Check if project and project.icon exist
    return project.icon; 
  }
  console.warn("Project or project.icon is undefined, using fallback icon for:", project);
  return FiClipboard; // Default fallback
};

// --- Component ---
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null); 

  // State for Project Detail Modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on the active category
  const filteredProjects = projectsData.filter((project) =>
    activeCategory === "All Projects"
      ? project.categories.includes("All Projects") // Ensure "All Projects" is a valid category in your data
      : project.categories.includes(activeCategory)
  );

  const isExpandable = filteredProjects.length > INITIAL_PROJECTS_TO_SHOW;
  const projectsToDisplay = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECTS_TO_SHOW);

  // Effect for Intersection Observer
  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    if (!currentSectionRef) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting && showAll) setShowAll(false); },
      { root: null, threshold: 0 }
    );
    observer.observe(currentSectionRef);
    return () => { if (currentSectionRef) observer.unobserve(currentSectionRef); };
  }, [showAll]);

  // Effect for loading vanilla-tilt.js script
  useEffect(() => {
    const scriptId = 'vanilla-tilt-script';
    if (document.getElementById(scriptId) || window.VanillaTilt) { 
      if (window.VanillaTilt) {
        const elements = document.querySelectorAll('.project-tile-tilt');
        if (elements.length > 0) {
            // eslint-disable-next-line no-undef
            VanillaTilt.init(elements, { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
        }
      }
      return; 
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.2/vanilla-tilt.min.js';
    script.async = true;
    script.onload = () => {
      window.vanillaTiltLoaded = true; 
      if (window.VanillaTilt) {
        const elements = document.querySelectorAll('.project-tile-tilt');
        if (elements.length > 0) {
            // eslint-disable-next-line no-undef
            VanillaTilt.init(elements, { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
        }
      }
    };
    document.body.appendChild(script);
  }, []); 

  // Effect for re-initializing VanillaTilt when projectsToDisplay changes
  useEffect(() => {
    if (window.VanillaTilt && window.vanillaTiltLoaded) {
      setTimeout(() => {
        const elements = document.querySelectorAll('.project-tile-tilt');
         if (elements.length > 0) {
            // eslint-disable-next-line no-undef
            VanillaTilt.init(elements, { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
        }
      }, 100); 
    }
  }, [projectsToDisplay]); 

  const handleShowMore = () => setShowAll(true);
  const scrollToNextSection = () =>
    document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });

  // Handlers for Project Detail Modal
  const handleProjectTileClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay setting selectedProject to null to allow modal fade-out animation
    // Ensure this duration matches your react-spring leave animation config (default is around 200-300ms)
    setTimeout(() => {
      setSelectedProject(null);
    }, 300); 
  };

  const tileHeightClass = showAll ? 'h-56' : 'h-48'; 

  return (
    <> {/* Using React Fragment to wrap section and modal */}
      <section
        ref={sectionRef}
        id="projects"
        className={`relative flex flex-col py-20 transition-all duration-500 ease-in-out ${
          showAll ? 'min-h-screen' : 'min-h-screen max-h-screen overflow-hidden' 
        }`}
      >
        <SectionBackground imageSrc={hexagonBg} opacity={0.09} />

        <div className="relative flex flex-col h-full w-full max-w-7xl mx-auto px-4 md:px-6 z-10 pb-6">
          <div className="flex-shrink-0">
            <h2 className="text-3xl font-bold text-accent mb-4 text-center">
              Projects Portfolio
            </h2>
            <p className="text-gray-700 text-center mb-6 italic">
              A glimpse of the projects I’ve been working on
            </p>
            <div className="mb-8 w-full flex justify-center">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-3 py-2 bg-white border border-accent/20 rounded-full shadow-md backdrop-blur-sm">
                {projectCategories.map((cat) => { // Using projectCategories from imported data
                  const IconComponent = cat.icon || FiGrid; // Fallback for category icon
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setShowAll(false);
                        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`relative flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-300 ease-out group ${
                        isActive
                          ? "text-white bg-accent shadow-lg pl-2 md:pl-3" 
                          : "text-accent hover:bg-accent/10 hover:text-accent-dark"
                      }`}
                    >
                      {IconComponent && (
                        <span
                          className={`overflow-hidden transition-all duration-300 ease-out ${
                            isActive ? "w-4 mr-1.5 opacity-100 scale-100" : "w-0 mr-0 opacity-0 scale-50"
                          }`}
                          style={{ transformOrigin: 'left center' }} 
                        >
                          <IconComponent className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </span>
                      )}
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 w-full pb-2 flex-grow"
          >
            {projectsToDisplay.map((project, index) => {
              // Each project object from projectsData should have an 'icon' property
              const IconComponent = project.icon || FiClipboard; // Use project.icon directly, fallback if needed
              return (
                <div
                  key={project.title + index} // Using title and index for a more unique key
                  onClick={() => handleProjectTileClick(project)} // Open modal on click
                  className={`project-tile-tilt group relative bg-white rounded-xl shadow-md border border-gray-100 
                              transition-all duration-300 ease-in-out 
                              overflow-hidden p-4 cursor-pointer flex items-center justify-center 
                              ${tileHeightClass} hover:shadow-lg group-hover:scale-103 group-hover:shadow-xl`}
                  style={{ transformStyle: "preserve-3d" }} 
                >
                  <div className="text-accent text-6xl md:text-7xl transition-opacity duration-300 ease-in-out group-hover:opacity-20"
                       style={{ transform: "translateZ(20px)" }} 
                  >
                    <IconComponent />
                  </div>
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 p-4 
                               flex flex-col justify-center items-center text-center 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                    style={{ transform: "translateZ(10px)" }} 
                  >
                    <h3 
                      className="text-base md:text-md font-semibold mb-1 md:mb-2 text-white
                                 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 
                                 transition-all duration-300 ease-in-out delay-100"
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="text-xs md:text-xs text-gray-200 line-clamp-3 md:line-clamp-4
                                 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 
                                 transition-all duration-300 ease-in-out delay-200"
                    >
                      {project.desc}
                    </p>
                  </div>
                </div>
              );
            })}
            {projectsToDisplay.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">
                No projects found in this category.
              </div>
            )}
          </div>

          <div className="flex justify-center items-center pt-4 md:pt-6 pb-2 min-h-[54px] flex-shrink-0">
            {isExpandable && !showAll && (
              <button
                onClick={handleShowMore}
                className="px-5 py-2 text-sm bg-accent text-white rounded-full shadow hover:opacity-90 transition"
              >
                Show More
              </button>
            )}
          </div>
        </div>

        <div 
          className="absolute bottom-6 left-0 w-full hidden md:flex justify-center z-20"
          onClick={scrollToNextSection} 
          title="Scroll to next section"  
        >
          <div
            className="text-accent text-4xl cursor-pointer animate-bounce" 
          >
            <FiChevronDown />
          </div>
        </div>
      </section>

      {/* Conditionally render the ProjectDetailModal */}
      {isModalOpen && selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Projects;
