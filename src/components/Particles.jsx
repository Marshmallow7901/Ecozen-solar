import { useCallback } from "react";
import Particles from "react-tsparticles";

export default function SolarParticles({ className = "" }) {
  const particlesInit = useCallback(async (engine) => {
    // no-op init; keeping hook for future engine customisation
  }, []);

  return (
    <Particles
      id="solar-particles"
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      init={particlesInit}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: false },
            resize: true,
          },
        },
        particles: {
          color: {
            value: ["#30d158", "#86efac", "#22c55e", "#10b981"],
          },
          move: {
            direction: "top",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 0.3,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 25,
          },
          opacity: {
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
            },
            value: {
              min: 0.1,
              max: 0.3,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
            },
            value: {
              min: 1,
              max: 3,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

