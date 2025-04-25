import { useState } from "react";
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
  // 🚧 In Progress (EXCLUDED from 'All Projects')
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

  const filteredProjects = projectsData.filter((project) =>
    activeCategory === "All Projects"
      ? project.categories.includes("All Projects")
      : project.categories.includes(activeCategory)
  );

  return (
    <section
      id="projects"
      className="min-h-screen bg-white py-24 px-6 md:px-24 relative flex flex-col items-center overflow-hidden"
    >
      <SectionBackground imageSrc={hexagonBg} opacity={0.09} />

      <h2 className="text-3xl font-bold text-accent mb-4 text-center">Projects Portfolio</h2>
      <p className="text-gray-700 text-center mb-7 italic">
        A glimpse of the projects I’ve been working on
      </p>

      {/* Theme-Styled Category Picker */}
      <div className="relative z-10 mb-12 w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 px-4 py-2 bg-white border border-accent/30 rounded-full shadow-md backdrop-blur-sm">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out
          ${activeCategory === cat
                  ? "text-white bg-accent shadow-md scale-105"
                  : "text-accent hover:bg-accent/10 hover:scale-105"
                }`}
            >
              {cat}
              {activeCategory === cat && (
                <span
                  className="absolute inset-0 rounded-full ring-2 ring-white ring-opacity-50 animate-pulse"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full z-10">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 h-56 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition flex flex-col justify-between"
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

      {/* Chevron Navigation */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center z-20">
        <div
          className="text-accent text-4xl cursor-pointer animate-bounce"
          onClick={() =>
            document
              .getElementById("education")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <FiChevronDown />
        </div>
      </div>
    </section>
  );
};

export default Projects;
