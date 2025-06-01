import React, { act } from 'react';
import '@testing-library/jest-dom';
import { vi, expect, describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ConfettiExplosion } from './confetti';


const Sample = () => {
  const [isExploding, setIsExploding] = React.useState(false);
  return (
    <div>
      <button onClick={() => setIsExploding(!isExploding)}>explode</button>
      {isExploding && <ConfettiExplosion data-testid="confetti" particleCount={3} />}
    </div>
  );
};

const OnCompleteSample = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <ConfettiExplosion
      data-testid="confetti"
      duration={200}
      particleCount={3}
      onComplete={onComplete}
    />
  );
};

const ZIndexSample = () => {
  return <ConfettiExplosion data-testid="confetti" zIndex={321} />;
};

describe('ConfettiExplosion', () => {
  it('explodes', async () => {
    render(<Sample />);
    const explode = screen.getByText(/explode/i);
    expect(explode).toBeInTheDocument();
    let confetti = screen.queryByTestId('confetti');
    expect(confetti).not.toBeInTheDocument();
    fireEvent.click(explode);
    confetti = screen.queryByTestId('confetti');
    expect(confetti).toBeInTheDocument();
    fireEvent.click(explode);
    confetti = screen.queryByTestId('confetti');
    expect(confetti).not.toBeInTheDocument();
  });

  it('calls onComplete at end of duration', async () => {
    const onComplete = vi.fn();
    render(<OnCompleteSample onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(0);
    await act(async () => new Promise(resolve => setTimeout(resolve, 400)));
    expect(onComplete).toHaveBeenCalledTimes(1);
    await act(async () => new Promise(resolve => setTimeout(resolve, 600)));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
  
  it('inherits z-index', async () => {
    const { baseElement } = render(<ZIndexSample />);
    const portal = baseElement.querySelector('[data-slot="confetti-explosion-screen"]');
    expect(portal).toBeInTheDocument();
    expect(portal).toHaveStyle('z-index: 321');
  });
});





