import { Container, useTick } from "@inlet/react-pixi";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  KALEIDOSCOPE_SLICES,
  KALEIDOSCOPE_ROTATION_SPEED,
  IMAGE_TRANSLATION_SPEED_X,
  IMAGE_TRANSLATION_SPEED_Y,
} from "./config";
import { degreesToRadians } from "./math";
import { Particle } from "./Particle";

export const Kaleidoscope = () => {
  const [rotation, setRotation] = useState(0);
  const [translation, setTranslation] = useState([0, 0]);
  const [mouseTranslate, setMouseTranslation] = useState([0, 0]);
  const stepPart = useMemo(() => {
    return degreesToRadians(360 / KALEIDOSCOPE_SLICES);
  }, []);

  const reflections = useMemo(() => {
    const parts = [] as number[];
    for (let i = 0; i < KALEIDOSCOPE_SLICES; i++) {
      parts.push(i * stepPart);
    }
    return parts;
  }, [stepPart]);

  const updateKaleidoscope = useCallback(() => {
    setRotation((current) => {
      return current + Math.PI * KALEIDOSCOPE_ROTATION_SPEED;
    });
    setTranslation((current) => {
      return [
        current[0] + IMAGE_TRANSLATION_SPEED_X,
        current[1] - IMAGE_TRANSLATION_SPEED_Y,
      ];
    });
  }, []);
  useTick(updateKaleidoscope);

  const changeTranslate = useCallback((e) => {
    setMouseTranslation([e.pageX, e.pageY]);
  }, []);

  const getInitialMousePosition = useCallback((e) => {
    // document.removeEventListener("mouseover", getInitialMousePosition);
    setMouseTranslation([e.pageX, e.pageY]);
  }, []);
  useEffect(() => {
    document.addEventListener("mousemove", changeTranslate);
    // document.addEventListener("mouseover", getInitialMousePosition);
    return () => {
      document.removeEventListener("mousemove", changeTranslate);
    };
  }, [changeTranslate, getInitialMousePosition]);

  return (
    <Container>
      {reflections.map((stepRotation) => {
        return (
          <Particle
            rotation={rotation + stepRotation}
            flip={1}
            translate={[translation[0], translation[1]]}
            mouseTranslate={mouseTranslate}
            stepPart={stepPart / 2}
            key={`${stepRotation}|1`}
          />
        );
      })}
      {reflections.map((stepRotation) => {
        return (
          <Particle
            rotation={rotation + stepRotation}
            flip={-1}
            translate={[translation[0], translation[1]]}
            mouseTranslate={mouseTranslate}
            stepPart={stepPart / 2}
            key={`${stepRotation}|-1`}
          />
        );
      })}
    </Container>
  );
};
