import { Container, Stage } from "@inlet/react-pixi";
import { useCallback, useEffect, useState } from "react";
import { ConfigPanel } from "./ConfigPanel";
import { sideSize, viewSize } from "./constants";
import { Kaleidoscope } from "./Kaleidoscope";

function App() {
  const [viewScale, setViesScale] = useState(1);
  const [viewTransation, setViewTransation] = useState([0, 0]);

  const setViewScale = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxSize = Math.max(vw, vh);
    const scale = maxSize / viewSize;
    setViesScale(scale);

    const marginX = (vw - maxSize) / 2;
    const marginY = (vh - maxSize) / 2;
    setViewTransation([marginX, marginY]);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setViewScale);
    setViewScale();
    return () => {
      window.removeEventListener("resize", setViewScale);
    };
  }, [setViewScale]);
  return (
    <>
      <Stage
        options={{
          resolution: window.devicePixelRatio,
          autoDensity: true,
          backgroundColor: 0xe6e6e6,
        }}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Container
          scale={viewScale}
          position={[viewTransation[0], viewTransation[1]]}
        >
          <Container position={[sideSize, sideSize]}>
            <Kaleidoscope />
          </Container>
        </Container>
      </Stage>
      <ConfigPanel />
    </>
  );
}

export default App;
