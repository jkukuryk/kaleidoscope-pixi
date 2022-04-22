import { Container, Graphics } from "@inlet/react-pixi";
import * as pixi from "pixi.js";

import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { viewSize } from "./constants";
import { random } from "./random";

const MAX_EDGE_SIZE = viewSize * 0.16;
const MIN_EDGE_SIZE = viewSize * 0.04;
const CORNER_NOISE_SIZE = viewSize * 0.1;

type Props = {
  color: number;
  size: number;
  noise: number;
};
export const Particle: FunctionComponent<Props> = ({ color, size, noise }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const edgeSize = useMemo(() => {
    return MIN_EDGE_SIZE + size * (MAX_EDGE_SIZE - MIN_EDGE_SIZE);
  }, [size]);

  const draw = useCallback(
    (g, posX: number, posY: number) => {
      g.clear();
      g.beginFill(color);
      const xSign = Math.sign(posX);
      const ySign = Math.sign(posY);

      let cornerNoiseX = getCornerNoise(x + y);
      let cornerNoiseY = getCornerNoise(x + y * 2);

      g.moveTo(
        posX - (edgeSize / 2 + cornerNoiseX) * xSign,
        posY - (edgeSize / 2 + cornerNoiseY) * ySign
      );
      cornerNoiseX = getCornerNoise(x + y + 3);
      cornerNoiseY = getCornerNoise(x + y * 2 + 3);
      g.lineTo(
        posX + (edgeSize / 2 + cornerNoiseX) * xSign,
        posY - (edgeSize / 2 + cornerNoiseY) * ySign
      );
      cornerNoiseX = getCornerNoise(x + y + 4);
      cornerNoiseY = getCornerNoise(x + y * 2 + 4);
      g.lineTo(
        posX + (edgeSize / 2 + cornerNoiseX) * xSign,
        posY + (edgeSize / 2 + cornerNoiseY) * ySign
      );
      cornerNoiseX = getCornerNoise(x + y + 5);
      cornerNoiseY = getCornerNoise(x + y * 2 + 6);
      g.lineTo(
        posX - (edgeSize / 2 + cornerNoiseX) * xSign,
        posY + (edgeSize / 2 + cornerNoiseY) * ySign
      );
      g.endFill();
    },
    [color, edgeSize, x, y]
  );

  useEffect(() => {
    if (noise) {
      setX(Math.random() * viewSize);
      setY(Math.random() * viewSize);
    }
  }, [noise]);
  const styleProps = useMemo(() => {
    return {
      blendMode: pixi.BLEND_MODES.MULTIPLY,
      alphe: 0.6,
    };
  }, []);
  return (
    <Container position={[0, 0]}>
      <Graphics {...styleProps} draw={(g) => draw(g, x, y)} />
      <Graphics {...styleProps} draw={(g) => draw(g, -x, y)} />
      <Graphics {...styleProps} draw={(g) => draw(g, x, -y)} />
      <Graphics {...styleProps} draw={(g) => draw(g, -x, -y)} />

      <Graphics {...styleProps} draw={(g) => draw(g, y, x)} />
      <Graphics {...styleProps} draw={(g) => draw(g, y, -x)} />
      <Graphics {...styleProps} draw={(g) => draw(g, -y, x)} />
      <Graphics {...styleProps} draw={(g) => draw(g, -y, -x)} />
    </Container>
  );
};

function getCornerNoise(iteration: number) {
  return -CORNER_NOISE_SIZE / 2 + (random(iteration) * CORNER_NOISE_SIZE) / 2;
}
