import { useCallback, useEffect, useState } from "react";
import { Container, Stage } from "@inlet/react-pixi";
import { Kaleidoscope } from "./Kaleidoscope";
export const viewSize = 1500;

function App() {
  const [screenSize, setscreenSize] = useState([0, 0]);
  const [viewScale, setViewScale] = useState(1);

  const reportWindowSize = useCallback(() => {
    setscreenSize([document.body.clientWidth, document.body.clientHeight]);
    const newGameScale =
      Math.min(document.body.clientWidth, document.body.clientHeight) /
      viewSize;
    setViewScale(newGameScale);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", reportWindowSize);
    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, [reportWindowSize]);

  return (
    <Stage
      options={{
        resolution: window.devicePixelRatio,
        autoDensity: true,
      }}
      width={screenSize[0]}
      height={screenSize[1]}
    >
      <Container position={[0, 0]} scale={viewScale}>
        <Kaleidoscope />
      </Container>
    </Stage>
  );
}

export default App;
