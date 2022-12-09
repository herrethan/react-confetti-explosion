import { keyframes } from 'tss-react';
import { Keyframes } from '@emotion/serialize';
import { createMakeStyles } from 'tss-react';
import round from 'lodash.round';

import { coinFlip, mapRange, rotate, rotationTransforms, shouldBeCircle } from './utils';

const ROTATION_SPEED_MIN = 200; // minimum possible duration of single particle full rotation
const ROTATION_SPEED_MAX = 800; // maximum possible duration of single particle full rotation
const CRAZY_PARTICLES_FREQUENCY = 0.1; // 0-1 frequency of crazy curvy unpredictable particles
const CRAZY_PARTICLE_CRAZINESS = 0.3; // 0-1 how crazy these crazy particles are
const BEZIER_MEDIAN = 0.5; // utility for mid-point bezier curves, to ensure smooth motion paths

interface IStyleClasses {
  container: string;
  particle: string;
}

export interface IParticle {
  color: string; // color of particle
  degree: number; // vector direction, between 0-360 (0 being straight up ↑)
}

interface IParticlesProps {
  particles: IParticle[];
  duration: number;
  particleSize: number;
  force: number;
  height: number;
  width: number;
}

const rotationKeyframes = rotationTransforms.reduce((acc, xyz, i) => {
  const rotateKeyframe = keyframes`
      to {
        transform: rotate3d(${xyz.join()}, 360deg);
      }`;

  return {
    ...acc,
    [`rotateKeyframe-${i}`]: rotateKeyframe,
  };
}, {} as Record<string, Keyframes>);

const confettiKeyframes = (degrees: number[], height: number, width: number) => {
  const xLandingPoints = degrees.reduce((acc, degree, i) => {
    const landingPoint = mapRange(Math.abs(rotate(degree, 90) - 180), 0, 180, -width / 2, width / 2);
    const xAxisIndexKeyframe = keyframes`
      to {
          transform: translateX(${landingPoint}px);
        }`;
    return {
      ...acc,
      [`xAxisIndexKeyframe-${i}`]: xAxisIndexKeyframe,
    };
  }, {} as Record<string, Keyframes>);
  const yAxisKeyframes = keyframes`
      to {
        transform: translateY(${height}px);
      }`;

  return {
    yAxisKeyframes,
    ...xLandingPoints,
  };
};

const confettoStyle = (
  particle: IParticle,
  duration: number,
  force: number,
  size: number,
  i: number,
  confettiKeyframesResult: Record<string, Keyframes>
) => {
  const rotation = Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN;
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  // x-axis disturbance, roughly the distance the particle will initially deviate from its target
  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = x1 * -1;
  const x3 = x1;
  // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
  const x4 = round(Math.abs(mapRange(Math.abs(rotate(particle.degree, 90) - 180), 0, 180, -1, 1)), 4);

  // roughly how fast particle reaches end of its explosion curve
  const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
  // roughly maps to the distance particle goes before reaching free-fall
  const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
  // roughly how soon the particle transitions from explosion to free-fall
  const y3 = BEZIER_MEDIAN;
  // roughly the ease of free-fall
  const y4 = round(Math.max(mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0), 4);

  return {
    [`&#confetti-particle-${i}`]: {
      animation: `${
        confettiKeyframesResult[`xAxisIndexKeyframe-${i}`]
      } ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, ${x4})`,
      '& > div': {
        width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
        height: isCircle ? size : Math.round(Math.random() * 2) + size,
        animation: `${confettiKeyframesResult['yAxisKeyframes']} ${durationChaos}ms forwards cubic-bezier(${y1}, ${y2}, ${y3}, ${y4})`,
        '&:after': {
          backgroundColor: particle.color,
          animation: `${rotationKeyframes[`rotateKeyframe-${rotationIndex}`]} ${rotation}ms infinite linear`,
          ...(isCircle ? { borderRadius: '50%' } : {}),
        },
      },
    },
  };
};

const { makeStyles } = createMakeStyles({
  useTheme: () => {},
});

const useStyles = ({ particles, duration, height, width, force, particleSize }: IParticlesProps) =>
  makeStyles<void, keyof IStyleClasses>({ name: 'ConfettiExplosion' })((theme, _params, classes) => {
    const confettiKeyframesResult = confettiKeyframes(
      particles.map((particle) => particle.degree),
      height,
      width
    );
    const confettiStyles = particles.reduce(
      (acc, particle, i) => ({
        ...acc,
        ...confettoStyle(particle, duration, force, particleSize, i, confettiKeyframesResult),
      }),
      {}
    );

    return {
      container: {
        width: 0,
        height: 0,
        position: 'relative',
        overflow: 'visible',
        zIndex: 1200,
      },
      particle: {
        ...confettiStyles,
        '& > div': {
          position: 'absolute',
          left: 0,
          top: 0,
          '&:after': {
            content: `''`,
            display: 'block',
            width: '100%',
            height: '100%',
          },
        },
      },
    };
  });

export default useStyles;
