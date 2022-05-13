import { observer } from 'mobx-react';
import { FunctionComponent, useCallback, useMemo } from 'react';
import { AppConfig, configStore } from './config';

type Props = {
  store: AppConfig;
};

const ConfigPanelComponent: FunctionComponent<Props> = observer(({ store }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '10px',
        background: '#f0f0f0',
      }}
    >
      <h3>Kaleidoscope</h3>
      <Slide
        callback={store.setKaleidoscopeSlices}
        min={1}
        max={20}
        label={'kaleidoscopeSlices'}
        value={store.kaleidoscopeSlices}
      />
      <Slide
        callback={store.setKaleidoscopeRotationSpeed}
        min={0}
        max={0.01}
        step={0.00001}
        label={'kaleidoscopeRotationSpeed'}
        value={store.kaleidoscopeRotationSpeed}
        renderValue={(value) => Math.round(value * 10000)}
      />
      <h3>Image</h3>
      <Slide
        callback={store.setImageRotation}
        min={0}
        max={360}
        label={'imageRotation'}
        value={store.imageRotation}
      />

      <Slide
        callback={store.setImageTranslationSpeedX}
        min={-0.1}
        max={0.1}
        label={'imageTranslationSpeedX'}
        value={store.imageTranslationSpeedX}
        step={0.001}
        renderValue={(value) => Math.round(value * 100)}
      />
      <Slide
        callback={store.setImageScale}
        min={0.2}
        max={5}
        label={'imageScale'}
        value={store.imageScale}
        step={0.01}
      />

      <Slide
        callback={store.setImageRotationSpeed}
        min={0}
        max={2}
        label={'imageRotationSpeed'}
        value={store.imageRotationSpeed}
        step={0.01}
      />
      <Slide
        callback={store.setImageRotationAngle}
        min={0}
        max={2}
        label={'imageRotationAngle'}
        value={store.imageRotationAngle}
        step={0.01}
      />
      <Slide
        callback={store.setImageAnchorX}
        min={0}
        max={2}
        label={'imageAnchorX'}
        value={store.imageAnchorX}
        step={0.01}
      />
      <Slide
        callback={store.setImageAnchorY}
        min={0}
        max={2}
        label={'imageAnchorY'}
        value={store.imageAnchorY}
        step={0.01}
      />
    </div>
  );
});

type SlideProps = {
  min: number;
  max: number;
  value: number;
  step?: number;
  label: string;
  callback: (val: number) => void;
  renderValue?: (value: number) => number | string;
};
const Slide: FunctionComponent<SlideProps> = ({
  min,
  max,
  label,
  callback,
  value,
  step = 1,
  renderValue,
}) => {
  const onChange = useCallback(
    (e) => {
      callback(e.target.value);
    },
    [callback]
  );
  const displayValue = useMemo(() => {
    if (renderValue) {
      return renderValue(value);
    } else {
      return value;
    }
  }, [value, renderValue]);
  return (
    <li style={{ padding: '0.3rem' }}>
      <label style={{ display: 'inline-block', width: '30ch' }}>
        {label} {displayValue}:
      </label>
      <input
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </li>
  );
};

export const ConfigPanel = () => <ConfigPanelComponent store={configStore} />;
