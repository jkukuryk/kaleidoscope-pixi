import { FunctionComponent, useCallback } from "react";
import { AppConfig, configStore } from "./config";

type Props = {
  store: AppConfig;
};

const ConfigPanelComponent: FunctionComponent<Props> = ({ store }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        padding: "10px",
        background: "#f0f0f0",
      }}
    >
      <Slide
        callback={store.setKaleidoscopeSlices}
        min={1}
        max={20}
        label={"slices"}
      />
    </div>
  );
};

type SlideProps = {
  min: number;
  max: number;
  label: string;
  callback: (val: number) => void;
};
const Slide: FunctionComponent<SlideProps> = ({
  min,
  max,
  label,
  callback,
}) => {
  const onChange = useCallback(
    (e) => {
      callback(e.target.value);
    },
    [callback]
  );
  return (
    <li>
      {label}: <input type="range" min={min} max={max} onChange={onChange} />
    </li>
  );
};

export const ConfigPanel = () => <ConfigPanelComponent store={configStore} />;
