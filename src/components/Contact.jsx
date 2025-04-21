import { useState } from "react";
import { FiMail, FiMapPin, FiLinkedin, FiUserPlus } from "react-icons/fi";
import ContactFormModal from "./ContactFormModal";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section
      id="contact"
      className="bg-gray-50 py-20 px-6 md:px-24 text-center relative"
    >
      <h2 className="text-3xl font-bold text-accent mb-6">Contact</h2>
      <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
        I'm always open to opportunities, collaborations, or just a friendly chat.
        Feel free to reach out!
      </p>

      <div className="space-y-3 text-gray-700 text-md mb-6">
        <p className="flex justify-center items-center gap-2">
          <FiMail className="text-accent" />{" "}
          <a
            href="mailto:kaminenirohit1@gmail.com"
            className="text-accent hover:underline"
          >
            kaminenirohit1@gmail.com
          </a>
        </p>
        <p className="flex justify-center items-center gap-2">
          <FiLinkedin className="text-accent" />{" "}
          <a
            href="https://www.linkedin.com/in/rohit-kamineni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            linkedin.com/in/rohit-kamineni
          </a>
        </p>
        <p className="flex justify-center items-center gap-2">
          <FiMapPin className="text-accent" /> Hartford, CT
        </p>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="inline-flex items-center gap-2 px-6 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-white transition rounded"
      >
        <FiUserPlus /> Leave Your Info
      </button>

      {showForm && <ContactFormModal onClose={() => setShowForm(false)} />}
    </section>
  );
};

export default Contact;
