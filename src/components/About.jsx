import profileImage from "../assets/IMG-20241206-WA0012.jpg";
import { FiChevronDown } from "react-icons/fi";

const About = () => {
    return (
        <section
            id="about"
            className="min-h-screen bg-gray-100 py-24 px-6 md:px-20 flex justify-center relative"
        >
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10">
                {/* Left: Text + Timeline below */}
                <div className="flex-1 flex flex-col gap-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Hi, I'm Rohit.</h2>
                        <p className="text-gray-700 text-lg mb-6">
                            I’m a versatile Data Engineer, Analyst, and Scientist with a strong
                            track record of building end-to-end data solutions — from ingestion
                            pipelines and transformation workflows to advanced ML model
                            deployments and intuitive BI dashboards.
                            <br />
                            <br />
                            With experience across GCP, AWS, and Kubernetes, I bridge
                            engineering reliability with analytical depth and statistical rigor
                            to solve business problems at scale.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="w-full space-y-8">
                        <div className="relative pl-6 border-l-4 border-accent">
                            <div className="mb-4">
                                <div className="text-accent font-semibold">2019 – 2023</div>
                                <div className="text-lg font-bold">Data Engineer – Kroger</div>
                                <div className="text-sm italic text-gray-600 mb-1">
                                    Kroger Technology & Digital
                                </div>
                                <p className="text-gray-700">
                                    Led scalable ETL pipelines, built real-time analytics on GCP,
                                    and implemented MLOps on Vertex AI.
                                </p>
                            </div>

                            <div className="mb-4">
                                <div className="text-accent font-semibold">2019</div>
                                <div className="text-lg font-bold">SDE – Kroger</div>
                                <div className="text-sm italic text-gray-600 mb-1">
                                    CX Web Products & Search
                                </div>
                                <p className="text-gray-700">
                                    Built Products BFF for 15M+ daily requests; migrated APIs to a
                                    3-tier Kubernetes architecture.
                                </p>
                            </div>

                            <div>
                                <div className="text-accent font-semibold">2019</div>
                                <div className="text-lg font-bold">Data Engineer – Tcube</div>
                                <div className="text-sm italic text-gray-600 mb-1">
                                    Hyderabad
                                </div>
                                <p className="text-gray-700">
                                    Designed Python/SQL pipelines for logistics data and enabled
                                    real-time KPI dashboards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Bigger image */}
                <div className="flex justify-center items-start">
                    <img
                        src={profileImage}
                        alt="Rohit Kamineni"
                        className="w-96 h-96 object-cover rounded-2xl shadow-lg"
                    />
                </div>
            </div>

            {/* Down Arrow to scroll to projects */}
            <div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-accent text-4xl cursor-pointer animate-bounce"
                onClick={() =>
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
            >
                <FiChevronDown />
            </div>
        </section>
    );
};

export default About;
