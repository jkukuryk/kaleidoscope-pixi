import { Container, Graphics, Sprite } from "@inlet/react-pixi";
import source from "./assets/source3.png";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { viewSize } from "./constants";
import { degreesToRadians } from "./math";

type Props = {
  rotation: number;
  stepPart: number;

  flip: -1 | 1;
  translate: number[];
  mouseTranslate: number[];
};
const uvGridMatrix = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
export const Particle: FunctionComponent<Props> = ({
  rotation,
  flip,
  translate,
  stepPart,
  mouseTranslate,
}) => {
  const maskRef = useRef(null);
  const draw = useCallback(
    (g, key: number) => {
      g.clear();
      g.beginFill(0x900000);
      g.moveTo(0, 0);
      g.arc(0, 0, viewSize * 2, degreesToRadians(0), stepPart);
      g.lineTo(0, 0);
      g.endFill();
    },
    [stepPart]
  );

  const [spriteTranslation, setSpriteTranslation] = useState(translate);

  useEffect(() => {
    const translateX = translate[0] + mouseTranslate[0];
    const translateY = translate[1] + mouseTranslate[1];
    const stepX = Math.floor(translateX / viewSize);
    const stepY = Math.floor(translateY / viewSize);

    setSpriteTranslation([
      translateX - stepX * viewSize,
      translateY - stepY * viewSize,
    ]);
  }, [mouseTranslate, translate]);

  return (
    <Container
      position={[0, 0]}
      mask={maskRef?.current}
      rotation={rotation}
      scale={[1, flip]}
    >
      <Graphics
        name="mask"
        draw={(g) => draw(g, 1)}
        ref={maskRef}
        scale={[1, 1]}
      />
      {uvGridMatrix.map((matrix) => (
        <Sprite
          image={source}
          anchor={0.5}
          x={spriteTranslation[0] + matrix[0] * viewSize}
          y={spriteTranslation[1] + matrix[1] * viewSize}
          width={viewSize}
          height={viewSize}
          key={`${matrix[0]}${matrix[1]}`}
        />
      ))}
    </Container>
  );
};
