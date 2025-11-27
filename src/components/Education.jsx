import uconnLogo from "@/assets/logos/uconn-logo.png";
import bitsLogo from "@/assets/logos/bits-logo.png";
import SectionBackground from "@/components/SectionBackground";
import curveLineBg from "@/assets/backgrounds/CurveLine.svg";

const Education = () => {
  return (
    <section id="education" className="relative bg-gray-50 py-24 px-6 md:px-24 text-center overflow-hidden">
      <SectionBackground imageSrc={curveLineBg} opacity={0.1} />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-accent mb-6">Education</h2>

        <div className="max-w-4xl mx-auto space-y-10 text-left">
          <div className="flex items-start gap-4">
            <a href="https://www.uconn.edu" target="_blank" rel="noreferrer">
              <img src={uconnLogo.src || uconnLogo} alt="UConn" className="w-12 h-12 object-contain mt-1" />
            </a>
            <div>
              <a
                href="https://grad.business.uconn.edu/msbapm/"
                target="_blank"
                rel="noreferrer"
                className="text-xl font-semibold text-accent hover:underline"
              >
                University of Connecticut
              </a>
              <p className="italic text-sm text-gray-600">Hartford, CT | Aug 2023 – Dec 2024</p>
              <p className="text-md mt-1">
                <span className="font-semibold text-gray-800">M.S. in Business Analytics & Project Management</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold text-gray-700">Key Focus Areas:</span>{" "}
                Predictive Modeling, Cloud Big Data Analytics, Time-Series Forecasting,
                Data Science with Python, Data Mining.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <a href="https://www.bits-pilani.ac.in" target="_blank" rel="noreferrer">
              <img src={bitsLogo.src || bitsLogo} alt="BITS Pilani" className="w-12 h-12 object-contain mt-1" />
            </a>
            <div>
              <a
                href="https://www.bits-pilani.ac.in/academics/integrated-first-degree/b-e-electronics-communication/"
                target="_blank"
                rel="noreferrer"
                className="text-xl font-semibold text-accent hover:underline"
              >
                BITS Pilani – Hyderabad Campus
              </a>
              <p className="italic text-sm text-gray-600">Hyderabad, India | Aug 2015 – May 2019</p>
              <p className="text-md mt-1">
                <span className="font-semibold text-gray-800">B.E. (Hons.) in Electronics & Communication Engineering</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold text-gray-700">Key Focus Areas:</span>{" "}
                Machine Learning, Artificial Intelligence, OOP, Data Mining, Linear Algebra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
