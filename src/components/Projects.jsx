import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
// Assuming SectionBackground and hexagonBg imports are correct based on your file structure
import SectionBackground from "./SectionBackground";
import hexagonBg from "../assets/backgrounds/Hexagon.svg";

// --- Constants for Clarity (Representing Tailwind values & Estimates) ---
const GRID_GAP_X_REM = 1.25; // Corresponds to gap-x-5
const GRID_GAP_Y_REM = 1.0;  // Corresponds to gap-y-4 (1rem)
const DEFAULT_TILE_HEIGHT_REM = 14; // Corresponds to h-56
const SECTION_PADDING_Y_REM = 3.0; // Corresponds to py-12 (1.5rem top, 1.5rem bottom)
const NAVBAR_HEIGHT_PX = 64; // ESTIMATED Navbar height in pixels (adjust if needed)
const MIN_TILE_HEIGHT_PX = 80; // Minimum reasonable height for a tile

// --- Data (Keep as is) ---
const projectCategories = [
  "All Projects",
  "Data Engineering",
  "Analytics",
  "Data Science",
  "Data Visualizations",
  "In Progress",
];

const projectsData = [
    // ... (project data remains the same)
    {
        title: "Databricks Retail Insights",
        desc: "Built ETL pipelines on Databricks for customer segmentation. Achieved 20% ROI improvement.",
        categories: ["All Projects", "Data Engineering", "Analytics"],
    },
    {
        title: "Uber Data Analytics Pipeline",
        desc: "End-to-end pipeline on GCP using Mage, BigQuery, and Looker for demand/supply insights.",
        categories: ["All Projects", "Data Engineering", "Analytics"],
    },
    {
        title: "Cryptocurrency Price Prediction",
        desc: "ML model with ensemble methods; achieved 76.5% F1 score using engineered features.",
        categories: ["All Projects", "Data Science"],
    },
    {
        title: "StackOverflow Developer Trends",
        desc: "Analyzed GitHub repos via BigQuery to uncover dev patterns. Engineered SQL dashboards.",
        categories: ["All Projects", "Data Visualizations", "Analytics"],
    },
    {
        title: "CommonCrawl Inflation Tracker",
        desc: "Built Spark-based ETL using Athena + EMR for category-level inflation metrics.",
        categories: ["All Projects", "Data Engineering", "Analytics"],
    },
    {
        title: "Sales Forecasting – Superstore",
        desc: "Used ARIMA + Exponential Smoothing to uncover demand trends across regions.",
        categories: ["All Projects", "Data Science", "Analytics"],
    },
    {
        title: "McDigest – McDonald's Reviews Analysis",
        desc: "Used SAS Miner to uncover insights from 33K+ reviews. Boosted satisfaction metrics by 20%.",
        categories: ["All Projects", "Data Science", "Analytics"],
    },
    {
        title: "Travelogy – SQL Travel Engine",
        desc: "Designed normalized schema + ERD for search/feedback; reduced retrieval time by 30%.",
        categories: ["All Projects", "Data Engineering", "Data Visualizations"],
    },
    {
        title: "Supply Chain Inventory Optimizer",
        desc: "Optimizing stock levels using ML forecasting models.",
        categories: ["All Projects", "Data Science"],
    },
    {
        title: "Healthcare Claims Analyzer",
        desc: "Built ETL and dashboard system for insurance fraud detection.",
        categories: ["All Projects", "Analytics"],
    },
    {
        title: "Stochastic Optimization for Trading",
        desc: "15-minute S&P 500 interval strategy using stochastic methods. In progress.",
        categories: ["In Progress", "Data Science"],
    },
    {
        title: "Market Jump Predictor",
        desc: "Building classifier models on CRSP tick data. Experimental phase.",
        categories: ["In Progress", "Data Science"],
    },
];

