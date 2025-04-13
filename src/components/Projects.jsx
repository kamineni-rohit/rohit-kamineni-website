const Projects = () => {
    const projectList = [
      {
        title: "Databricks Retail Insights",
        desc: "Built scalable ETL pipelines on Databricks using PySpark and Delta Lake for customer segmentation across retail regions. Achieved 20% improvement in marketing ROI.",
      },
      {
        title: "Uber Data Analytics Pipeline",
        desc: "Built an end-to-end pipeline with Mage, BigQuery, and Looker on GCP to surface ride-level supply-demand gaps and operational bottlenecks.",
      },
      {
        title: "Cryptocurrency Price Prediction",
        desc: "Built a predictive ML model with ensemble techniques achieving 76.5% F1 score on two-week price forecasts, optimized using feature engineering and model tuning.",
      },
    ];
  
    return (
      <section id="projects" className="bg-gray-50 py-20 px-6 md:px-24">
        <h2 className="text-3xl font-bold text-accent mb-10">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-md shadow-md border border-gray-100 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 text-sm">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Projects;
  