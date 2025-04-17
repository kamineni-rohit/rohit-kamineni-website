import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <a
                    href="#"
                    className="text-accent font-bold text-xl hover:opacity-80 transition"
                >
                    Home
                </a>

                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                <div className={`md:flex md:space-x-6 font-medium text-gray-700 text-sm ${isOpen ? 'block' : 'hidden'
                    }`}>
                    <a href="#about" className="block py-2 md:py-0 hover:text-accent">About</a>
                    <a href="#projects" className="block py-2 md:py-0 hover:text-accent">Projects</a>
                    <a href="#resume" className="block py-2 md:py-0 hover:text-accent">Resume</a>
                    <a href="#contact" className="block py-2 md:py-0 hover:text-accent">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
