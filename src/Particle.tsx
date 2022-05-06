import { Container, Graphics, Sprite } from "@inlet/react-pixi";
import source from "./assets/source2.jpg";
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
import {
  IMAGE_ANCHOR_X,
  IMAGE_ANCHOR_Y,
  IMAGE_ROTATION,
  IMAGE_ROTATION_SPEED,
  IMAGE_ROTATION_ANGLE,
  IMAGE_SCALE,
} from "./config";
import { Loader } from "@pixi/loaders";

type Props = {
  rotation: number;
  stepPart: number;
  tick: number;
  delta: number;
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
  tick,
  delta,
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
  const [sourceDimensions, setSourceDiamensions] = useState([0, 0]);
  const [mirrorAxis, setMirrorAxis] = useState([0, 0]);

  useEffect(() => {
    // document.addEventListener("mouseover", getInitialMousePosition);
    const loader = new Loader();
    loader.add(source);
    loader.load((res) => {
      try {
        const sourceKey = Object.keys(res.resources)[0];
        const sourceLoaded = res.resources[sourceKey];
        setSourceDiamensions([
          sourceLoaded.data.width,
          sourceLoaded.data.height,
        ]);
      } catch (error) {
        console.error("error while loading sprite", error);
      }
    });
  }, []);

  const imageSize = useMemo(() => {
    return [
      sourceDimensions[0] * IMAGE_SCALE,
      sourceDimensions[1] * IMAGE_SCALE,
    ];
  }, [sourceDimensions]);

  useEffect(() => {
    if (imageSize[0] > 0 && imageSize[1] > 0) {
      const translateX = translate[0] * IMAGE_ANCHOR_X + mouseTranslate[0];
      const translateY = translate[1] * IMAGE_ANCHOR_Y + mouseTranslate[1];

      setMirrorAxis([
        Math.floor(translateX / imageSize[0]) % 2 === 0 ? -1 : 1,
        Math.floor(translateY / imageSize[1]) % 2 === 0 ? -1 : 1,
      ]);

      setSpriteTranslation([
        translateX % imageSize[0],
        translateY % imageSize[1],
      ]);
    }
  }, [imageSize, mouseTranslate, translate]);

  const uvGridMatrix = useMemo(() => {
    if (imageSize[0] > 0 && imageSize[1] > 0) {
      const gridSize =
        Math.ceil(sideSize / Math.min(imageSize[0], imageSize[1])) + 2; //2 extra sprite for margin transition
      const uv = [] as [number, number][];
      for (let u = -gridSize; u < gridSize; u++) {
        for (let v = -gridSize; v < gridSize; v++) {
          uv.push([u - 1, v - 1]);
        }
      }
      return uv;
    }
    return [];
  }, [imageSize]);
  const [imageRotation, setImageRotation] = useState(0);
  const rotateImage = useCallback((delta) => {
    const addAngle = IMAGE_ROTATION_ANGLE * IMAGE_ROTATION_SPEED * delta;
    setImageRotation((c) => c + degreesToRadians(addAngle));
  }, []);
  useEffect(() => {
    rotateImage(delta);
  }, [tick, delta, rotateImage]);

  if (sourceDimensions[0] === 0) {
    return null;
  }
  console.log(
    "spriteTranslation",
    spriteTranslation[0],
    spriteTranslation[0] > imageSize[0] / 2
  );
  return (
    <Container mask={maskRef?.current} rotation={rotation} scale={[1, flip]}>
      <Graphics name="mask" draw={draw} ref={maskRef} />
      <Container
        rotation={degreesToRadians(IMAGE_ROTATION) + imageRotation}
        anchor={0}
        scale={[1, 1]}
      >
        {uvGridMatrix.map((matrix, key) => {
          const mirrorX = matrix[0] % 2 === 0 ? -mirrorAxis[0] : mirrorAxis[0];
          const mirrorY = matrix[1] % 2 === 0 ? -mirrorAxis[1] : mirrorAxis[1];
          return (
            <Sprite
              image={source}
              position={[
                spriteTranslation[0] + matrix[0] * imageSize[0],
                spriteTranslation[1] + matrix[1] * imageSize[1],
              ]}
              width={imageSize[0]}
              height={imageSize[1]}
              key={`${matrix[0]}${matrix[1]}`}
              anchor={0.5}
              scale={[IMAGE_SCALE * mirrorX, IMAGE_SCALE * mirrorY]}
            />
          );
        })}
      </Container>
    </Container>
  );
};
