import * as React from 'react';
import { createPortal } from 'react-dom';
import useStyles, { Particle } from './styles';
import { range } from './utils';

const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
const SIZE = 12; // max height for particle rectangles, diameter for particle circles
const HEIGHT = '120vh'; // distance particles will fall from initial explosion point
const WIDTH = 1000; // horizontal spread of particles in pixels
const PARTICLE_COUNT = 100;
const DURATION = 2200;
const COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];

export interface ConfettiProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'> {
  /** Number of confetti particles to render. @default 100 */
  particleCount?: number;
  /** Duration of the animation in milliseconds. @default 2200 */
  duration?: number;
  /** Array of colors to use for the confetti particles. @default ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'] */
  colors?: string[];
  /** Size of each particle in pixels. @default 12 */
  particleSize?: number;
  /** Force of the explosion (0-1). Higher values make particles shoot higher. @default 0.5 */
  force?: number;
  /** Height of the confetti explosion area. Can be a number (pixels) or string (e.g. "120vh"). @default "120vh" */
  height?: number | string;
  /** Width of the confetti explosion area in pixels. @default 1000 */
  width?: number;
  /** Whether to render the confetti in a portal (attached to document.body). @default true */
  portal?: boolean;
  /** z-index of the confetti container. Useful for controlling stacking context. */
  zIndex?: number;
  /** Callback function that is called when the animation completes. */
  onComplete?: () => void;
}

const createParticles = (count: number, colors: string[]): Particle[] => {
  const increment = 360 / count;
  return range(count).map(index => ({
    color: colors[index % colors.length],
    degree: increment * index,
  }));
};

const Explosion = ({
  particleCount = PARTICLE_COUNT,
  duration = DURATION,
  colors = COLORS,
  particleSize = SIZE,
  force = FORCE,
  height = HEIGHT,
  width = WIDTH,
  portal = true,
  zIndex,
  onComplete,
  ...props
}: ConfettiProps) => {
  const [origin, setOrigin] = React.useState<{ top: number; left: number }>();
  const particles = createParticles(particleCount, colors);
  const { containerClass, screenClass, particleClasses, styles } = useStyles({
    particles,
    duration,
    height,
    width,
    force,
    particleSize,
  });

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
    <div ref={originRef} className={containerClass} {...props}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {origin && (
        <>
          {(() => {
            const content = (
              <div data-slot="confetti-explosion-screen" className={screenClass} {...(zIndex ? { style: { zIndex } } : null)}>
                <div style={{ position: 'absolute', top: origin.top, left: origin.left }}>
                  {particles.map((particle, i) => (
                    <div className={particleClasses[i]} key={particle.degree}>
                      <div></div>
                    </div>
                  ))}
                </div>
              </div>
            );
            if (portal) {
              return createPortal(content, document.body);
            } else {
              return content;
            }
          })()}
        </>
      )}
    </div>
  );
};

const ConfettiExplosion = (props: ConfettiProps) => {
  if (typeof window === 'undefined' || typeof window.location === 'undefined') {
    return null;
  }
  return <Explosion {...props} />;
};

export { ConfettiExplosion };
