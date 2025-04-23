const CertificationsModal = ({ onClose }) => {
    const otherCerts = [
      {
        title: "The Web Developer Bootcamp",
        link: "https://www.udemy.com/certificate/UC-2d40aeb3-7272-4aa2-b84c-bc4f47c8e070/",
      },
      {
        title: "Data Structures and Algorithms: Deep Dive Using Java",
        link: "https://www.udemy.com/certificate/UC-891e6d29-6aff-4e1b-ab7f-c06913e46e3c/",
      },
      {
        title: "Learn Spring & Spring Boot – 10x Productive Java Development",
        link: "https://www.udemy.com/certificate/UC-efadf239-76a0-42ad-96f4-4a0352fd6d9d/",
      },
    ];
  
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
        <div className="bg-white max-w-2xl w-full rounded-xl p-6 relative animate-fade-in shadow-lg overflow-y-auto max-h-[80vh]">
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl transition"
          >
            &times;
          </button>
          <h3 className="text-xl font-bold text-accent mb-4">Other Certifications</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            {otherCerts.map((cert, idx) => (
              <li key={idx}>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-blue-700"
                  >
                    {cert.title}
                  </a>
                ) : (
                  cert.title
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="bg-accent text-white px-5 py-2 rounded hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CertificationsModal;
  