type Rotate3dTransform = [number, number, number];

export const mapRange = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const rotate = (degree: number, amount: number) => {
  const result = degree + amount;
  return result > 360 ? result - 360 : result;
};

export const coinFlip = () => Math.random() > 0.5;

export const round = (value: number, precision = 2) =>
  Math.round(value * 10 ** precision) / 10 ** precision;

export const range = (length: number) => Array.from({ length }, (_, i) => i);

// avoid this for circles, as it will have no visual effect
const zAxisRotation: Rotate3dTransform = [0, 0, 1];

export const rotationTransforms: Rotate3dTransform[] = [
  // dual axis rotations (a bit more realistic)
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
  // single axis rotations (a bit dumber)
  [1, 0, 0],
  [0, 1, 0],
  zAxisRotation,
];

export const shouldBeCircle = (rotationIndex: number) => {
  return !rotationTransforms[rotationIndex].every((v, i) => v === zAxisRotation[i]) && coinFlip();
};
