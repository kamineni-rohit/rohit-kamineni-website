import { useEffect, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";
import emailjs from "emailjs-com";

const reasons = ["Job Opportunity", "Collaboration", "Just Saying Hi"];

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

  // Modal mount animation
  const transitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 250, friction: 20 },
  });

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
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            ref={modalRef}
            className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative"
          >
            {!showThankYou ? (
              <>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl transition"
                  aria-label="Close modal"
                >
                  &times;
                </button>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-accent">Leave Your Info</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
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

                  <Listbox
                    value={formData.reason}
                    onChange={(val) => setFormData({ ...formData, reason: val })}
                  >
                    <div className="relative">
                      <Listbox.Button
                        className={`w-full text-left border rounded-md px-4 py-2 ${
                          formData.reason ? "text-black" : "text-gray-400"
                        } ${errors.reason ? "border-red-500" : "border-gray-300"}`}
                      >
                        {formData.reason || "Why are you contacting?*"}
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <HiChevronDown />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        {reasons.map((option) => (
                          <Listbox.Option
                            key={option}
                            value={option}
                            className={({ active }) =>
                              `px-4 py-2 cursor-pointer ${
                                active ? "bg-blue-50 text-accent" : "text-gray-800"
                              }`
                            }
                          >
                            {option}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>

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
          </animated.div>
        ) : null
      )}
      <div className="fixed inset-0 -z-10 backdrop-blur-sm" onClick={onClose} />
    </div>
  );
};

export default ContactFormModal;
