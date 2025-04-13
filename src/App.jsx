import Footer from './components/Footer';
import Contact from './components/Contact';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}
export default App;