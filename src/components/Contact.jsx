const Contact = () => {
    return (
      <section id="contact" className="bg-gray-50 py-20 px-6 md:px-24 text-center">
        <h2 className="text-3xl font-bold text-accent mb-6">Contact</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
          I'm always open to opportunities, collaborations, or just a friendly chat. Feel free to reach out!
        </p>
        <div className="space-y-2 text-gray-700 text-md">
          <p><strong>Email:</strong> <a href="mailto:kaminenirohit1@gmail.com" className="text-accent hover:underline">kaminenirohit1@gmail.com</a></p>
          <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rohit-kamineni" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">linkedin.com/in/rohit-kamineni</a></p>
          <p><strong>Location:</strong> Hartford, CT</p>
        </div>
      </section>
    );
  };
  
  export default Contact;
  