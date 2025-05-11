// src/data/projectsData.js

import {
    FiDatabase,
    FiBarChart2,
    FiCpu,
    FiTrendingUp,
    FiUsers,
    FiPackage,
    FiHeart,
    FiClipboard,
    FiTool,
    FiDollarSign,
    FiMapPin,
    FiZap,
    FiShoppingCart,
    FiPieChart,
    FiGrid
  } from "react-icons/fi";
  
  import { FaUber, FaStackOverflow } from "react-icons/fa";
  import { TbBrandMcdonalds } from "react-icons/tb";
  
  export const projectCategories = [
    { name: "All Projects", icon: FiGrid },
    { name: "Data Engineering", icon: FiDatabase },
    { name: "Analytics", icon: FiBarChart2 },
    { name: "Data Science", icon: FiCpu },
    { name: "Data Visualizations", icon: FiPieChart },
    { name: "In Progress", icon: FiTool },
  ];
  
  export const projectsData = [
    {
      title: "AI Adoption",
      desc: "A Tableau-based narrative that visualizes the global trends, industry patterns, and challenges in enterprise AI adoption using IBM’s Global AI Index.",
      categories: ["All Projects", "Analytics", "Data Visualizations"],
      icon: FiBarChart2,
      github: "https://github.com/rohit-kamineni/ai-adoption-visual-analysis",
    },
    {
      title: "Airbnb Price Prediction",
      desc: "Built a predictive model for Airbnb listing prices using PCA and regression techniques. Included data cleaning, feature engineering, and dimensionality reduction.",
      categories: ["All Projects", "Data Science", "Analytics"],
      icon: FiCpu,
      github: "https://github.com/rohit-kamineni/airbnb-price-prediction-pca",
    },
    {
      title: "Bank Customer Churn Prediction",
      desc: "Built and compared multiple ML models—including neural networks, decision trees, and Naïve Bayes—to predict customer churn on real-world data.",
      categories: ["All Projects", "Data Science"],
      icon: FiUsers,
      github: "https://github.com/rohit-kamineni/bank-customer-churn-prediction",
    },
    {
      title: "Cryptocurrency Price Prediction",
      desc: "Built a machine learning pipeline to predict short-term cryptocurrency price movements using historical data, technical indicators, and classification models.",
      categories: ["All Projects", "Data Science"],
      icon: FiDollarSign,
      github: "https://github.com/rohit-kamineni/crypto-price-movement-prediction",
    },
    {
      title: "McDigest – McDonald's Reviews Analysis",
      desc: "Applied text mining techniques on 33,000+ McDonald's reviews to uncover sentiment trends and service issues using SAS Enterprise Miner.",
      categories: ["All Projects", "Analytics"],
      icon: TbBrandMcdonalds,
      github: "https://github.com/rohit-kamineni/mcdigest-text-mining-mcdonalds-reviews",
    },
    {
      title: "Meteorite Landings",
      desc: "Explored 34,000+ global meteorite landing entries through Tableau visualizations to uncover spatial, temporal, and compositional patterns.",
      categories: ["All Projects", "Analytics", "Data Visualizations"],
      icon: FiMapPin,
      github: "https://github.com/rohit-kamineni/meteorite-landings-visual-analysis",
    },
    {
      title: "Superstore Sales Forecasting",
      desc: "Used ARIMA and Exponential Smoothing models on Superstore sales data to forecast product and regional sales trends for optimized planning.",
      categories: ["All Projects", "Data Science", "Analytics"],
      icon: FiShoppingCart,
      github: "https://github.com/rohit-kamineni/superstore-sales-forecasting",
    },
    {
      title: "Travelogy – SQL Travel Engine",
      desc: "Designed a unified SQL-based travel booking database to streamline transactions and generate personalized multi-service recommendations.",
      categories: ["All Projects", "Data Engineering", "Data Visualizations"],
      icon: FiMapPin,
      github: "https://github.com/rohit-kamineni/travelogy-booking-database-design",
    },
    {
      title: "Databricks Retail Insights",
      desc: "Built ETL pipelines on Databricks for customer segmentation. Achieved 20% ROI improvement.",
      categories: ["All Projects", "Data Engineering", "Analytics"],
      icon: FiDatabase,
      github: null, // Placeholder
    },
    {
      title: "Uber Data Analytics Pipeline",
      desc: "End-to-end pipeline on GCP using Mage, BigQuery, and Looker for demand/supply insights.",
      categories: ["All Projects", "Data Engineering", "Analytics"],
      icon: FaUber,
      github: null, // Placeholder
    },
    {
      title: "StackOverflow Developer Trends",
      desc: "Analyzed GitHub repos via BigQuery to uncover dev patterns. Engineered SQL dashboards.",
      categories: ["All Projects", "Data Visualizations", "Analytics"],
      icon: FaStackOverflow,
      github: null, // Placeholder
    },
    {
      title: "CommonCrawl Inflation Tracker",
      desc: "Built Spark-based ETL using Athena + EMR for category-level inflation metrics.",
      categories: ["All Projects", "Data Engineering", "Analytics"],
      icon: FiTrendingUp,
      github: null, // Placeholder
    },
    {
      title: "Supply Chain Inventory Optimizer",
      desc: "Currently compiling resources for this project. Stay tuned for updates!",
      categories: ["All Projects", "Data Science"],
      icon: FiPackage,
      github: null,
    },
    {
      title: "Healthcare Claims Analyzer",
      desc: "Currently compiling resources for this project. Stay tuned for updates!",
      categories: ["All Projects", "Analytics"],
      icon: FiHeart,
      github: null,
    },
    {
      title: "Stochastic Optimization for Trading",
      desc: "Currently compiling resources for this project. Stay tuned for updates!",
      categories: ["In Progress", "Data Science"],
      icon: FiTrendingUp,
      github: null,
    },
    {
      title: "Market Jump Predictor",
      desc: "Currently compiling resources for this project. Stay tuned for updates!",
      categories: ["In Progress", "Data Science"],
      icon: FiZap,
      github: null,
    },
  ];
  