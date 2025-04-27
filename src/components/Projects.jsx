import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import SectionBackground from "./SectionBackground";
import hexagonBg from "../assets/backgrounds/Hexagon.svg";

const projectCategories = [
  "All Projects",
  "Data Engineering",
  "Analytics",
  "Data Science",
  "Data Visualizations",
  "In Progress"
];

const projectsData = [
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
  // 🚧 In Progress (excluded from All Projects)
  {
    title: "Stochastic Optimization for Trading",
    desc: "15-minute S&P 500 interval strategy using stochastic methods. In progress.",
    categories: ["In Progress", "Data Science"],
  },
  {
    title: "Market Jump Predictor",
    desc: "Building classifier models on CRSP tick data. Experimental phase.",
    categories: ["In Progress", "Data Science"],
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef();
  const projectsContainerRef = useRef();

  const filteredProjects = projectsData.filter((project) =>
    activeCategory === "All Projects"
      ? project.categories.includes("All Projects")
      : project.categories.includes(activeCategory)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const fullyOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;
      if (fullyOutOfView && showAll) {
        setShowAll(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAll]);

  const handleShowMore = () => {
    setShowAll(true);

    setTimeout(() => {
      if (projectsContainerRef.current) {
        projectsContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200); // Allow slight delay for expansion animation
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`min-h-screen bg-white py-24 px-6 md:px-24 relative flex flex-col items-center overflow-hidden transition-all duration-500 ease-in-out`}
    >
      <SectionBackground imageSrc={hexagonBg} opacity={0.09} />

      <h2 className="text-3xl font-bold text-accent mb-4 text-center">
        Projects Portfolio
      </h2>
      <p className="text-gray-700 text-center mb-6 italic">
        A glimpse of the projects I’ve been working on
      </p>

      {/* Category Picker */}
      <div className="relative z-10 mb-10 w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 px-4 py-2 bg-white border border-accent/20 rounded-full shadow-md backdrop-blur-sm">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-out
                ${activeCategory === cat
                  ? "text-white bg-accent shadow-lg"
                  : "text-accent hover:bg-accent/10 hover:text-accent-dark"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div
        ref={projectsContainerRef}
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full z-10 transition-all duration-700 ease-in-out ${
          showAll ? "max-h-[9999px]" : "max-h-[calc(100vh-450px)] overflow-hidden"
        }`}
      >
        {(showAll ? filteredProjects : filteredProjects.slice(0, 8)).map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 h-56 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col justify-between"
          >
            <div>
              <h3 className="text-md font-semibold mb-2 text-gray-800">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less */}
      {filteredProjects.length > 8 && (
        <div className="mt-8 z-20">
          <button
            onClick={showAll ? () => setShowAll(false) : handleShowMore}
            className="px-6 py-2 bg-accent text-white rounded-full shadow hover:opacity-90 transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* Chevron */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center z-10">
        <div
          className="text-accent text-4xl cursor-pointer animate-bounce"
          onClick={() =>
            document.getElementById("education")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <FiChevronDown />
        </div>
      </div>
    </section>
  );
};

export default Projects;
