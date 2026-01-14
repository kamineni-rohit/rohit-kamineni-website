import React, { useEffect, useRef, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { FiX, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

import { useTransition, animated } from "@react-spring/web";
import emailjs from "@emailjs/browser";

const reasons = ["Job Opportunity", "Collaboration", "Just Saying Hi", "Project Inquiry", "Other"];

// Initialize EmailJS with public key
if (typeof window !== 'undefined') {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef();

  const modalTransitions = useTransition(true, {
    from: { opacity: 0, transform: "scale(0.95) translateY(-20px)" },
    enter: { opacity: 1, transform: "scale(1) translateY(0px)" },
    leave: { opacity: 0, transform: "scale(0.95) translateY(20px)" },
    config: { tension: 280, friction: 25 },
  });

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.first.trim()) errs.first = "First name is required";
    if (!formData.last.trim()) errs.last = "Last name is required";
    if (!emailRegex.test(formData.email)) errs.email = "Invalid email address";
    if (!formData.reason) errs.reason = "Please select a reason"; 
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs); 
    
    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true); 
      setErrors(prev => ({ ...prev, submit: undefined })); 

      const emailData = {
        ...formData,
        reason: typeof formData.reason === 'object' ? formData.reason.name : formData.reason,
      };

      // Debug: Log environment variables (remove after testing)
      console.log('EmailJS Config:', {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        hasPublicKey: !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      });

      // Send email using initialized EmailJS
      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          emailData
        )
        .then((response) => {
          console.log('Email sent successfully:', response.status, response.text);
          setShowThankYou(true);
          setIsSubmitting(false);
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            setErrors(prev => ({ ...prev, submit: `Failed to send message: ${error.text || error.message || 'Unknown error'}`}));
            setIsSubmitting(false);
        });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (!isSubmitting) { 
             onClose();
        }
      }
    };
    if (!showThankYou) { 
        document.body.style.overflow = "hidden";
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose, showThankYou, isSubmitting]); 

  // Base classes for standard input fields (text, email, textarea)
  const inputBaseClasses = "w-full border rounded-lg px-4 py-2.5 bg-slate-50 placeholder-slate-400 text-slate-800 transition-colors duration-150 ease-in-out";
  // Base classes for the Listbox button (omits placeholder-slate-400 and default text-slate-800)
  const listboxButtonBaseClasses = "w-full border rounded-lg px-4 py-2.5 bg-slate-50 text-left flex justify-between items-center transition-colors duration-150 ease-in-out";
  
  const inputBorderClasses = "border-slate-300 focus:border-accent focus:ring-2 focus:ring-accent/50";
  const inputErrorClasses = "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
      {modalTransitions((style, item) =>
        item ? (
          <animated.div style={style}>
            <div
              ref={modalRef}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative"
            >
              {!showThankYou ? (
                <>
                <button
                  onClick={onClose}
                  disabled={isSubmitting} 
                  className={`absolute top-5 right-5 text-slate-400 hover:text-accent p-1 rounded-full hover:bg-slate-100 transition-colors duration-150 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                  aria-label="Close modal"
                >
                  <FiX size={24} />
                </button>
                <div className="text-center mb-8"> 
                  <h3 className="text-3xl font-semibold text-accent">Get In Touch</h3> 
                </div>
                <form onSubmit={handleSubmit} className="space-y-5"> 
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <label htmlFor="first" className="sr-only">First Name</label>
                      <input
                        id="first"
                        type="text"
                        placeholder="First Name*"
                        className={`${inputBaseClasses} ${errors.first ? inputErrorClasses : inputBorderClasses}`}
                        value={formData.first}
                        onChange={(e) => setFormData({ ...formData, first: e.target.value })}
                        disabled={isSubmitting}
                      />
                      {errors.first && <p className="text-red-500 text-xs mt-1 ml-1">{errors.first}</p>}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="last" className="sr-only">Last Name</label>
                      <input
                        id="last"
                        type="text"
                        placeholder="Last Name*"
                        className={`${inputBaseClasses} ${errors.last ? inputErrorClasses : inputBorderClasses}`}
                        value={formData.last}
                        onChange={(e) => setFormData({ ...formData, last: e.target.value })}
                        disabled={isSubmitting}
                      />
                      {errors.last && <p className="text-red-500 text-xs mt-1 ml-1">{errors.last}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email*"
                      className={`${inputBaseClasses} ${errors.email ? inputErrorClasses : inputBorderClasses}`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <Listbox
                      value={formData.reason}
                      onChange={(val) => setFormData({ ...formData, reason: val })}
                      disabled={isSubmitting}
                    >
                      {({ open }) => ( 
                        <div className="relative">
                          <Listbox.Button
                            className={`${listboxButtonBaseClasses} // Using new base class for Listbox button
                            ${formData.reason ? "text-slate-800" : "text-slate-400"} // Conditional text color
                            ${errors.reason ? inputErrorClasses : inputBorderClasses}
                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {formData.reason || "Why are you contacting?*"}
                            <HiChevronDown
                              className={`h-5 w-5 text-slate-400 transition-transform duration-200 ease-in-out ${
                                open ? "transform rotate-180" : ""
                              }`}
                            />
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1 overflow-hidden">
                              {reasons.map((option) => (
                                <Listbox.Option
                                  key={option}
                                  value={option}
                                  className={({ active, selected }) =>
                                    `px-4 py-2.5 cursor-pointer text-sm transition-colors duration-100 ease-in-out
                                    ${active ? "bg-accent/10 text-accent" : "text-slate-700"}
                                    ${selected ? "font-semibold bg-accent/15 text-accent" : "font-normal"}`
                                  }
                                >
                                  {option}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                          {errors.reason && <p className="text-red-500 text-xs mt-1 ml-1">{errors.reason}</p>}
                        </div>
                      )}
                    </Listbox>
                  </div>

                  <input
                    type="tel" 
                    placeholder="Phone (optional)"
                    className={`${inputBaseClasses} ${inputBorderClasses} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isSubmitting}
                  />

                  <input
                    type="url" 
                    placeholder="LinkedIn Profile URL (optional)"
                    className={`${inputBaseClasses} ${inputBorderClasses} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    disabled={isSubmitting}
                  />

                  <textarea
                    rows="4"
                    placeholder="Your Message (optional)"
                    className={`${inputBaseClasses} ${inputBorderClasses} min-h-[100px] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                  />
                  
                  {errors.submit && 
                    <div className="flex items-center text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-200">
                        <FiAlertCircle className="mr-2 h-5 w-5 flex-shrink-0"/> <span>{errors.submit}</span>
                    </div>
                  }

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-accent text-white py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-150 ease-in-out font-semibold text-base shadow-md flex items-center justify-center
                                ${isSubmitting 
                                  ? 'opacity-75 cursor-not-allowed bg-accent/80' 
                                  : 'hover:bg-accent/90 hover:shadow-lg transform hover:scale-[1.01]'
                                }`}
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin h-5 w-5 mr-3" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10 flex flex-col items-center">
                <FiCheckCircle className="text-green-500 h-16 w-16 mb-6" />
                <h3 className="text-3xl font-semibold text-accent mb-3">Thank You!</h3>
                <p className="text-slate-700 text-lg mb-8">Your message has been sent. I'll get back to you shortly.</p>
                  <button
                    onClick={onClose}
                    className="bg-accent text-white px-8 py-2.5 rounded-lg hover:bg-accent/90 transition-colors duration-150 font-medium shadow hover:shadow-md"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default ContactFormModal;
