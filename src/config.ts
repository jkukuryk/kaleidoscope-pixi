import { makeAutoObservable } from 'mobx';

export class AppConfig {
  kaleidoscopeRotationSpeed: number;
  kaleidoscopeSlices: number;
  imageTranslationSpeedX: number;
  imageTranslationSpeedY: number;
  imageScale: number;
  imageRotation: number;
  imageRotationSpeed: number;
  imageRotationAngle: number;
  imageAnchorX: number;
  imageAnchorY: number;
  factor: number;

  constructor() {
    this.kaleidoscopeRotationSpeed = 0.001;
    this.kaleidoscopeSlices = 7;
    this.imageTranslationSpeedX = 0.02;
    this.imageTranslationSpeedY = -0.02;
    this.imageScale = 2;
    this.imageRotation = 20;
    this.imageRotationSpeed = 0.7;
    this.imageRotationAngle = 0.5;
    this.imageAnchorX = 1;
    this.imageAnchorY = 1;
    this.factor = 1;

    this.setKaleidoscopeRotationSpeed = this.setKaleidoscopeRotationSpeed.bind(this);
    this.setKaleidoscopeSlices = this.setKaleidoscopeSlices.bind(this);
    this.setImageTranslationSpeedX = this.setImageTranslationSpeedX.bind(this);
    this.setImageTranslationSpeedY = this.setImageTranslationSpeedY.bind(this);
    this.setImageScale = this.setImageScale.bind(this);
    this.setImageRotation = this.setImageRotation.bind(this);
    this.setImageRotationSpeed = this.setImageRotationSpeed.bind(this);
    this.setImageRotationAngle = this.setImageRotationAngle.bind(this);
    this.setImageAnchorX = this.setImageAnchorX.bind(this);
    this.setImageAnchorY = this.setImageAnchorY.bind(this);

    makeAutoObservable(this);
  }

  setKaleidoscopeRotationSpeed(value: number) {
    this.kaleidoscopeRotationSpeed = value;
    this.factor += 1;
  }
  setKaleidoscopeSlices(value: number) {
    this.kaleidoscopeSlices = value;
    this.factor += 1;
  }
  setImageTranslationSpeedX(value: number) {
    this.imageTranslationSpeedX = value;
    this.factor += 1;
  }
  setImageTranslationSpeedY(value: number) {
    this.imageTranslationSpeedY = value;
    this.factor += 1;
  }
  setImageScale(value: number) {
    this.imageScale = value;
    this.factor += 1;
  }
  setImageRotation(value: number) {
    this.imageRotation = value;
    this.factor += 1;
  }
  setImageRotationSpeed(value: number) {
    this.imageRotationSpeed = value;
    this.factor += 1;
  }
  setImageRotationAngle(value: number) {
    this.imageRotationAngle = value;
    this.factor += 1;
  }
  setImageAnchorX(value: number) {
    this.imageAnchorX = value;
    this.factor += 1;
  }
  setImageAnchorY(value: number) {
    this.imageAnchorY = value;
    this.factor += 1;
  }
}

export const configStore = new AppConfig();
