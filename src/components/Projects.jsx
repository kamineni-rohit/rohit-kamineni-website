import { useState, useEffect, useRef } from "react";
import {
  FiChevronDown,
  FiDatabase,     // For Data Engineering, Databricks
  FiBarChart2,    // For Analytics
  FiCpu,          // For Data Science
  FiTrendingUp,   // For Prediction, Trends, Trading, Inflation
  FiCode,         // Generic code
  FiUsers,        // Generic user-related
  FiPackage,      // For Supply Chain
  FiHeart,        // For Healthcare
  FiClipboard,    // Default fallback
  FiTool,         // For In Progress, general tools
  FiGithub,       // For GitHub related projects
  FiDollarSign,   // For Crypto, Finance
  FiGrid,         // Icon for "All Projects" category
  FiPieChart,     // Icon for "Data Visualizations" category
  FiNavigation2,  // For Uber (navigation, transport)
  FiMapPin,       // For Travelogy (location, mapping)
  FiShoppingCart, // For Superstore (retail, sales)
  FiMessageSquare,// For StackOverflow (Q&A, forums)
  FiEdit3,        // For McDigest (reviews, analysis)
  FiZap           // For Market Jump Predictor (sudden change, jump)
} from "react-icons/fi";

// Assuming SectionBackground and hexagonBg imports are correct
import SectionBackground from "./SectionBackground"; // Ensure this path is correct
import hexagonBg from "../assets/backgrounds/Hexagon.svg"; // Ensure this path is correct

// --- Constants ---
const INITIAL_PROJECTS_TO_SHOW = 8; // Number of projects to show by default

// --- Data ---
// Updated projectCategories to include icons
const projectCategories = [
  { name: "All Projects", icon: FiGrid },
  { name: "Data Engineering", icon: FiDatabase },
  { name: "Analytics", icon: FiBarChart2 },
  { name: "Data Science", icon: FiCpu },
  { name: "Data Visualizations", icon: FiPieChart },
  { name: "In Progress", icon: FiTool },
];

// Updated projectsData with more specific icons
const projectsData = [
  {
    title: "Databricks Retail Insights",
    desc: "Built ETL pipelines on Databricks for customer segmentation. Achieved 20% ROI improvement.",
    categories: ["All Projects", "Data Engineering", "Analytics"],
    icon: FiDatabase, // Databricks is a data platform
  },
  {
    title: "Uber Data Analytics Pipeline",
    desc: "End-to-end pipeline on GCP using Mage, BigQuery, and Looker for demand/supply insights.",
    categories: ["All Projects", "Data Engineering", "Analytics"],
    icon: FiNavigation2, // Represents Uber's navigation/transport nature
  },
  {
    title: "Cryptocurrency Price Prediction",
    desc: "ML model with ensemble methods; achieved 76.5% F1 score using engineered features.",
    categories: ["All Projects", "Data Science"],
    icon: FiDollarSign, // Closest to a currency/Bitcoin symbol in Fi
  },
  {
    title: "StackOverflow Developer Trends",
    desc: "Analyzed GitHub repos via BigQuery to uncover dev patterns. Engineered SQL dashboards.",
    categories: ["All Projects", "Data Visualizations", "Analytics"],
    icon: FiMessageSquare, // Represents StackOverflow's Q&A nature
  },
  {
    title: "CommonCrawl Inflation Tracker",
    desc: "Built Spark-based ETL using Athena + EMR for category-level inflation metrics.",
    categories: ["All Projects", "Data Engineering", "Analytics"],
    icon: FiTrendingUp, // Represents tracking trends like inflation
  },
  {
    title: "Sales Forecasting – Superstore",
    desc: "Used ARIMA + Exponential Smoothing to uncover demand trends across regions.",
    categories: ["All Projects", "Data Science", "Analytics"],
    icon: FiShoppingCart, // Represents retail/superstore
  },
  {
    title: "McDigest – McDonald's Reviews Analysis",
    desc: "Used SAS Miner to uncover insights from 33K+ reviews. Boosted satisfaction metrics by 20%.",
    categories: ["All Projects", "Data Science", "Analytics"],
    icon: FiEdit3, // Represents reviews/analysis
  },
  {
    title: "Travelogy – SQL Travel Engine",
    desc: "Designed normalized schema + ERD for search/feedback; reduced retrieval time by 30%.",
    categories: ["All Projects", "Data Engineering", "Data Visualizations"],
    icon: FiMapPin, // Represents location/travel
  },
  {
    title: "Supply Chain Inventory Optimizer",
    desc: "Optimizing stock levels using ML forecasting models.",
    categories: ["All Projects", "Data Science"],
    icon: FiPackage, // Good for supply chain/inventory
  },
  {
    title: "Healthcare Claims Analyzer",
    desc: "Built ETL and dashboard system for insurance fraud detection.",
    categories: ["All Projects", "Analytics"],
    icon: FiHeart, // Good for healthcare
  },
  {
    title: "Stochastic Optimization for Trading",
    desc: "15-minute S&P 500 interval strategy using stochastic methods. In progress.",
    categories: ["In Progress", "Data Science"],
    icon: FiTrendingUp, // Good for trading/prediction
  },
  {
    title: "Market Jump Predictor",
    desc: "Building classifier models on CRSP tick data. Experimental phase.",
    categories: ["In Progress", "Data Science"],
    icon: FiZap, // Represents "jump" or sudden change
  },
];

