const Resume = () => {
    return (
      <section id="resume" className="bg-white py-20 px-6 md:px-24 text-center">
        <h2 className="text-3xl font-bold text-accent mb-6">Resume</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Download my resume to see a detailed breakdown of my experience in data engineering, analytics, and machine learning across cloud environments.
        </p>
        <a
          href="/Rohit_Kamineni_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Download Resume
        </a>
      </section>
    );
  };
  
  export default Resume;
  