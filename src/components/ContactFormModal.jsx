import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";

const ContactFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    reason: "",
    phone: "",
    linkedin: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const modalRef = useRef();

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.first.trim()) errs.first = true;
    if (!formData.last.trim()) errs.last = true;
    if (!emailRegex.test(formData.email)) errs.email = true;
    if (!formData.reason.trim()) errs.reason = true;

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formData,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(() => setShowThankYou(true))
        .catch((error) => console.error("EmailJS Error:", error));
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative animate-fade-in touch-manipulation"
      >
        {!showThankYou ? (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-gray-600 text-2xl font-thin"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="flex justify-center mb-6">
              <h3 className="text-2xl font-bold text-accent text-center">Leave Your Info</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name*"
                  className={`flex-1 border rounded-md px-4 py-2 ${
                    errors.first ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.first}
                  onChange={(e) => setFormData({ ...formData, first: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  className={`flex-1 border rounded-md px-4 py-2 ${
                    errors.last ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.last}
                  onChange={(e) => setFormData({ ...formData, last: e.target.value })}
                />
              </div>

              <input
                type="email"
                placeholder="Email*"
                className={`w-full border rounded-md px-4 py-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className={`w-full border rounded-md px-4 py-2 text-gray-700 ${
                  errors.reason ? "border-red-500" : "border-gray-300"
                } ${formData.reason ? "text-black" : "text-gray-400"}`}
              >
                <option value="" disabled hidden>
                  Why are you contacting?*
                </option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Just Saying Hi">Just Saying Hi</option>
              </select>

              <input
                type="text"
                placeholder="Phone (optional)"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <input
                type="text"
                placeholder="LinkedIn (optional)"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              />

              <textarea
                rows="4"
                placeholder="Message (optional)"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <button
                type="submit"
                className="w-full bg-accent text-white py-2.5 rounded-md hover:opacity-90 transition font-medium"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <h3 className="text-2xl font-semibold text-accent mb-2">Thank you!</h3>
            <p className="text-gray-700 text-lg">I'll get back to you as soon as I can.</p>
            <button
              onClick={onClose}
              className="mt-6 bg-accent text-white px-6 py-2 rounded-md hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactFormModal;
