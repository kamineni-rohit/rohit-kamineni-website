'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import websiteLogo from "@/assets/logos/website-logo.png";
import { isBlogEnabled } from "@/lib/environment";

const sectionIds = [
  "about",
  "projects",
  "education",
  "certifications",
  "resume",
  "contact",
];

// Check if blog should be shown
const showBlog = isBlogEnabled();

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const clickedSectionRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroText = document.getElementById("hero-text");
      if (heroText) {
        const rect = heroText.getBoundingClientRect();
        setIsScrolled(rect.top <= 140);
        if (rect.top > 140) {
          setActiveSection("");
          return;
        }
      }

      if (clickedSectionRef.current) return;

      const sections = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          const rect = el?.getBoundingClientRect();
          if (!rect) return null;
          const height = window.innerHeight;
          const visibleHeight = Math.min(rect.bottom, height) - Math.max(rect.top, 0);
          const ratio = visibleHeight / rect.height;
          return { id, rect, visibleRatio: ratio };
        })
        .filter(Boolean)
        .filter((s) => s.visibleRatio > 0.3);

      if (sections.length === 0) {
        setActiveSection("");
        return;
      }

      const contact = sections.find((s) => s.id === "contact");
      if (contact) {
        setActiveSection("contact");
        return;
      }

      const resume = sections.find((s) => s.id === "resume");
      if (resume && !contact) {
        setActiveSection("resume");
        return;
      }

      const sorted = sections.sort((a, b) => a.rect.top - b.rect.top);
      setActiveSection(sorted[0].id);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const resetClick = () => (clickedSectionRef.current = null);
    window.addEventListener("scroll", resetClick);
    return () => window.removeEventListener("scroll", resetClick);
  }, []);

  const handleNavClick = (id) => {
    clickedSectionRef.current = id;
    setActiveSection(id);
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white bg-opacity-90 shadow-md backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Home */}
        <a href="#" className="flex items-center gap-2 text-accent font-bold text-xl hover:opacity-80 transition">
          <img
            src={websiteLogo.src || websiteLogo}
            alt="Website Logo"
            className="h-8 w-8 object-contain"
          />
          Home
        </a>

        {/* Desktop Nav */}
        <div className="space-x-6 font-medium text-gray-700 text-sm hidden md:flex">
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`relative capitalize transition duration-300 group ${
                activeSection === id ? "text-accent font-bold" : "hover:text-accent"
              }`}
            >
              <span>{id}</span>
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-400 ease-in-out group-hover:w-full w-0`}
              />
            </button>
          ))}
          {showBlog && (
            <Link
              href="/blog"
              className="relative capitalize transition duration-300 group hover:text-accent"
            >
              <span>blog</span>
              <span
                className="absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-400 ease-in-out group-hover:w-full w-0"
              />
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div ref={dropdownRef} className="md:hidden bg-white shadow-md px-6 pb-4 pt-2 space-y-2">
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`block w-full text-left capitalize transition duration-300 group ${
                activeSection === id ? "text-accent font-bold" : "text-gray-700 hover:text-accent"
              }`}
            >
              <span className="relative">{id}</span>
            </button>
          ))}
          {showBlog && (
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left capitalize transition duration-300 text-gray-700 hover:text-accent"
            >
              <span className="relative">blog</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