// --- Helper Function to Get Icon ---
// This function serves as a fallback if a project.icon is not explicitly defined.
// With the current setup, all projects in projectsData have an icon defined.
const getProjectIcon = (project) => {
  if (project.icon) {
    return project.icon; // Return assigned icon
  }
  // Fallback logic (less likely to be used now but good for future-proofing)
  const titleLower = project.title.toLowerCase();
  if (titleLower.includes("data") || titleLower.includes("sql") || titleLower.includes("etl")) return FiDatabase;
  if (titleLower.includes("analytic") || titleLower.includes("visual")) return FiBarChart2;
  if (titleLower.includes("science") || titleLower.includes("ml") || titleLower.includes("model")) return FiCpu;
  if (titleLower.includes("trad") || titleLower.includes("financ") || titleLower.includes("predict")) return FiTrendingUp;
  if (project.categories.includes("In Progress")) return FiTool;
  return FiClipboard; // Default fallback
};

// --- Component ---
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null); // Ref for the main section element

  // Filter projects based on the active category
  const filteredProjects = projectsData.filter((project) =>
    activeCategory === "All Projects"
      ? project.categories.includes("All Projects")
      : project.categories.includes(activeCategory)
  );

  // Determine if the "Show More" button should be displayed
  const isExpandable = filteredProjects.length > INITIAL_PROJECTS_TO_SHOW;

  // Determine which projects to display
  const projectsToDisplay = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECTS_TO_SHOW);

  // Effect for Intersection Observer to collapse section when scrolled out of view
  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    if (!currentSectionRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && showAll) {
          setShowAll(false);
        }
      },
      {
        root: null,
        threshold: 0, // Callback when element is 0% visible (leaves viewport)
      }
    );

    observer.observe(currentSectionRef);

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [showAll]);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const scrollToNextSection = () => {
    document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
  };

  // Determine tile height class based on showAll state
  // h-48 (12rem) when collapsed, h-56 (14rem) when expanded
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
                const IconComponent = cat.icon; // Get the icon component for the category
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setShowAll(false);
                      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    // Added flex, items-center, and adjusted padding for icon
                    className={`relative flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-300 ease-out group ${
                      isActive
                        ? "text-white bg-accent shadow-lg pl-2 md:pl-3" // Slightly more padding on left when icon is visible
                        : "text-accent hover:bg-accent/10 hover:text-accent-dark"
                    }`}
                  >
                    {/* Icon: Conditionally rendered with animation */}
                    {IconComponent && (
                      <span
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isActive ? "w-4 mr-1.5 opacity-100 scale-100" : "w-0 mr-0 opacity-0 scale-50"
                        }`}
                        style={{ transformOrigin: 'left center' }} // Ensures scale animation originates from the left
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
            const IconComponent = getProjectIcon(project); // This will now primarily use the specific icons from projectsData
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden p-4 cursor-pointer flex items-center justify-center ${tileHeightClass}`}
              >
                <div className="text-accent text-6xl md:text-7xl transition-opacity duration-300 ease-in-out group-hover:opacity-20">
                  <IconComponent />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-70 p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <h3 className="text-base md:text-md font-semibold mb-1 md:mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-200 line-clamp-3 md:line-clamp-4">
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