// --- Component ---
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [showAll, setShowAll] = useState(false);
  const [calculatedTileHeight, setCalculatedTileHeight] = useState(null); // Height in pixels

  const sectionRef = useRef(null); // Ref for the main section element
  // Removed innerContainerRef as we now use window.innerHeight
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

  // --- Dynamic Height Calculation ---
  useEffect(() => {
    const calculateHeight = () => {
      if (showAll) {
        setCalculatedTileHeight(null); // Use default height when showing all
        return;
      }

      if (nonScrollingRef.current && bottomAreaRef.current) {
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

        // Convert section padding (py-12 -> 3rem top + 3rem bottom = 6rem total) to pixels
        const totalSectionPaddingPx = (SECTION_PADDING_Y_REM * 2) * rootFontSize;

        // Calculate the actual available height *within* the section's padding
        const availableInnerHeight = window.innerHeight - NAVBAR_HEIGHT_PX - totalSectionPaddingPx;

        // Get heights of the fixed content within the section
        const nonScrollingHeight = nonScrollingRef.current.offsetHeight;
        const bottomAreaHeight = bottomAreaRef.current.offsetHeight;

        // Calculate available height specifically for the grid container
        const availableGridHeight = availableInnerHeight - nonScrollingHeight - bottomAreaHeight;

        // Convert gap-y-4 (1rem) to pixels
        const gapYInPixels = GRID_GAP_Y_REM * rootFontSize;

        // Convert default tile height (14rem) to pixels
        const defaultTileHeightPixels = DEFAULT_TILE_HEIGHT_REM * rootFontSize;

        // Calculate the ideal height for each tile to fit exactly 2 rows
        // No buffer needed now as we are using more accurate available height
        const targetTileHeight = (availableGridHeight - gapYInPixels) / 2;

        // Ensure calculated height is positive and not greater than default
        const finalTileHeight = Math.max(MIN_TILE_HEIGHT_PX, Math.min(targetTileHeight, defaultTileHeightPixels));

        // Only update if the height is significantly different to avoid minor fluctuations
        if (Math.abs(calculatedTileHeight - finalTileHeight) > 1) {
             setCalculatedTileHeight(finalTileHeight);
        }

      } else {
        console.warn("Refs not available for height calculation yet.");
        setCalculatedTileHeight(null); // Fallback to default
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

  // Rerun when dependencies change. Added window.innerHeight to potentially catch zoom/dynamic changes.
  }, [showAll, activeCategory, projectsToDisplay.length, calculatedTileHeight]); // Added calculatedTileHeight to dependencies for stability check


  // Handler for the "Show More" button
  const handleShowMore = () => {
    setShowAll(true);
    setCalculatedTileHeight(null); // Ensure we use default height when showing all
    setTimeout(() => {
      buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 150);
  };

  // Handler for the "Show Less" button
  const handleShowLess = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setShowAll(false);
    }, 50); // Calculation will re-run via useEffect
  };

  // Function to scroll to the next section
  const scrollToNextSection = () => {
    document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
  };

  // Determine tile style: use calculated height only when not showing all
  const tileStyle = !showAll && calculatedTileHeight ? { height: `${calculatedTileHeight}px` } : {};
  // Determine tile class: use default h-56 only when showing all or calculation failed
  const tileClass = (showAll || calculatedTileHeight === null) ? 'h-56' : '';


  return (
    // Section: Enforces screen height, flex column layout, relative positioning.
    // Keep vertical padding constant at py-12.
    <section
      id="projects"
      ref={sectionRef}
      className="h-screen flex flex-col items-center relative overflow-hidden py-20" 
    >
      {/* Use SectionBackground with imageSrc prop */}
      <SectionBackground imageSrc={hexagonBg} opacity={0.09} />

      {/* Inner container: Manages width limit, horizontal padding, and flex flow. h-full ensures it fills the padded section height. */}
      {/* No ref needed here anymore */}
      <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 md:px-6 z-10">

        {/* --- Non-Scrolling Content Area (Fixed Height Portion) --- */}
        <div ref={nonScrollingRef} className="flex-shrink-0">
          {/* User's requested margins kept constant */}
          <h2 className="text-3xl font-bold text-accent mb-4 text-center">
            Projects Portfolio
          </h2>
          <p className="text-gray-700 text-center mb-6 italic">
            A glimpse of the projects I’ve been working on
          </p>
          {/* Category Picker */}
          <div className="mb-8 w-full flex justify-center"> {/* User's mb-8 */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-3 py-2 bg-white border border-accent/20 rounded-full shadow-md backdrop-blur-sm">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowAll(false); // Reset showAll state
                    setCalculatedTileHeight(null); // Reset height calculation
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
        {/* Keep grid gap constant with gap-y-4 */}
        {/* flex-grow and overflow-y-auto handle fitting and scrolling */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 flex-grow w-full overflow-y-auto pr-2 pb-2 scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-accent/10`}
          // Assumes tailwind-scrollbar and @tailwindcss/line-clamp plugins are installed
        >
          {projectsToDisplay.map((project, index) => (
            // Project Tile: Apply dynamic height style OR default h-56 class
            <div
              key={index}
              // Apply conditional class and style for height control
              className={`bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col justify-between ${tileClass}`}
              style={tileStyle}
            >
              <div>
                <h3 className="text-base md:text-md font-semibold mb-1 md:mb-2 text-gray-800">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-4"> {/* line-clamp */}
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
           {/* Empty state message */}
           {projectsToDisplay.length === 0 && (
             <div className="col-span-full text-center text-gray-500 py-10">
                No projects found in this category.
             </div>
           )}
        </div>
        {/* --- End Scrolling Content Area --- */}


        {/* --- Bottom Fixed Area (Button & Chevron) --- */}
        {/* Container for the button. Kept bottom margin mb-6 for spacing. */}
        <div ref={bottomAreaRef} className="flex justify-center items-center pt-2 md:pt-3 min-h-[54px] flex-shrink-0">
          {/* Added ref={buttonRef} to the actual button for scrolling */}
          {isExpandable && (
            <button
              ref={buttonRef} // Ref is on the button now
              onClick={showAll ? handleShowLess : handleShowMore}
              className="px-5 py-2 text-sm bg-accent text-white rounded-full shadow hover:opacity-90 transition"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Chevron - Always rendered. Position: bottom-3 */}
        <div className="absolute bottom-3 left-0 w-full flex justify-center z-20"> {/* Kept bottom-3 */}
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
