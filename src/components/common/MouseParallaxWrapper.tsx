import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  children: React.ReactNode;
  intensity?: number; // default 20
}

const MouseParallaxWrapper: React.FC<Props> = ({ children, intensity = 20 }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / intensity;
      const y = (e.clientY - window.innerHeight / 2) / intensity;

      gsap.to(el, {
        x,
        y,
        ease: "power2.out",
        duration: 0.6,
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [intensity]);

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
};

export default MouseParallaxWrapper;
