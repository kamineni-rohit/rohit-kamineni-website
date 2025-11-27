const SectionBackground = ({ imageSrc, opacity = 0.08 }) => {
  // Handle both string and Next.js image object formats
  const imgSrc = typeof imageSrc === 'string' ? imageSrc : imageSrc?.src || imageSrc;

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        opacity,
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <img
        src={imgSrc}
        alt=""
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
};
  
  export default SectionBackground;
  