import { useState } from "react";
import { FiX } from "react-icons/fi";

const ContactFormModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-xl transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <FiX size={20} />
        </button>
        {submitted ? (
          <div className="text-center text-accent font-semibold text-lg animate-pulse">
            Thank you! Your info has been submitted 🎉
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4 text-accent">
              Leave Your Info
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  name="firstName"
                  required
                  placeholder="First Name*"
                  className="flex-1 border p-2 rounded"
                  onChange={handleChange}
                />
                <input
                  name="lastName"
                  required
                  placeholder="Last Name*"
                  className="flex-1 border p-2 rounded"
                  onChange={handleChange}
                />
              </div>
              <input
                name="email"
                type="email"
                required
                placeholder="Email*"
                className="w-full border p-2 rounded"
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone (optional)"
                className="w-full border p-2 rounded"
                onChange={handleChange}
              />
              <input
                name="linkedin"
                placeholder="LinkedIn (optional)"
                className="w-full border p-2 rounded"
                onChange={handleChange}
              />
              <textarea
                name="message"
                rows="3"
                placeholder="Message (optional)"
                className="w-full border p-2 rounded"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-accent text-white py-2 rounded hover:opacity-90 transition"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactFormModal;
