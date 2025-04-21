import uconnLogo from "../assets/uconn-logo.png";
import bitsLogo from "../assets/bits-logo.png";

const Education = () => {
  return (
    <section
      id="education"
      className="bg-gray-50 py-24 px-6 md:px-24 text-center"
    >
      <h2 className="text-3xl font-bold text-accent mb-6">Education</h2>

      <div className="max-w-4xl mx-auto space-y-10 text-left">
        <div className="flex items-start gap-4">
          <img
            src={uconnLogo}
            alt="UConn"
            className="w-12 h-12 object-contain mt-1"
          />
          <div>
            <h3 className="text-xl font-semibold">
              University of Connecticut
            </h3>
            <p className="italic text-sm text-gray-600">
              Hartford, CT | Aug 2023 – Dec 2024
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold text-gray-700">Key Focus Areas:</span>{" "}
              Predictive Modeling, Cloud Big Data Analytics, Time-Series Forecasting,
              Data Science with Python, Data Mining.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <img
            src={bitsLogo}
            alt="BITS Pilani"
            className="w-12 h-12 object-contain mt-1"
          />
          <div>
            <h3 className="text-xl font-semibold">BITS Pilani – Hyderabad Campus</h3>
            <p className="italic text-sm text-gray-600">
              Hyderabad, India | Aug 2015 – May 2019
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold text-gray-700">Key Focus Areas:</span>{" "}
              Machine Learning, Artificial Intelligence, OOP, Data Mining, Linear Algebra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
