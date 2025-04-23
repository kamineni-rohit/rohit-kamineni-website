import zopsmartLogo from "../assets/zopsmart-logo1.png";
import bitsLogo from "../assets/bits-logo.png";

const LeadershipHonors = () => {
  return (
    <section
      id="leadership-honors"
      className="relative bg-gray-100 py-24 px-6 md:px-24 text-center overflow-hidden"
    >
      {/* SVG background with top/bottom fade */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.4,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 560"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <g fill="none">
            <circle r="93.335" cx="1.76" cy="85.7" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="93.335" cx="430.05" cy="414.57" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="153.91" cx="984.72" cy="158.76" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="64.55" cx="1080.47" cy="94.69" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="85.795" cx="632.43" cy="324.87" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="57.235" cx="117.16" cy="500.53" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="171.155" cx="607.34" cy="345.95" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="164.555" cx="798.89" cy="69.01" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="75.06" cx="1123.01" cy="250.88" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="147.85" cx="935.35" cy="217.53" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="113.085" cx="184.99" cy="290.31" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="84.12" cx="242.22" cy="28.84" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="80.83" cx="372.89" cy="216.72" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
            <circle r="121.22" cx="1383.46" cy="75.34" stroke="#999" strokeOpacity="0.2" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-accent mb-10">Leadership & Honors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto text-left text-gray-800">
          {/* BITS PILANI BLOCK */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={bitsLogo} alt="BITS Pilani" className="h-8 w-auto" />
              <h3 className="font-semibold text-lg">BITS Pilani, Hyderabad Campus</h3>
            </div>
            <ul className="space-y-4 pl-2">
              <li>
                <div>
                  <h4 className="font-semibold">
                    Coordinator – Student Aid Fund (BITS Pilani)
                  </h4>
                  <p>
                    Led a student committee that helped 120 students access financial aid.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h4 className="font-semibold">Captain – College Snooker Team</h4>
                  <p>
                    Led the team to 3 national-level wins in inter-collegiate sports festivals.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* ZOPSMART BLOCK */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={zopsmartLogo} alt="ZopSmart" className="h-8 w-auto" />
              <h3 className="font-semibold text-lg">ZopSmart</h3>
            </div>
            <ul className="space-y-4 pl-2">
              <li>
                <div>
                  <h4 className="font-semibold">Pivot Polaris – ZopSmart</h4>
                  <p>
                    Recognized by clients for high-impact engineering solutions delivered.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <h4 className="font-semibold">Internship Mentor – ZopSmart</h4>
                  <p>
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
