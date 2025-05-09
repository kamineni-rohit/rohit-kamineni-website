import { useState, useEffect, useRef } from "react";
import {
  FiChevronDown,
  FiDatabase,     // For data engineering, databases, ETL
  FiBarChart2,    // For analytics, visualizations, dashboards
  FiCpu,          // For data science, ML, AI, computation
  FiTrendingUp,   // For finance, stocks, prediction, trends
  FiCode,         // For general code, software dev
  FiUsers,        // For customer-related insights, segmentation
  FiPackage,      // For supply chain, inventory
  FiHeart,        // For healthcare
  FiClipboard,    // Generic project/task
  FiTool,         // For tools, work in progress
  FiGithub,       // For GitHub/developer related
  FiDollarSign    // For finance/economy related
} from "react-icons/fi"; // Import necessary icons
// Assuming SectionBackground and hexagonBg imports are correct based on your file structure
import SectionBackground from "./SectionBackground";
import hexagonBg from "../assets/backgrounds/Hexagon.svg";

// --- Constants for Clarity (Representing Tailwind values & Estimates) ---
const GRID_GAP_X_REM = 1.25; // Corresponds to gap-x-5
const GRID_GAP_Y_REM = 1.0;  // Corresponds to gap-y-4 (1rem)
const DEFAULT_TILE_HEIGHT_REM = 14; // Corresponds to h-56
const SECTION_PADDING_Y_REM = 5.0; // Corresponds to py-20 (2.5rem top, 2.5rem bottom) -> Note: py-20 is 5rem each side, total 10rem. Adjusted constant.
const NAVBAR_HEIGHT_PX = 64; // ESTIMATED Navbar height in pixels (adjust if needed)
const MIN_TILE_HEIGHT_PX = 120; // Minimum reasonable height for a tile with icon (increased slightly)

// --- Data ---
const projectCategories = [
  "All Projects",
  "Data Engineering",
  "Analytics",
  "Data Science",
  "Data Visualizations",
  "In Progress",
];

const projectsData = [
    // Added an 'icon' field suggestion based on title/desc
    {
        title: "Databricks Retail Insights",
        desc: "Built ETL pipelines on Databricks for customer segmentation. Achieved 20% ROI improvement.",
        categories: ["All Projects", "Data Engineering", "Analytics"],
        icon: FiDatabase, // ETL, Databricks -> Database
    },
    {
        title: "Uber Data Analytics Pipeline",
        desc: "End-to-end pipeline on GCP using Mage, BigQuery, and Looker for demand/supply insights.",
        categories: ["All Projects", "Data Engineering", "Analytics"],
        icon: FiBarChart2, // Analytics, Looker -> Chart
    },
    {
        title: "Cryptocurrency Price Prediction",
        desc: "ML model with ensemble methods; achieved 76.5% F1 score using engineered features.",
        categories: ["All Projects", "Data Science"],
        icon: FiTrendingUp, // Crypto, Prediction -> Trend
    },
    {
        title: "StackOverflow Developer Trends",
        desc: "Analyzed GitHub repos via BigQuery to uncover dev patterns. Engineered SQL dashboards.",
        categories: ["All Projects", "Data Visualizations", "Analytics"],
        icon: FiGithub, // StackOverflow, GitHub -> GitHub icon
    },
    {
        title: "CommonCrawl Inflation Tracker",
        desc: "Built Spark-based ETL using Athena + EMR for category-level inflation metrics.",
        categories: ["All Projects", "Data Engineering", "Analytics"],
        icon: FiDollarSign, // Inflation -> Dollar sign
    },
    {
        title: "Sales Forecasting – Superstore",
        desc: "Used ARIMA + Exponential Smoothing to uncover demand trends across regions.",
        categories: ["All Projects", "Data Science", "Analytics"],
        icon: FiCpu, // Forecasting, Models -> CPU/Processing
    },
    {
        title: "McDigest – McDonald's Reviews Analysis",
        desc: "Used SAS Miner to uncover insights from 33K+ reviews. Boosted satisfaction metrics by 20%.",
        categories: ["All Projects", "Data Science", "Analytics"],
        icon: FiUsers, // Reviews, Satisfaction -> Users
    },
    {
        title: "Travelogy – SQL Travel Engine",
        desc: "Designed normalized schema + ERD for search/feedback; reduced retrieval time by 30%.",
        categories: ["All Projects", "Data Engineering", "Data Visualizations"],
        icon: FiDatabase, // SQL, Schema -> Database
    },
    {
        title: "Supply Chain Inventory Optimizer",
        desc: "Optimizing stock levels using ML forecasting models.",
        categories: ["All Projects", "Data Science"],
        icon: FiPackage, // Supply Chain, Inventory -> Package
    },
    {
        title: "Healthcare Claims Analyzer",
        desc: "Built ETL and dashboard system for insurance fraud detection.",
        categories: ["All Projects", "Analytics"],
        icon: FiHeart, // Healthcare -> Heart
    },
    {
        title: "Stochastic Optimization for Trading",
        desc: "15-minute S&P 500 interval strategy using stochastic methods. In progress.",
        categories: ["In Progress", "Data Science"],
        icon: FiTrendingUp, // Trading -> Trend
    },
    {
        title: "Market Jump Predictor",
        desc: "Building classifier models on CRSP tick data. Experimental phase.",
        categories: ["In Progress", "Data Science"],
        icon: FiTool, // In Progress, Experimental -> Tool
    },
];

