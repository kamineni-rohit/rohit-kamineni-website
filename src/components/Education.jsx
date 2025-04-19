const Education = () => {
    return (
      <section id="education" className="bg-gray-50 py-24 px-6 md:px-24 text-center">
        <h2 className="text-3xl font-bold text-accent mb-6">Education</h2>
  
        <div className="max-w-4xl mx-auto space-y-10 text-left">
          <div>
            <h3 className="text-xl font-semibold">University of Connecticut</h3>
            <p className="italic text-sm text-gray-600">Hartford, CT | Aug 2023 – Dec 2024</p>
            <p className="text-gray-700 mt-2">
              M.S. in Business Analytics and Project Management, GPA: 3.65/4.0
            </p>
            <p className="text-sm text-gray-600">
              Relevant Coursework: Predictive Modeling, Cloud Big Data Analytics, Time-Series Forecasting, Data Science with Python.
            </p>
          </div>
  
          <div>
            <h3 className="text-xl font-semibold">BITS Pilani – Hyderabad Campus</h3>
            <p className="italic text-sm text-gray-600">Hyderabad, India | Aug 2015 – May 2019</p>
            <p className="text-gray-700 mt-2">
              B.E. (Hons) in Electronics & Communication Engineering, GPA: 3.0/4.0
            </p>
            <p className="text-sm text-gray-600">
              Relevant Coursework: Machine Learning, AI, OOP, Data Mining, Linear Algebra.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Education;
  