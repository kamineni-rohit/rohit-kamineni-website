import { useState, useEffect, useRef } from "react";
import {
  FiChevronDown,
  FiDatabase,
  FiBarChart2,
  FiCpu,
  FiTrendingUp,
  FiCode,
  FiUsers,
  FiPackage,
  FiHeart,
  FiClipboard,
  FiTool,
  FiGithub,
  FiDollarSign,
  FiGrid, 
  FiPieChart, 
  FiNavigation2,
  FiMapPin,       
  FiShoppingCart, 
  FiMessageSquare,
  FiEdit3,        
  FiZap           
} from "react-icons/fi";
import { FaUber, FaStackOverflow } from "react-icons/fa"; 
import { TbBrandMcdonalds } from "react-icons/tb";       

import SectionBackground from "./SectionBackground"; 
import hexagonBg from "../assets/backgrounds/Hexagon.svg"; 

// --- Constants ---
const INITIAL_PROJECTS_TO_SHOW = 8; 

// --- Data ---
const projectCategories = [
  { name: "All Projects", icon: FiGrid },
  { name: "Data Engineering", icon: FiDatabase },
  { name: "Analytics", icon: FiBarChart2 },
  { name: "Data Science", icon: FiCpu },
  { name: "Data Visualizations", icon: FiPieChart },
  { name: "In Progress", icon: FiTool },
];

const projectsData = [
  {
    title: "Databricks Retail Insights",
    desc: "Built ETL pipelines on Databricks for customer segmentation. Achieved 20% ROI improvement.",
    categories: ["All Projects", "Data Engineering", "Analytics"],
    icon: FiDatabase, 
  },
  {
    title: "Uber Data Analytics Pipeline",
    desc: "End-to-end pipeline on GCP using Mage, BigQuery, and Looker for demand/supply insights.",
    categories: ["All Projects", "Data Engineering", "Analytics"],
    icon: FaUber, 
  },
  {
    title: "Cryptocurrency Price Prediction",
    desc: "ML model with ensemble methods; achieved 76.5% F1 score using engineered features.",
    categories: ["All Projects", "Data Science"],
    icon: FiDollarSign, 
  },
  {
    title: "StackOverflow Developer Trends",
    desc: "Analyzed GitHub repos via BigQuery to uncover dev patterns. Engineered SQL dashboards.",
    categories: ["All Projects", "Data Visualizations", "Analytics"],
    icon: FaStackOverflow, 
  },
  {
    title: "CommonCrawl Inflation Tracker",
    desc: "Built Spark-based ETL using Athena + EMR for category-level inflation metrics.",
    categories: ["All Projects", "Data Engineering", "Analytics"],
    icon: FiTrendingUp, 
  },
  {
    title: "Sales Forecasting – Superstore",
    desc: "Used ARIMA + Exponential Smoothing to uncover demand trends across regions.",
    categories: ["All Projects", "Data Science", "Analytics"],
    icon: FiShoppingCart, 
  },
  {
    title: "McDigest – McDonald's Reviews Analysis",
    desc: "Used SAS Miner to uncover insights from 33K+ reviews. Boosted satisfaction metrics by 20%.",
    categories: ["All Projects", "Data Science", "Analytics"],
    icon: TbBrandMcdonalds, 
  },
  {
    title: "Travelogy – SQL Travel Engine",
    desc: "Designed normalized schema + ERD for search/feedback; reduced retrieval time by 30%.",
    categories: ["All Projects", "Data Engineering", "Data Visualizations"],
    icon: FiMapPin, 
  },
  {
    title: "Supply Chain Inventory Optimizer",
    desc: "Optimizing stock levels using ML forecasting models.",
    categories: ["All Projects", "Data Science"],
    icon: FiPackage, 
  },
  {
    title: "Healthcare Claims Analyzer",
    desc: "Built ETL and dashboard system for insurance fraud detection.",
    categories: ["All Projects", "Analytics"],
    icon: FiHeart, 
  },
  {
    title: "Stochastic Optimization for Trading",
    desc: "15-minute S&P 500 interval strategy using stochastic methods. In progress.",
    categories: ["In Progress", "Data Science"],
    icon: FiTrendingUp, 
  },
  {
    title: "Market Jump Predictor",
    desc: "Building classifier models on CRSP tick data. Experimental phase.",
    categories: ["In Progress", "Data Science"],
    icon: FiZap, 
  },
];

