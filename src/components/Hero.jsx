const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-start px-6 md:px-24 bg-gray-50 pt-24"
    >
      <p className="text-accent font-semibold text-lg">Hi, my name is</p>
      <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mt-2">
        Rohit Kamineni
      </h1>
      <h2 className="text-xl sm:text-2xl text-gray-600 mt-4 max-w-xl leading-relaxed">
        I build data platforms, pipelines, and machine learning solutions that drive real-world impact.
      </h2>
      <a
        href="#projects"
        className="mt-8 inline-block bg-accent text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        See My Work
      </a>
    </section>
  );
};

export default Hero;
