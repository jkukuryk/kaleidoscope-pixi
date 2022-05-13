import { Container, useTick } from '@inlet/react-pixi';
import { observer } from 'mobx-react';
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { AppConfig, configStore } from './config';
import { degreesToRadians } from './math';
import { Particle } from './Particle';

const KaleidoscopeComponent: FunctionComponent<{ store: AppConfig }> = observer(
  ({ store }) => {
    const [rotation, setRotation] = useState(0);
    const [tick, setTick] = useState(0);
    const [delta, setDelta] = useState(0);
    const [translation, setTranslation] = useState([0, 0]);
    const [mouseTranslate, setMouseTranslation] = useState([0, 0]);
    const stepPart = useMemo(() => {
      return degreesToRadians(360 / store.kaleidoscopeSlices);
    }, [store.kaleidoscopeSlices]);

    const reflections = useMemo(() => {
      const parts = [] as number[];
      for (let i = 0; i < store.kaleidoscopeSlices; i++) {
        parts.push(i * stepPart);
      }
      return parts;
    }, [stepPart, store.kaleidoscopeSlices]);

    const updateKaleidoscope = useCallback(
      (delta) => {
        setRotation((current) => {
          return current + Math.PI * store.kaleidoscopeRotationSpeed;
        });
        setTranslation((current) => {
          return [
            current[0] + store.imageTranslationSpeedX,
            current[1] - store.imageTranslationSpeedY,
          ];
        });
        setTick((c) => c + 1);
        setDelta(delta);
      },
      [
        store.imageTranslationSpeedX,
        store.imageTranslationSpeedY,
        store.kaleidoscopeRotationSpeed,
      ]
    );
    useTick(updateKaleidoscope);

    const changeTranslate = useCallback((e) => {
      setMouseTranslation([e.pageX, e.pageY]);
    }, []);

    const getInitialMousePosition = useCallback((e) => {
      // document.removeEventListener("mouseover", getInitialMousePosition);
      setMouseTranslation([e.pageX, e.pageY]);
    }, []);
    useEffect(() => {
      document.addEventListener('mousemove', changeTranslate);
      // document.addEventListener("mouseover", getInitialMousePosition);
      return () => {
        document.removeEventListener('mousemove', changeTranslate);
      };
    }, [changeTranslate, getInitialMousePosition]);

    return (
      <Container key={store.factor}>
        {reflections.map((stepRotation) => {
          return (
            <Particle
              rotation={rotation + stepRotation}
              flip={1}
              translate={[translation[0], translation[1]]}
              mouseTranslate={mouseTranslate}
              stepPart={stepPart / 2}
              key={`${stepRotation}${store.factor}|1`}
              tick={tick}
              delta={delta}
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
              key={`${stepRotation}${store.factor}|-1`}
              tick={tick}
              delta={delta}
            />
          );
        })}
      </Container>
    );
  }
);

export const Kaleidoscope = () => <KaleidoscopeComponent store={configStore} />;
