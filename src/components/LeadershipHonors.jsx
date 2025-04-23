import zopsmartLogo from "../assets/zopsmart-logo1.png";
import bitsLogo from "../assets/bits-logo.png";

const LeadershipHonors = () => {
  return (
    <section
      id="leadership-honors"
      className="relative bg-gray-50 py-24 px-6 md:px-24 text-center overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img
          src="https://www.bgjar.com/assets/svg/overlay/circle-mass.svg"
          alt="Background Circles"
          className="w-full h-full object-cover"
        />
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
                    Guided 20+ interns across two cohorts, with an 80% conversion rate.
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
