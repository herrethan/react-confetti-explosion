import * as React from 'react';
import ConfettiExplosion, { ConfettiProps } from './confetti';
import './example.css';

const smallProps: ConfettiProps = {
  force: 0.4,
  duration: 2200,
  particleCount: 30,
  width: 400,
};

const mediumProps: ConfettiProps = {
  force: 0.6,
  duration: 2500,
  particleCount: 100,
  width: 1000,
  colors: ['#9A0023', '#FF003C', '#AF739B', '#FAC7F3', '#F7DBF4'],
};

const largeProps: ConfettiProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 300,
  width: 1600,
  colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
};

function Example() {
  const [isSmallExploding, setIsSmallExploding] = React.useState(false);
  const [isMediumExploding, setIsMediumExploding] = React.useState(false);
  const [isLargeExploding, setIsLargeExploding] = React.useState(false);

  return (
    <div className="app">
      <button className="button" onClick={() => setIsSmallExploding(!isSmallExploding)}>
        {isSmallExploding && <ConfettiExplosion {...smallProps} />}
        <span>small</span>
      </button>
      <button className="button" onClick={() => setIsMediumExploding(!isMediumExploding)}>
        {isMediumExploding && <ConfettiExplosion {...mediumProps} />}
        <span>medium</span>
      </button>
      <button className="button" onClick={() => setIsLargeExploding(!isLargeExploding)}>
        {isLargeExploding && <ConfettiExplosion {...largeProps} />}
        <span>large</span>
      </button>
    </div>
  );
}

export default Example;
