import { Container } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import { Particle } from "./Particle";
import { setFractal } from "./random";
const particleCount = 150;
const colors = [0xff6b6b, 0xffd93d, 0x6bcb77, 0x4d96ff];
let int: any;
const particles = [] as { size: number; color: number }[];
for (let i = 0; i < particleCount; i++) {
  particles.push({
    size: Math.random(),
    color: colors[Math.floor(Math.random() * colors.length)],
  });
}

export const Kaleidoscope = () => {
  const [noise, setNoise] = useState(1);

  useEffect(() => {
    int = setInterval(
      () =>
        setNoise((noise) => {
          setFractal(noise);
          return noise + 1;
        }),
      2000
    );
    return () => {
      //@ts-ignore
      int.removeInterval();
    };
  }, []);
  return (
    <Container position={[0, 0]}>
      {particles.map((particle, key) => {
        return (
          <Particle
            size={particle.size}
            color={particle.color}
            key={noise * key}
            noise={noise}
          />
        );
      })}
    </Container>
  );
};
