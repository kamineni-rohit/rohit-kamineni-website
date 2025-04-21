import { useState, useEffect, useRef } from "react";

const ContactFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const modalRef = useRef();

  const validate = () => {
    const errs = {};
    if (!formData.first.trim()) errs.first = true;
    if (!formData.last.trim()) errs.last = true;
    if (!formData.email.trim() || !formData.email.includes("@")) errs.email = true;
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setShowThankYou(true);
    }
  };

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div ref={modalRef} className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
        {!showThankYou ? (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-gray-600 text-2xl font-thin"
            >
              &times;
            </button>
            <div className="flex justify-center mb-6">
              <h3 className="text-2xl font-bold text-accent">Leave Your Info</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name*"
                  className={`flex-1 border rounded-md px-4 py-2 ${errors.first ? "border-red-500" : "border-gray-300"}`}
                  value={formData.first}
                  onChange={(e) => setFormData({ ...formData, first: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  className={`flex-1 border rounded-md px-4 py-2 ${errors.last ? "border-red-500" : "border-gray-300"}`}
                  value={formData.last}
                  onChange={(e) => setFormData({ ...formData, last: e.target.value })}
                />
              </div>
              <input
                type="email"
                placeholder="Email*"
                className={`w-full border rounded-md px-4 py-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
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
