import { coinFlip, mapRange, rotate, rotationTransforms, round, shouldBeCircle } from './utils';

const ROTATION_SPEED_MIN = 200;
const ROTATION_SPEED_MAX = 800;
const CRAZY_PARTICLES_FREQUENCY = 0.1;
const CRAZY_PARTICLE_CRAZINESS = 0.25;
const BEZIER_MEDIAN = 0.5;

export interface Particle {
  color: string;
  degree: number;
}

interface ParticlesProps {
  particles: Particle[];
  duration: number;
  particleSize: number;
  force: number;
  height: number | string;
  width: number;
}

const generateRotationKeyframes = () => {
  return rotationTransforms
    .map(
      (xyz, i) => `
    @keyframes rotation-${i} {
      50% {
        transform: rotate3d(${xyz.map(v => v / 2).join()}, 180deg);
      }
      100% {
        transform: rotate3d(${xyz.join()}, 360deg);
      }
    }
  `,
    )
    .join('\n');
};

const generateConfettiKeyframes = (degrees: number[], height: number | string, width: number) => {
  const y = typeof height === 'string' ? height : `${height}px`;
  const xLandingPoints = degrees
    .map((degree, i) => {
      const landingPoint = mapRange(
        Math.abs(rotate(degree, 90) - 180),
        0,
        180,
        -width / 2,
        width / 2,
      );
      return `
      @keyframes x-axis-${i} {
        to {
          transform: translateX(${landingPoint}px);
        }
      }
    `;
    })
    .join('\n');

  return `
    @keyframes y-axis {
      to {
        transform: translateY(${y});
      }
    }
    ${xLandingPoints}
  `;
};

const generateConfettoStyle = (
  parentClass: string,
  particle: Particle,
  duration: number,
  force: number,
  size: number,
  i: number,
) => {
  const rotation = Math.round(
    Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN,
  );
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  // x-axis disturbance, roughly the distance the particle will initially deviate from its target
  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = x1 * -1;
  const x3 = x1;
  // x-axis arc of explosion, so 90deg and 270deg particles have curve of 1, 0deg and 180deg have 0
  const x4 = round(
    Math.abs(mapRange(Math.abs(rotate(particle.degree, 90) - 180), 0, 180, -1, 1)),
    4,
  );

  // roughly how fast particle reaches end of its explosion curve
  const y1 = round(Math.random() * BEZIER_MEDIAN, 4);
  // roughly maps to the distance particle goes before reaching free-fall
  const y2 = round(Math.random() * force * (coinFlip() ? 1 : -1), 4);
  // roughly how soon the particle transitions from explosion to free-fall
  const y3 = BEZIER_MEDIAN;
  // roughly the ease of free-fall
  const y4 = round(
    Math.max(mapRange(Math.abs(particle.degree - 180), 0, 180, force, -force), 0),
    4,
  );

  const className = `confetti-particle-${i}`;

  return {
    className,
    style: `
      .${parentClass} .${className} {
        animation: x-axis-${i} ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, ${x4});
      }
      .${parentClass} .${className} > div {
        width: ${isCircle ? size : Math.round(Math.random() * 4) + size / 2}px;
        height: ${isCircle ? size : Math.round(Math.random() * 2) + size}px;
        animation: y-axis ${durationChaos}ms forwards cubic-bezier(${y1}, ${y2}, ${y3}, ${y4});
      }
      .${parentClass} .${className} > div::after {
        background-color: ${particle.color};
        animation: rotation-${rotationIndex} ${rotation}ms infinite linear;
        ${isCircle ? 'border-radius: 50%;' : ''}
      }
    `,
  };
};

const createStyles = ({
  particles,
  duration,
  height,
  width,
  force,
  particleSize,
}: ParticlesProps) => {
  const uniqueId = Math.random().toString(36).substring(2, 8);
  const containerClass = `confetti-${uniqueId}-container`;
  const screenClass = `confetti-${uniqueId}-screen`;

  const baseStyles = `
    .${containerClass} {
      width: 0;
      height: 0;
      position: relative;
    }
    .${screenClass} {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      pointer-events: none;
    }
    .${screenClass} [class*="confetti-particle"] > div {
      position: absolute;
      left: 0;
      top: 0;
    }
    .${screenClass} [class*="confetti-particle"] > div::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  const rotationStyles = generateRotationKeyframes();
  const confettiKeyframes = generateConfettiKeyframes(
    particles.map(particle => particle.degree),
    height,
    width,
  );

  const particleStyles = particles.map((particle, i) =>
    generateConfettoStyle(screenClass, particle, duration, force, particleSize, i),
  );

  const allStyles = `
    ${baseStyles}
    ${rotationStyles}
    ${confettiKeyframes}
    ${particleStyles.map(p => p.style).join('\n')}
  `;

  return {
    containerClass,
    screenClass,
    particleClasses: particleStyles.map(p => p.className),
    styles: allStyles,
  };
};

const useStyles = (props: ParticlesProps) => {
  const { containerClass, screenClass, particleClasses, styles } = createStyles(props);
  return {
    containerClass,
    screenClass,
    particleClasses,
    styles,
  };
};
export default useStyles;
