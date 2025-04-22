import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/engine";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // Load a slim preset to reduce bundle size
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 100 } },
        },
        particles: {
          color: { value: "#d1d5db" },
          links: {
            enable: true,
            distance: 130,
            color: "#d1d5db",
            opacity: 0.5,
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
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    />
  );
};

export default ParticlesBackground;
