import * as React from 'react';
import ConfettiExplosion from './confetti';
import './example.css';

const smallProps = {
  force: 0.4,
  duration: 2200,
  particleCount: 30,
  width: 400,
};

const mediumProps = {
  force: 0.6,
  duration: 2500,
  particleCount: 80,
  width: 1000,
};

const largeProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 250,
  width: 1600,
};

function Example() {
  const [isSmallExploding, setIsSmallExploding] = React.useState(false);
  const [isMediumExploding, setIsMediumExploding] = React.useState(false);
  const [isLargeExploding, setIsLargeExploding] = React.useState(false);

  return (
    <div className="app">
      <button className="button" onClick={() => setIsSmallExploding(!isSmallExploding)}>
        small
        {isSmallExploding && <ConfettiExplosion {...smallProps} />}
      </button>
      <button className="button" onClick={() => setIsMediumExploding(!isMediumExploding)}>
        medium
        {isMediumExploding && <ConfettiExplosion {...mediumProps} />}
      </button>
      <button className="button" onClick={() => setIsLargeExploding(!isLargeExploding)}>
        large
        {isLargeExploding && <ConfettiExplosion {...largeProps} />}
      </button>
    </div>
  );
}

export default Example;
