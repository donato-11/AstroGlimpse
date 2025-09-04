import { useMemo } from "react";

type Star = { top: string; left: string; size: number };

export const StarBackground = () => {
  const stars = useMemo(() => {
    const s: Star[] = [];
    for (let i = 0; i < 300; i++) {
      s.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3,
      });
    }
    return s;
  }, []);

  return (
    <div className="fixed inset-0 bg-black -z-10 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="star absolute  rounded-full transition-all duration-300"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            background: "white",
            boxShadow: `100 100 ${star.size * 6}px rgba(255,255,255,1)`,
          }}
        />
      ))}
    </div>
  );
};


export const StarBackground2 = () => {
  const stars = useMemo(() => {
    const s: Star[] = [];
    for (let i = 0; i < 300; i++) {
      s.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3,
      });
    }
    return s;
  }, []);

  return (
    <div className="fixed inset-0 bg-black -z-10 overflow-hidden">
      {stars.map((star, i) => (
        <span
          key={i}
          className="star absolute rounded-full transition duration-300"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.1) 90%)`,
            boxShadow: `0 0 ${star.size * 6}px rgba(255,255,255,1)`,
          }}
        />
      ))}
    </div>
  );
};