// --- Helper Function to Get Icon ---
const getProjectIcon = (project) => {
  if (project.icon) {
    return project.icon; // Return assigned icon
  }
  // Fallback logic (optional, based on keywords if needed)
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
  const [calculatedTileHeight, setCalculatedTileHeight] = useState(null); // Height in pixels

  const sectionRef = useRef(null); // Ref for the main section element
  const nonScrollingRef = useRef(null); // Ref for the top non-scrolling content
  const gridRef = useRef(null); // Ref for the grid container itself
  const bottomAreaRef = useRef(null); // Ref for the bottom button area
  const buttonRef = useRef(null); // Ref for the Show More/Less button itself (for scrolling)

  // Filter projects based on the active category
  const filteredProjects = projectsData.filter((project) =>
    activeCategory === "All Projects"
      ? project.categories.includes("All Projects")
      : project.categories.includes(activeCategory)
  );

  // Determine if the "Show More" button should be displayed
  const isExpandable = filteredProjects.length > 8;
  // Determine which projects to display (first 8 or all)
  const projectsToDisplay = showAll ? filteredProjects : filteredProjects.slice(0, 8);

  // --- Dynamic Height Calculation (Restored) ---
  useEffect(() => {
    const calculateHeight = () => {
      // If showing all, reset to null to use default height class
      if (showAll) {
        if (calculatedTileHeight !== null) { // Only update state if it needs changing
             setCalculatedTileHeight(null);
        }
        return;
      }

      // Ensure refs are available
      if (nonScrollingRef.current && bottomAreaRef.current && gridRef.current) {
        // Get root font size for rem conversion
        let rootFontSize = 16; // Default fallback
        try {
          const computedStyle = getComputedStyle(document.documentElement);
          if (computedStyle && computedStyle.fontSize) {
            rootFontSize = parseFloat(computedStyle.fontSize);
          }
        } catch (e) {
          console.error("Could not compute root font size, using default.", e);
        }

        // Convert section padding (py-20 -> 5rem top + 5rem bottom = 10rem total) to pixels
        const totalSectionPaddingPx = (SECTION_PADDING_Y_REM * 2) * rootFontSize;

        // Calculate the actual available height *within* the section's padding
        // Subtract navbar height and the section's own padding
        const availableInnerHeight = window.innerHeight - NAVBAR_HEIGHT_PX - totalSectionPaddingPx;

        // Get heights of the fixed content within the section
        const nonScrollingHeight = nonScrollingRef.current.offsetHeight;
        const bottomAreaHeight = bottomAreaRef.current.offsetHeight;

        // Calculate available height specifically for the grid container
        // Ensure it's not negative
        const availableGridHeight = Math.max(0, availableInnerHeight - nonScrollingHeight - bottomAreaHeight);

        // Convert gap-y-6 (1.5rem) to pixels (Adjusted based on current grid class)
        const gapYInPixels = 1.5 * rootFontSize; // Corresponds to gap-y-6

        // Convert default tile height (14rem) to pixels
        const defaultTileHeightPixels = DEFAULT_TILE_HEIGHT_REM * rootFontSize;

        // Calculate the ideal height for each tile to fit exactly 2 rows
        // Target height = (Available Grid Space - 1 Row Gap) / 2 Rows
        const targetTileHeight = (availableGridHeight - gapYInPixels) / 2;

        // Ensure calculated height is at least the minimum and not more than default
        // Also ensure it's a positive value
        let finalTileHeight = Math.max(MIN_TILE_HEIGHT_PX, targetTileHeight);
        finalTileHeight = Math.min(finalTileHeight, defaultTileHeightPixels);

        // Only update if the height is significantly different to avoid minor fluctuations
        // or if it was previously null (initial calculation or after showing all)
        if (calculatedTileHeight === null || Math.abs(calculatedTileHeight - finalTileHeight) > 1) {
             setCalculatedTileHeight(finalTileHeight);
        }

      } else {
        // Fallback if refs aren't ready - reset to null to use default class
        if (calculatedTileHeight !== null) {
            setCalculatedTileHeight(null);
        }
      }
    };

    // Use setTimeout to ensure layout is stable after render before calculating
    const timerId = setTimeout(calculateHeight, 50); // Delay ensures offsetHeights are correct

    // Recalculate on window resize
    window.addEventListener('resize', calculateHeight);

    // Cleanup listener and timer
    return () => {
      clearTimeout(timerId);
      window.removeEventListener('resize', calculateHeight);
    };

  // Rerun when dependencies change.
  // Added projectsToDisplay.length: ensures recalculation if filtering changes the number of items (relevant if < 8)
  // Added activeCategory: ensures recalculation if category changes number of items
  }, [showAll, activeCategory, projectsToDisplay.length, calculatedTileHeight]); // Keep calculatedTileHeight dependency


  // Handler for the "Show More" button
  const handleShowMore = () => {
    setShowAll(true);
    // No need to manually set height to null, useEffect will handle it because showAll changed
    setTimeout(() => {
      buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 150);
  };

  // Handler for the "Show Less" button
  const handleShowLess = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setShowAll(false); // Let useEffect recalculate height after state update
    }, 50);
  };

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
  };

  // Determine tile style: use calculated height only when not showing all AND calculation is valid
  const tileStyle = !showAll && calculatedTileHeight && calculatedTileHeight > 0
    ? { height: `${calculatedTileHeight}px` }
    : {};
  // Determine tile class: use default h-56 only when showing all OR calculation failed/is invalid
  const tileClass = (showAll || !calculatedTileHeight || calculatedTileHeight <= 0) ? 'h-56' : '';


  return (
    // Section: Enforces screen height, flex column layout, relative positioning.
    // py-20 provides top/bottom padding (make sure SECTION_PADDING_Y_REM matches)
    <section
      id="projects"
      ref={sectionRef}
      className="h-screen flex flex-col items-center relative overflow-hidden py-20"
    >
      <SectionBackground imageSrc={hexagonBg} opacity={0.09} />

      {/* Inner container: Manages width limit, horizontal padding, and flex flow. h-full ensures it fills the padded section height. */}
      <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 md:px-6 z-10">

        {/* --- Non-Scrolling Content Area (Fixed Height Portion) --- */}
        {/* Added ref here for height calculation */}
        <div ref={nonScrollingRef} className="flex-shrink-0">
          {/* Title and Subtitle */}
          <h2 className="text-3xl font-bold text-accent mb-4 text-center">
            Projects Portfolio
          </h2>
          <p className="text-gray-700 text-center mb-6 italic">
            A glimpse of the projects I’ve been working on
          </p>
          {/* Category Picker */}
          <div className="mb-8 w-full flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-3 py-2 bg-white border border-accent/20 rounded-full shadow-md backdrop-blur-sm">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowAll(false); // Reset showAll state
                    // No need to set height null here, useEffect handles it
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`relative px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-300 ease-out ${
                    activeCategory === cat
                      ? "text-white bg-accent shadow-lg"
                      : "text-accent hover:bg-accent/10 hover:text-accent-dark"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* --- End Non-Scrolling Content Area --- */}


        {/* --- Scrolling Content Area (Projects Grid) --- */}
        {/* Added ref here for height calculation */}
        {/* flex-grow allows this div to take available space */}
        {/* overflow-y-auto enables scrolling within this div if content exceeds space */}
        {/* Added pb-4 for padding at the bottom of the scrollable area */}
        <div
          ref={gridRef} // Ref needed for height calculation
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 flex-grow w-full overflow-y-auto pr-2 pb-4 scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-accent/10`}
        >
          {projectsToDisplay.map((project, index) => {
             const IconComponent = getProjectIcon(project); // Get the icon component
             return (
               // Project Tile: Apply dynamic height style OR default h-56 class
               // Added 'group', relative positioning, flex centering
               <div
                 key={index}
                 // Apply conditional class and style for height control
                 // Added group, relative, overflow-hidden, cursor-pointer, flex, items-center, justify-center
                 className={`group relative bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden p-4 cursor-pointer flex items-center justify-center ${tileClass}`}
                 style={tileStyle} // Apply dynamic height style
               >
                 {/* Icon Display (Visible by default) */}
                 {/* Adjusted icon size slightly */}
                 <div className="text-accent text-5xl md:text-6xl transition-opacity duration-300 ease-in-out group-hover:opacity-20">
                   <IconComponent />
                 </div>

                 {/* Hover Content (Overlay + Text) - Hidden by default */}
                 {/* Uses absolute inset-0 to fill the tile regardless of its calculated height */}
                 <div className="absolute inset-0 bg-black bg-opacity-70 p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                   <h3 className="text-base md:text-md font-semibold mb-1 md:mb-2 text-white">
                     {project.title}
                   </h3>
                   {/* Adjusted line-clamp based on typical space */}
                   <p className="text-xs md:text-sm text-gray-200 line-clamp-3 md:line-clamp-4">
                     {project.desc}
                   </p>
                 </div>
               </div>
             );
          })}
           {/* Empty state message */}
           {projectsToDisplay.length === 0 && (
             <div className="col-span-full text-center text-gray-500 py-10">
                No projects found in this category.
             </div>
           )}
        </div>
        {/* --- End Scrolling Content Area --- */}


        {/* --- Bottom Fixed Area (Button & Chevron) --- */}
        {/* Added ref here for height calculation */}
        {/* flex-shrink-0 prevents this area from shrinking */}
        {/* min-h-[54px] ensures space for the button even if it's not rendered */}
        <div ref={bottomAreaRef} className="flex justify-center items-center pt-2 md:pt-3 min-h-[54px] flex-shrink-0">
          {isExpandable && (
            <button
              ref={buttonRef} // Ref for scrolling into view
              onClick={showAll ? handleShowLess : handleShowMore}
              className="px-5 py-2 text-sm bg-accent text-white rounded-full shadow hover:opacity-90 transition"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Chevron - Always rendered */}
        <div className="absolute bottom-3 left-0 w-full flex justify-center z-20">
          <div
            className="text-accent text-3xl cursor-pointer animate-bounce hover:text-accent-dark transition-colors"
            onClick={scrollToNextSection}
            title="Scroll to next section"
          >
            <FiChevronDown />
          </div>
        </div>
         {/* --- End Bottom Fixed Area --- */}

      </div> {/* End Inner container */}
    </section>
  );
};

export default Projects;
