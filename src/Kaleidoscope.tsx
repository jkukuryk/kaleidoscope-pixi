import { Container, Graphics } from "@inlet/react-pixi";
import { useCallback } from "react";

export const Kaleidoscope = () => {
  const draw = useCallback((g) => {
    g.clear();
    g.beginFill(0xff3300);
    g.lineStyle(4, 0xffd900, 1);
    g.moveTo(50, 50);
    g.lineTo(250, 50);
    g.lineTo(100, 100);
    g.lineTo(50, 50);
    g.endFill();
  }, []);

  return (
    <Container>
      <Graphics draw={draw} />
    </Container>
  );
};
