import { Container, Stage } from "@inlet/react-pixi";
import { viewSize } from "./constants";
import { Kaleidoscope } from "./Kaleidoscope";

function App() {
  return (
    <Stage
      options={{
        resolution: window.devicePixelRatio,
        autoDensity: true,
        backgroundColor: 0xe6e6e6,
      }}
      width={viewSize * 2}
      height={viewSize * 2}
    >
      {
        //set position 0,0 at the center of Stage
      }
      <Container position={[viewSize, viewSize]}>
        <Kaleidoscope />
      </Container>
    </Stage>
  );
}

export default App;
