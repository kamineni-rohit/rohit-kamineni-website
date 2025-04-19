import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import LeadershipHonors from './components/LeadershipHonors';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Education />
      <Certifications />
      <LeadershipHonors />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
