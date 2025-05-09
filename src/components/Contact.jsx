import { useState } from "react";
import { FiMail, FiMapPin, FiEdit } from "react-icons/fi"; // Import FiEdit for the edit/contact icon
import { FaLinkedin } from "react-icons/fa";
import ContactFormModal from "./ContactFormModal";
import SectionBackground from "./SectionBackground";
import hexagonBg from "../assets/backgrounds/IconGrid.svg";

const Contact = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="contact" className="bg-gray-50 py-20 px-6 md:px-24 text-center relative overflow-hidden">
      <SectionBackground imageSrc={hexagonBg} opacity={0.08} />

      <div className="relative z-5">
        <h2 className="text-3xl font-bold text-accent mb-6">Contact</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          I'm always open to opportunities, collaborations, or just a friendly chat. Feel free to reach out!
        </p>

        <div className="flex justify-center items-center gap-6 text-gray-700 text-lg mb-10 flex-wrap">
          <div className="flex items-center gap-2">
            <FiMail size={24} />
            <span className="select-all">kaminenirohit1@gmail.com</span>
          </div>
          <a
            href="https://www.linkedin.com/in/rohit-kamineni"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition"
          >
            <FaLinkedin size={24} />
          </a>
          <div className="flex items-center gap-2">
            <FiMapPin size={22} />
            <span>Hartford, CT</span>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-accent text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition text-lg flex items-center gap-2 mx-auto"
        >
          <FiEdit size={20} />  {/* Added FiEdit icon */}
          Leave Your Info
        </button>

        {showModal && <ContactFormModal onClose={() => setShowModal(false)} />}
      </div>
    </section>
  );
};

export default Contact;
