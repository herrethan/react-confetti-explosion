import React from 'react';
import { ConfettiExplosion } from './confetti';

export const Example = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'monospace',
      }}
    >
      <h1>Hello Explosion!</h1>
      <div style={{ width: 10, height: 10, borderRadius: '100%', border: '2px solid grey' }}>
        <ConfettiExplosion portal={false} />
      </div>
    </div>
  );
};

export default Example;
