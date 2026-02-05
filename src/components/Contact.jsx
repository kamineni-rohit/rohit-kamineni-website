'use client'

import { useState } from "react";
import { FiMail, FiMapPin, FiEdit } from "react-icons/fi"; // Import FiEdit for the edit/contact icon
import { FaLinkedin } from "react-icons/fa";
import ContactFormModal from "@/components/ContactFormModal";
import SectionBackground from "@/components/SectionBackground";
import hexagonBg from "@/assets/backgrounds/IconGrid.svg";

const Contact = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="contact" className="bg-gray-50 py-24 px-6 md:px-24 text-center relative overflow-hidden">
      <SectionBackground imageSrc={hexagonBg} opacity={0.08} />

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-6">Contact</h2>
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
            <FiMapPin size={24} />
            <span>Hartford, CT</span>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-accent text-white font-medium px-6 py-2.5 rounded-lg hover:bg-accent/90 transition-colors duration-150 flex items-center gap-2 mx-auto"
        >
          <FiEdit />
          Leave Your Info
        </button>

        {showModal && <ContactFormModal onClose={() => setShowModal(false)} />}
      </div>
    </section>
  );
};

export default Contact;