// --- Helper Function to Get Icon ---
const getProjectIcon = (project) => {
  if (project.icon) return project.icon;
  return FiClipboard; // Default fallback
};

// --- Component ---
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null); 

  // Filter projects based on the active category
  const filteredProjects = projectsData.filter((project) =>
    activeCategory === "All Projects"
      ? project.categories.includes("All Projects")
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
    if (document.getElementById(scriptId) || window.VanillaTilt) { // Check if script or VanillaTilt itself exists
      // If script is already loaded, ensure VanillaTilt is initialized on current tiles
      if (window.VanillaTilt) {
        const elements = document.querySelectorAll('.project-tile-tilt');
        VanillaTilt.init(elements, { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
      }
      return; 
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.2/vanilla-tilt.min.js';
    script.async = true;
    script.onload = () => {
      window.vanillaTiltLoaded = true; // Flag to indicate script has loaded
      if (window.VanillaTilt) {
        const elements = document.querySelectorAll('.project-tile-tilt');
        VanillaTilt.init(elements, { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
      }
    };
    document.body.appendChild(script);
    // No cleanup needed for a CDN script that's intended to be global once loaded.
  }, []); // Load script once on mount

  // Effect for re-initializing VanillaTilt when projectsToDisplay changes (e.g., after "Show More")
  useEffect(() => {
    if (window.VanillaTilt && window.vanillaTiltLoaded) {
      // Timeout to allow DOM to update with new tiles before initializing
      setTimeout(() => {
        const elements = document.querySelectorAll('.project-tile-tilt');
        VanillaTilt.init(elements, { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
      }, 100); // Small delay
    }
  }, [projectsToDisplay]); // Re-run when the list of displayed projects changes

  const handleShowMore = () => setShowAll(true);
  const scrollToNextSection = () =>
    document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });

  const tileHeightClass = showAll ? 'h-56' : 'h-48'; 

  return (
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
              {projectCategories.map((cat) => {
                const IconComponent = cat.icon; 
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
            const IconComponent = getProjectIcon(project); 
            return (
              <div
                key={index}
                // Added 'project-tile-tilt' for vanilla-tilt.js
                // Added 'group-hover:scale-103' and 'group-hover:shadow-xl'
                // Ensured 'transform-style: preserve-3d' for better tilt rendering if children are transformed
                className={`project-tile-tilt group relative bg-white rounded-xl shadow-md border border-gray-100 
                            transition-all duration-300 ease-in-out 
                            overflow-hidden p-4 cursor-pointer flex items-center justify-center 
                            ${tileHeightClass} hover:shadow-lg group-hover:scale-103 group-hover:shadow-xl`}
                style={{ transformStyle: "preserve-3d" }} // Important for some 3D effects in vanilla-tilt
                // data-tilt attributes can be added here for more control if needed
                // e.g., data-tilt-glare data-tilt-max-glare="0.5"
              >
                {/* Icon with its existing hover effect */}
                <div className="text-accent text-6xl md:text-7xl transition-opacity duration-300 ease-in-out group-hover:opacity-20"
                     style={{ transform: "translateZ(20px)" }} // Slightly lift icon for 3D effect with tilt
                >
                  <IconComponent />
                </div>
                {/* Overlay with its existing hover effect */}
                <div 
                  className="absolute inset-0 bg-black bg-opacity-50 p-4 
                             flex flex-col justify-center items-center text-center 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                  style={{ transform: "translateZ(10px)" }} // Lift overlay slightly
                >
                  {/* Title with reveal animation */}
                  <h3 
                    className="text-base md:text-md font-semibold mb-1 md:mb-2 text-white
                               opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 
                               transition-all duration-300 ease-in-out delay-100"
                  >
                    {project.title}
                  </h3>
                  {/* Description with reveal animation */}
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
  );
};

export default Projects;
