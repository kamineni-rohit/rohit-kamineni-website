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
          particles: {
            number: { value: 360, density: { enable: true, value_area: 800 } },
            color: { value: "#d1d5db" },
            links: {
              enable: true,
              distance: 130,
              color: "#d1d5db",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              outModes: "bounce",
            },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.6 },
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
