import * as React from 'react';
import range from 'lodash/range';
import { createPortal } from 'react-dom';
import useStyles, {IParticle, IStyleClasses } from './styles';

const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
const SIZE = 12; // max height for particle rectangles, diameter for particle circles
const HEIGHT = '120vh'; // distance particles will fall from initial explosion point
const WIDTH = 1000; // horizontal spread of particles in pixels
const PARTICLE_COUNT = 100;
const DURATION = 2200;

export interface ConfettiProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'> {
  particleCount?: number;
  duration?: number;
  colors?: string[];
  images?: string[];
  particleSize?: number;
  force?: number;
  height?: number | string;
  width?: number;
  zIndex?: number;
  repeats?: number;
  onComplete?: () => void;
}

const createParticles = (count: number, colors: string[]): IParticle[] => {
  const increment = 360 / count;
  return range(count).map(index => ({
    color: colors[index % colors.length],
    image: '',
    degree: increment * index,
  }));
};

const createImageParticles = (count: number, images: string[]): IParticle[] => {
  const increment = 360 / count;
  return range(count).map(index => ({
    image: images[index % images.length],
    color: '',
    degree: increment * index,
  }));
};

function ConfettiExplosion({
  particleCount = PARTICLE_COUNT,
  duration = DURATION,
  colors = [],
  images = [],
  particleSize = SIZE,
  force = FORCE,
  height = HEIGHT,
  width = WIDTH,
  zIndex,
  repeats = 1,
  onComplete,
  ...props
}: ConfettiProps) {
  const [origin, setOrigin] = React.useState<{ top: number; left: number }>();
  const particles = createParticles(particleCount, colors);
  const imageParticles = createImageParticles(particleCount, images);
  const classes: IStyleClasses = useStyles({
    particles: images.length ? imageParticles : particles,
    duration,
    repeats,
    particleSize,
    force,
    width,
    height,
  })();

  const originRef = React.useCallback((node: HTMLDivElement) => {
    if (node) {
      const { top, left } = node.getBoundingClientRect();
      setOrigin({ top, left });
    }
  }, []);

  React.useEffect(() => {
    if (typeof onComplete === 'function') {
      const timeout = setTimeout(onComplete, duration);
      return () => clearTimeout(timeout);
    }
  }, [duration, onComplete]);

  return (
    <div ref={originRef} className={classes.container} {...props}>
      {origin &&
        createPortal(
          <div className={classes.screen} {...(zIndex ? { style: { zIndex } } : null)}>
            <div style={{ position: 'absolute', top: origin.top, left: origin.left }}>
              {particles.map((particle, i) => (
                <div
                  id={`confetti-particle-${i}`}
                  className={classes.particle}
                  key={particle.degree}
                >
                  <div></div>
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default ConfettiExplosion;
