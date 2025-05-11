import React from "react"; // Added React import for completeness
import { FaPeopleCarry, FaTrophy, FaLightbulb, FaChalkboardTeacher } from "react-icons/fa";
import zopsmartLogo from "../assets/logos/zopsmart-logo1.png";
import bitsLogo from "../assets/logos/bits-logo.png";
import SectionBackground from "./SectionBackground";
import massCirclesBg from "../assets/backgrounds/MassCircles.svg";

const LeadershipHonors = () => {
  return (
    <section
      id="leadership-honors"
      className="relative bg-gray-50 py-24 px-6 md:px-24 text-center overflow-hidden"
    >
      <SectionBackground imageSrc={massCirclesBg} opacity={0.08} />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-accent mb-10">Leadership & Honors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto text-left text-gray-800">
          {/* BITS PILANI BLOCK */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Added <a> tag around the BITS Pilani logo */}
              <a 
                href="https://www.bits-pilani.ac.in/academics/integrated-first-degree/b-e-electronics-communication/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="BITS Pilani ECE Program (opens in new tab)" // Accessibility: label for the link
              >
                <img src={bitsLogo} alt="BITS Pilani" className="h-8 w-auto" />
              </a>
              <h3 className="font-semibold text-lg">BITS Pilani, Hyderabad Campus</h3>
            </div>
            <ul className="space-y-4 pl-2">
              <li className="flex items-start gap-3">
                <FaPeopleCarry className="text-gray-700 mt-1 flex-shrink-0" /> {/* Added flex-shrink-0 */}
                <div>
                  <h4 className="font-semibold">
                    Coordinator – Student Aid Fund
                  </h4>
                  <p className="text-sm text-gray-600"> {/* Adjusted text size and color for consistency */}
                    Led a student committee that helped 120 students access financial aid.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaTrophy className="text-gray-700 mt-1 flex-shrink-0" /> {/* Added flex-shrink-0 */}
                <div>
                  <h4 className="font-semibold">Captain – College Snooker Team</h4>
                  <p className="text-sm text-gray-600"> {/* Adjusted text size and color */}
                    Led the team to 3 national-level wins in inter-collegiate sports festivals.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* ZOPSMART BLOCK */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Added <a> tag around the ZopSmart logo */}
              <a 
                href="https://www.linkedin.com/company/zopsmart/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="ZopSmart LinkedIn (opens in new tab)" // Accessibility: label for the link
              >
                <img src={zopsmartLogo} alt="ZopSmart" className="h-8 w-auto" />
              </a>
              <h3 className="font-semibold text-lg">ZopSmart</h3>
            </div>
            <ul className="space-y-4 pl-2">
              <li className="flex items-start gap-3">
                <FaLightbulb className="text-gray-700 mt-1 flex-shrink-0" /> {/* Added flex-shrink-0 */}
                <div>
                  <h4 className="font-semibold">Pivot Polaris</h4>
                  <p className="text-sm text-gray-600"> {/* Adjusted text size and color */}
                    Recognized by clients (Kroger) for high-impact engineering solutions delivered.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaChalkboardTeacher className="text-gray-700 mt-1 flex-shrink-0" /> {/* Added flex-shrink-0 */}
                <div>
                  <h4 className="font-semibold">Internship Mentor</h4>
                  <p className="text-sm text-gray-600"> {/* Adjusted text size and color */}
                    Guided 20+ interns across two cohorts, with over an 80% conversion rate.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipHonors;
