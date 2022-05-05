import { Container, Graphics, Sprite } from "@inlet/react-pixi";
import source from "./assets/source3.png";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { sideSize, viewSize } from "./constants";
import { degreesToRadians } from "./math";
import { ROTATION, SCALE } from "./config";

type Props = {
  rotation: number;
  stepPart: number;

  flip: -1 | 1;
  translate: number[];
  mouseTranslate: number[];
};
export const Particle: FunctionComponent<Props> = ({
  rotation,
  flip,
  translate,
  stepPart,
  mouseTranslate,
}) => {
  const maskRef = useRef(null);
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(0x900000);
      g.moveTo(0, 0);
      g.arc(0, 0, viewSize, degreesToRadians(0), stepPart);
      g.lineTo(0, 0);
      g.endFill();
    },
    [stepPart]
  );

  const [spriteTranslation, setSpriteTranslation] = useState(translate);

  const imageSize = useMemo(() => {
    return sideSize * SCALE;
  }, []);

  useEffect(() => {
    const translateX = (translate[0] + mouseTranslate[0]) % imageSize;
    const translateY = (translate[1] + mouseTranslate[1]) % imageSize;

    setSpriteTranslation([translateX, translateY]);
  }, [imageSize, mouseTranslate, translate]);

  const uvGridMatrix = useMemo(() => {
    const gridSize = Math.ceil(sideSize / imageSize) + 2; //2 extra sprite for margin transition
    const uv = [] as [number, number][];
    for (let u = -gridSize; u < gridSize; u++) {
      for (let v = -gridSize; v < gridSize; v++) {
        uv.push([u - 1, v - 1]);
      }
    }
    return uv;
  }, [imageSize]);

  return (
    <Container mask={maskRef?.current} rotation={rotation} scale={[1, flip]}>
      <Graphics name="mask" draw={draw} ref={maskRef} />
      <Container rotation={degreesToRadians(ROTATION)} anchor={0.5}>
        {uvGridMatrix.map((matrix, key) => {
          return (
            <Sprite
              image={source}
              x={spriteTranslation[0] + matrix[0] * imageSize}
              y={spriteTranslation[1] + matrix[1] * imageSize}
              width={imageSize}
              height={imageSize}
              key={`${matrix[0]}${matrix[1]}${key}`}
            />
          );
        })}
      </Container>
    </Container>
  );
};
