import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            number: { value: 240, density: { enable: true, area: 800 } },
            color: { value: "#cbd5e1" }, // lighter gray
            links: {
              enable: true,
              distance: 125,
              color: "#cbd5e1",
              opacity: 0.6, // slightly more visible
              width: 1.2,
            },
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              outModes: "bounce",
            },
            shape: { type: "circle" },
            size: { value: { min: 1.5, max: 3.5 } },
            opacity: { value: 1 },
          },
          detectRetina: true,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
