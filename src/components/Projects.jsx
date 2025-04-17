import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const projectCategories = [
  "All Projects",
  "Data Engineering",
  "Analytics",
  "Data Science",
  "Data Visualizations",
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
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects = projectsData.filter((project) =>
    project.categories.includes(activeCategory)
  );

  return (
    <section
      id="projects"
      className="min-h-screen bg-gray-50 py-24 px-6 md:px-24 relative flex flex-col items-center"
    >
      <h2 className="text-3xl font-bold text-accent mb-2 text-center">
        Projects Portfolio
      </h2>
      <p className="text-gray-700 text-center mb-8">
        A glimpse of the projects I’ve been working on
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              activeCategory === cat
                ? "bg-accent text-white"
                : "bg-white text-gray-800"
            } hover:bg-accent hover:text-white transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
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

      <div
        className="absolute bottom-10 text-accent text-4xl cursor-pointer animate-bounce"
        onClick={() =>
          document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <FiChevronDown />
      </div>
    </section>
  );
};

export default Projects;
